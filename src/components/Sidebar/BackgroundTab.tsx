import React from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { COLOR_PALETTES, GRADIENT_PRESETS } from '../../utils/presets';
import type { BackgroundPattern } from '../../types/canvas';
import { Palette, Check, Grid, Sparkles } from 'lucide-react';

export const BackgroundTab: React.FC = () => {
  const {
    currentPage,
    setPageBackgroundColor,
    setPageBackgroundGradient,
    setPageBackgroundPattern,
  } = useCanvas();

  const isCurrentSolid = !currentPage.backgroundGradient;

  const patterns: Array<{ id: BackgroundPattern; label: string; icon: React.ReactNode }> = [
    { id: 'none', label: 'Plain Solid', icon: <div className="w-4 h-4 bg-slate-200 rounded" /> },
    {
      id: 'dots',
      label: 'Dot Pattern',
      icon: (
        <div
          className="w-4 h-4 rounded"
          style={{ backgroundImage: 'radial-gradient(#94A3B8 1px, transparent 1px)', backgroundSize: '6px 6px' }}
        />
      ),
    },
    {
      id: 'grid',
      label: 'Graph Grid',
      icon: <Grid className="w-4 h-4 text-slate-600" />,
    },
    {
      id: 'stripes',
      label: 'Stripes',
      icon: (
        <div
          className="w-4 h-4 rounded"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #CBD5E1, #CBD5E1 2px, transparent 2px, transparent 6px)' }}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full p-4 overflow-y-auto bg-white select-none">
      {/* Title */}
      <div className="flex items-center space-x-2 mb-3">
        <Palette className="w-5 h-5 text-blue-600" />
        <h2 className="text-sm font-bold text-slate-800 tracking-wide uppercase">
          Artboard Background
        </h2>
      </div>

      {/* Custom Solid Color Input */}
      <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-200 mb-5">
        <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-slate-300 shadow-2xs shrink-0 cursor-pointer">
          <input
            type="color"
            value={currentPage.backgroundColor || '#FFFFFF'}
            onChange={(e) => setPageBackgroundColor(e.target.value)}
            className="absolute -top-3 -left-3 w-16 h-16 cursor-pointer border-none p-0"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold text-slate-800 block">Custom Solid Color</span>
          <span className="text-[11px] text-slate-400 uppercase font-mono">
            {currentPage.backgroundColor || '#FFFFFF'}
          </span>
        </div>
        <button
          onClick={() => setPageBackgroundColor('transparent')}
          className="text-[11px] px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          Transparent
        </button>
      </div>

      {/* Pattern Overlays */}
      <div className="mb-5">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
          Texture & Patterns
        </span>
        <div className="grid grid-cols-2 gap-2">
          {patterns.map((pat) => {
            const isSelected = (currentPage.backgroundPattern || 'none') === pat.id;
            return (
              <button
                key={pat.id}
                onClick={() => setPageBackgroundPattern(pat.id)}
                className={`p-2.5 rounded-xl border flex items-center space-x-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 text-blue-800 font-semibold'
                    : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                }`}
              >
                {pat.icon}
                <span className="text-xs">{pat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 16 Curated Gradients */}
      <div className="mb-5">
        <div className="flex items-center space-x-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Curated Gradients (16)
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {GRADIENT_PRESETS.map((grad, idx) => {
            const isSelected =
              currentPage.backgroundGradient &&
              currentPage.backgroundGradient.colors[0] === grad.colors[0] &&
              currentPage.backgroundGradient.colors[1] === grad.colors[1];

            return (
              <button
                key={idx}
                onClick={() =>
                  setPageBackgroundGradient({
                    type: 'linear',
                    colors: grad.colors,
                    angle: grad.angle,
                  })
                }
                style={{ background: grad.value }}
                className={`h-12 rounded-xl border relative shadow-2xs transition-all cursor-pointer flex items-center justify-center ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-500/50 scale-102'
                    : 'border-slate-200 hover:border-slate-400 hover:scale-102'
                }`}
              >
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-white/90 shadow flex items-center justify-center text-blue-600">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
                <span className="absolute bottom-1 right-2 text-[9px] font-bold text-slate-800/80 drop-shadow-xs">
                  {grad.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Solid Palette Swatches */}
      <div>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
          Curated Palette Swatches
        </span>
        <div className="grid grid-cols-8 gap-1.5">
          {COLOR_PALETTES.map((color, idx) => {
            const isSelected = isCurrentSolid && currentPage.backgroundColor.toLowerCase() === color.toLowerCase();
            return (
              <button
                key={idx}
                onClick={() => setPageBackgroundColor(color)}
                style={{ backgroundColor: color }}
                title={color}
                className={`w-7 h-7 rounded-lg border transition-transform cursor-pointer relative flex items-center justify-center ${
                  isSelected
                    ? 'border-blue-600 scale-110 shadow-xs ring-2 ring-blue-500/40'
                    : 'border-slate-300/80 hover:scale-110'
                }`}
              >
                {isSelected && (
                  <Check
                    className={`w-3.5 h-3.5 ${
                      color === '#FFFFFF' || color.startsWith('#FE') || color.startsWith('#F8')
                        ? 'text-black'
                        : 'text-white'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
