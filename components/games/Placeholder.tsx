import React from 'react';
import type { Game } from '../../types';

interface PlaceholderProps {
  game: Game;
}

const Placeholder: React.FC<PlaceholderProps> = ({ game }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-gray-800 text-white rounded-b-xl">
      <h2 className="text-5xl font-extrabold mb-4 text-yellow-300">
        {game.title}
      </h2>
      <p className="text-2xl text-cyan-300 mb-8">게임을 준비 중입니다!</p>
      <div className="w-32 h-32 bg-purple-500 rounded-full animate-bounce flex items-center justify-center text-6xl">
        🔧
      </div>
      <p className="mt-8 text-lg text-gray-300">곧 재미있는 게임으로 찾아올게요!</p>
    </div>
  );
};

export default Placeholder;
