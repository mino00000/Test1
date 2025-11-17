import React, { useState, useEffect, useRef } from 'react';

const WORDS = ['대한민국', '컴퓨터', '프로그래밍', '인공지능', '자바스크립트', '리액트', '타이핑', '미니게임', '바나나', '키보드'];
const GAME_DURATION = 30;

const TypingGame: React.FC = () => {
  const [word, setWord] = useState('');
  const [typedWord, setTypedWord] = useState('');
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0) {
      endGame();
    }
  }, [isPlaying, timeLeft]);
  
  const pickWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];
  
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setTypedWord('');
    setWord(pickWord());
    setTimeout(() => inputRef.current?.focus(), 0);
  };
  
  const endGame = () => {
      setIsPlaying(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTypedWord = e.target.value;
    setTypedWord(newTypedWord);
    
    if (newTypedWord === word) {
        setScore(prev => prev + word.length);
        setTypedWord('');
        setWord(pickWord());
    }
  };
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-blue-900 text-white rounded-b-xl">
      <h2 className="text-3xl font-bold mb-4">도전! 어린이 타자왕</h2>
      
      <div className="flex space-x-8 text-xl mb-6">
        <p>점수: <span className="font-bold text-yellow-300">{score}</span></p>
        <p>남은 시간: <span className="font-bold text-red-400">{timeLeft}</span>초</p>
      </div>
      
      {!isPlaying ? (
        <div className="text-center">
            {timeLeft === 0 && <p className="text-2xl mb-4">게임 종료! 최종 점수는 {score}점입니다.</p>}
          <button 
            onClick={startGame} 
            className="px-8 py-3 bg-green-500 text-white rounded-lg text-xl font-bold hover:bg-green-600 transition-colors"
          >
            {timeLeft === 0 ? '다시하기' : '게임 시작'}
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md text-center">
            <div className="bg-white/10 p-4 rounded-lg mb-4">
                <p className="text-5xl font-mono tracking-widest">{word}</p>
            </div>
          <input 
            ref={inputRef}
            type="text" 
            value={typedWord}
            onChange={handleInputChange}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            className="w-full p-3 text-2xl text-center rounded-lg bg-gray-700 text-white border-2 border-transparent focus:border-cyan-400 focus:outline-none"
          />
        </div>
      )}
    </div>
  );
};

export default TypingGame;
