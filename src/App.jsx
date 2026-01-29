import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import FloatingHearts from './components/FloatingHearts';
import PageTransition from './components/PageTransition';
import PinScreen from './components/PinScreen';
import QuestScreen from './components/QuestScreen';
import StoryScreen from './components/StoryScreen';
import AlbumScreen from './components/AlbumScreen';
import FinaleScreen from './components/FinaleScreen';
import CursorTrail from './components/CursorTrail';

// Stage constants
const STAGES = {
  PIN: 0,
  QUEST_1: 1,
  QUEST_2: 2,
  QUEST_3: 3,
  STORY: 4,
  ALBUM: 5,
  FINALE: 6,
};

export default function App() {
  const [currentStage, setCurrentStage] = useState(STAGES.PIN);

  const goToNextStage = useCallback(() => {
    setCurrentStage((prev) => Math.min(prev + 1, STAGES.FINALE));
  }, []);

  const goToPrevStage = useCallback(() => {
    // Can't go back from PIN screen
    if (currentStage > STAGES.PIN) {
      // If going back from QUEST_1, go to PIN (but need to re-authenticate)
      // For better UX, we'll just go back one stage
      setCurrentStage((prev) => prev - 1);
    }
  }, [currentStage]);

  const restart = useCallback(() => {
    setCurrentStage(STAGES.PIN);
  }, []);

  const handlePinSuccess = useCallback(() => {
    setCurrentStage(STAGES.QUEST_1);
  }, []);

  const handleQuestComplete = useCallback(() => {
    goToNextStage();
  }, [goToNextStage]);

  const renderStage = () => {
    switch (currentStage) {
      case STAGES.PIN:
        return <PinScreen key="pin" onSuccess={handlePinSuccess} />;

      case STAGES.QUEST_1:
      case STAGES.QUEST_2:
      case STAGES.QUEST_3:
        return (
          <QuestScreen
            key={`quest-${currentStage}`}
            currentQuest={currentStage - STAGES.QUEST_1}
            onComplete={handleQuestComplete}
            onBack={goToPrevStage}
          />
        );

      case STAGES.STORY:
        return (
          <StoryScreen
            key="story"
            onNext={goToNextStage}
            onBack={goToPrevStage}
          />
        );

      case STAGES.ALBUM:
        return (
          <AlbumScreen
            key="album"
            onNext={goToNextStage}
            onBack={goToPrevStage}
          />
        );

      case STAGES.FINALE:
        return (
          <FinaleScreen
            key="finale"
            onRestart={restart}
            onBack={goToPrevStage}
          />
        );

      default:
        return <PinScreen key="pin" onSuccess={handlePinSuccess} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingHearts />
      <CursorTrail />
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          {/* We pass the stage as key to PageTransition so it re-mounts and animates */}
          <PageTransition key={currentStage} className="flex-1 flex flex-col">
            {renderStage()}
          </PageTransition>
        </AnimatePresence>
      </div>
    </div>
  );
}

