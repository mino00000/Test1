
import React, { useState } from 'react';
import { GAMES } from './constants';
import type { Game } from './types';
import GameCard from './components/GameCard';
import GameModal from './components/GameModal';

const App: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const handleOpenGame = (game: Game) => {
    setSelectedGame(game);
  };

  const handleCloseGame = () => {
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen bg-sky-100 text-gray-800 p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
          style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.1)' }}>
          🌈 미니게임 천국 🎉
        </h1>
        <p className="mt-4 text-lg text-blue-800">마음에 드는 게임을 클릭해서 플레이해보세요!</p>
      </header>

      <main>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 max-w-7xl mx-auto">
          {GAMES.map((game) => (
            <GameCard key={game.id} game={game} onClick={() => handleOpenGame(game)} />
          ))}
        </div>
      </main>

      <GameModal game={selectedGame} onClose={handleCloseGame} />
    </div>
  );
};

export default App;
