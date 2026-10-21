import React, { useState } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import type { ShapeType } from '../../types/canvas';
import { VECTOR_STICKERS } from '../../utils/presets';
import {
  Square,
  Circle,
  Triangle,
  Star,
  Minus,
  MoveRight,
  Heart,
  Diamond,
  Shapes,
  Search,
  MessageSquare,
  Shield,
} from 'lucide-react';

interface ShapeDef {
  id: ShapeType;
  label: string;
  icon: React.ReactNode;
}

export const ElementsTab: React.FC = () => {
  const { addShape, addIcon } = useCanvas();
  const [activeTab, setActiveTab] = useState<'shapes' | 'stickers'>('shapes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStickerCat, setSelectedStickerCat] = useState('All');

  const shapes: ShapeDef[] = [
    { id: 'rect', label: 'Rectangle', icon: <Square className="w-6 h-6 text-slate-700" /> },
    {
      id: 'rounded-rect',
      label: 'Rounded Rect',
      icon: <div className="w-6 h-6 border-2 border-slate-700 rounded-md bg-slate-100" />,
    },
    { id: 'pill', label: 'Pill / Capsule', icon: <div className="w-7 h-4 border-2 border-slate-700 rounded-full bg-slate-100" /> },
    { id: 'circle', label: 'Circle', icon: <Circle className="w-6 h-6 text-slate-700" /> },
    { id: 'triangle', label: 'Triangle', icon: <Triangle className="w-6 h-6 text-slate-700" /> },
    { id: 'diamond', label: 'Diamond', icon: <Diamond className="w-6 h-6 text-slate-700" /> },
    { id: 'star', label: '5-Point Star', icon: <Star className="w-6 h-6 text-slate-700 fill-slate-200" /> },
    { id: 'badge', label: 'Multi-Badge', icon: <Shield className="w-6 h-6 text-slate-700" /> },
    { id: 'speech-bubble', label: 'Speech Bubble', icon: <MessageSquare className="w-6 h-6 text-slate-700" /> },
    { id: 'heart', label: 'Heart', icon: <Heart className="w-6 h-6 text-slate-700 fill-slate-200" /> },
    { id: 'line', label: 'Line', icon: <Minus className="w-6 h-6 text-slate-700" /> },
    { id: 'arrow', label: 'Arrow', icon: <MoveRight className="w-6 h-6 text-slate-700" /> },
  ];

  const stickerCategories = ['All', 'Badges & Sparkles', 'Business', 'Arrows', 'Social', 'Media', 'Tech'];

  const filteredStickers = VECTOR_STICKERS.filter((s) => {
    const matchesCat = selectedStickerCat === 'All' || s.category === selectedStickerCat;
    const matchesQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="flex flex-col h-full p-4 overflow-y-auto bg-white select-none">
      {/* Title */}
      <div className="flex items-center space-x-2 mb-3">
        <Shapes className="w-5 h-5 text-blue-600" />
        <h2 className="text-sm font-bold text-slate-800 tracking-wide uppercase">
          Elements & Vector Graphics
        </h2>
      </div>

      {/* Shapes vs Stickers Toggle */}
      <div className="flex p-0.5 bg-slate-100 rounded-xl mb-3 border border-slate-200">
        <button
          onClick={() => setActiveTab('shapes')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeTab === 'shapes' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Basic Shapes
        </button>
        <button
          onClick={() => setActiveTab('stickers')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeTab === 'stickers' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Vector Stickers ({VECTOR_STICKERS.length})
        </button>
      </div>

      {activeTab === 'shapes' ? (
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Geometric Primitives
          </span>
          <div className="grid grid-cols-3 gap-2.5">
            {shapes.map((s) => (
              <button
                key={s.id}
                onClick={() => addShape(s.id)}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 hover:border-blue-500 bg-slate-50/60 hover:bg-blue-50/40 transition-all cursor-pointer group"
                title={s.label}
              >
                <div className="w-10 h-10 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <span className="text-[11px] font-medium text-slate-600 group-hover:text-blue-700 truncate w-full text-center">
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {/* Sticker Search */}
          <div className="relative mb-3">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search vector stickers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 outline-none"
            />
          </div>

          {/* Sticker Category Filter */}
          <div className="flex flex-wrap gap-1 mb-3">
            {stickerCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedStickerCat(cat)}
                className={`text-[10px] px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  selectedStickerCat === cat
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Stickers Grid */}
          <div className="grid grid-cols-4 gap-2">
            {filteredStickers.map((sticker) => (
              <button
                key={sticker.id}
                onClick={() => addIcon(sticker)}
                className="h-16 flex flex-col items-center justify-center p-2 rounded-xl border border-slate-200 hover:border-blue-500 bg-slate-50 hover:bg-blue-50 transition-all cursor-pointer group"
                title={sticker.name}
              >
                <svg
                  viewBox={sticker.viewBox}
                  className="w-7 h-7 text-blue-600 fill-current group-hover:scale-110 transition-transform"
                >
                  <path d={sticker.path} />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
