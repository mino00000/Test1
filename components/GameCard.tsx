
import React from 'react';
import type { Game } from '../types';

interface GameCardProps {
  game: Game;
  onClick: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
    >
      <div className="overflow-hidden">
        <img 
          src={game.imageUrl} 
          alt={game.title} 
          className="w-full h-40 object-cover transform transition-transform duration-500 group-hover:scale-110" 
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 truncate">{game.title}</h3>
        <p className="text-gray-600 mt-1 text-sm h-10">{game.description}</p>
      </div>
    </div>
  );
};

export default GameCard;
