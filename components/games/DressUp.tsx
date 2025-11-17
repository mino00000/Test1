import React, { useState } from 'react';

const HATS = [
  { id: 'h1', emoji: '👑', top: '-40px', left: '0px', fontSize: '3rem' },
  { id: 'h2', emoji: '👒', top: '-40px', left: '0px', fontSize: '4rem' },
  { id: 'h3', emoji: '🎩', top: '-40px', left: '0px', fontSize: '3.5rem' },
  { id: 'h4', emoji: '🧢', top: '-30px', left: '0px', fontSize: '3rem' },
];
const TOPS = [
  { id: 't1', emoji: '👚', top: '50px', left: '0px', fontSize: '5rem' },
  { id: 't2', emoji: '👕', top: '50px', left: '0px', fontSize: '5rem' },
  { id: 't3', emoji: '👘', top: '50px', left: '0px', fontSize: '5rem' },
  { id: 't4', emoji: '🧥', top: '50px', left: '0px', fontSize: '5rem' },
];
const BOTTOMS = [
  { id: 'b1', emoji: '👖', top: '120px', left: '0px', fontSize: '5rem' },
  { id: 'b2', emoji: '👗', top: '120px', left: '0px', fontSize: '5rem' },
  { id: 'b3', emoji: '🩳', top: '120px', left: '0px', fontSize: '5rem' },
];

type Item = { id: string; emoji: string; top: string; left: string; fontSize: string; } | null;

const DressUp: React.FC = () => {
  const [outfit, setOutfit] = useState<{ hat: Item; top: Item; bottom: Item }>({
    hat: null,
    top: null,
    bottom: null,
  });

  const handleItemSelect = (category: 'hat' | 'top' | 'bottom', item: Item) => {
    // If the same item is clicked again, unequip it.
    if (outfit[category]?.id === item?.id) {
        setOutfit(prev => ({ ...prev, [category]: null }));
    } else {
        setOutfit(prev => ({ ...prev, [category]: item }));
    }
  };
  
  const WardrobeSection: React.FC<{ title: string; items: NonNullable<Item>[]; category: 'hat' | 'top' | 'bottom' }> = ({ title, items, category }) => (
    <div className="mb-4">
      <h3 className="font-bold text-lg mb-2 text-pink-700">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <button key={item.id} onClick={() => handleItemSelect(category, item)} 
            className={`w-16 h-16 text-4xl rounded-lg flex items-center justify-center transition-all ${outfit[category]?.id === item.id ? 'bg-yellow-300 ring-2 ring-yellow-500' : 'bg-white hover:bg-pink-100'}`}
          >
            {item.emoji}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col sm:flex-row bg-pink-100 rounded-b-xl overflow-auto p-4 gap-4">
      {/* Wardrobe */}
      <div className="w-full sm:w-1/2 p-4 bg-white/70 rounded-2xl flex-shrink-0">
        <h2 className="text-2xl font-bold text-pink-800 mb-4">슈슈의 옷장</h2>
        <WardrobeSection title="모자" items={HATS} category="hat" />
        <WardrobeSection title="상의" items={TOPS} category="top" />
        <WardrobeSection title="하의" items={BOTTOMS} category="bottom" />
      </div>

      {/* Doll */}
      <div className="w-full sm:w-1/2 flex items-center justify-center flex-grow">
        <div className="relative w-32 h-64">
          {/* Doll Base */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-orange-200 rounded-full" /> {/* Head */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-20 h-24 bg-orange-200 rounded-t-lg" /> {/* Torso */}
          <div className="absolute top-40 left-1/2 -translate-x-1/2 w-8 h-24 bg-orange-200" /> {/* Legs */}
          
          {/* Outfit items */}
          {Object.values(outfit).map(item => item && (
            <div key={item.id} className="absolute text-center w-full" style={{ top: item.top, left: item.left, fontSize: item.fontSize, zIndex: 10 }}>
              {item.emoji}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DressUp;
