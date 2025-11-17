import React, { useState, useEffect } from 'react';

const FRUITS = ['🍓', '🍊', '🍋', '🍉', '🍇', '🍍', '🥝', '🥭'];
const DECK = [...FRUITS, ...FRUITS];

// Helper to shuffle the deck
const shuffle = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryMatch: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);

  const setupGame = () => {
    const shuffledDeck = shuffle(DECK);
    setCards(
      shuffledDeck.map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }))
    );
    setFlippedIndices([]);
    setMoves(0);
    setIsGameWon(false);
  };

  useEffect(() => {
    setupGame();
  }, []);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.emoji === secondCard.emoji) {
        // Match
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card, index) =>
              index === firstIndex || index === secondIndex ? { ...card, isMatched: true, isFlipped: true } : card
            )
          );
          setFlippedIndices([]);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card, index) =>
              index === firstIndex || index === secondIndex ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedIndices([]);
        }, 1000);
      }
    }
  }, [flippedIndices, cards]);
  
  useEffect(() => {
      if (cards.length > 0 && cards.every(card => card.isMatched)) {
          setIsGameWon(true);
      }
  }, [cards]);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length >= 2 || cards[index].isFlipped || isGameWon) {
      return;
    }

    if (flippedIndices.length === 0 || (flippedIndices.length === 1 && flippedIndices[0] !== index)) {
      setMoves(moves + 1);
      setCards((prevCards) =>
        prevCards.map((card, i) => (i === index ? { ...card, isFlipped: true } : card))
      );
      setFlippedIndices((prev) => [...prev, index]);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-green-100 text-gray-800 rounded-b-xl">
      <h2 className="text-3xl font-bold mb-2 text-green-800">알록달록 과일농장</h2>
      <p className="mb-4 text-lg">시도 횟수: {Math.floor(moves)}</p>
      
      {isGameWon ? (
        <div className="text-center">
          <p className="text-4xl font-bold text-yellow-500 mb-4">🎉 성공! 🎉</p>
          <button
            onClick={setupGame}
            className="px-6 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-colors"
          >
            다시하기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`w-20 h-24 rounded-lg flex items-center justify-center text-4xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${card.isFlipped ? 'bg-yellow-200' : 'bg-green-400'} ${card.isMatched ? 'opacity-50 cursor-default' : ''}`}
            >
              {card.isFlipped ? card.emoji : '❓'}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemoryMatch;
