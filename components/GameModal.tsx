import React, { useEffect } from 'react';
import type { Game } from '../types';

import MemoryMatch from './games/MemoryMatch';
import DressUp from './games/DressUp';
import TypingGame from './games/TypingGame';
import Placeholder from './games/Placeholder';

interface GameModalProps {
  game: Game | null;
  onClose: () => void;
}

const GameContent: React.FC<{ game: Game }> = ({ game }) => {
  switch (game.id) {
    case 1: // 알록달록 과일농장
      return <MemoryMatch />;
    case 4: // 슈슈의 옷입히기
      return <DressUp />;
    case 9: // 도전! 어린이 타자왕
      return <TypingGame />;
    default:
      return <Placeholder game={game} />;
  }
};


const GameModal: React.FC<GameModalProps> = ({ game, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!game) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-yellow-100 to-orange-200 rounded-3xl shadow-2xl w-full max-w-4xl h-full max-h-[80vh] flex flex-col p-6 relative animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold hover:bg-red-600 transition-colors z-10"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="bg-white rounded-2xl p-2 h-full flex flex-col">
          {/* Header bar for the game window */}
          <div className="flex items-center justify-between bg-gray-200 rounded-t-xl px-4 py-2 border-b">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            </div>
            <p className="text-gray-700 font-semibold">{game.title}.exe</p>
            <div></div>
          </div>
          {/* Game content area */}
          <div className="flex-grow bg-gray-800 text-white flex flex-col items-center justify-center rounded-b-xl overflow-hidden">
            {game && <GameContent game={game} />}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-up {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-scale-up { animation: scale-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default GameModal;
