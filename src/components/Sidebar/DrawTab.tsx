import React from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { COLOR_PALETTES } from '../../utils/presets';
import {
  PenTool,
  Paintbrush,
  Highlighter,
  Eraser,
  Check,
  MousePointer,
} from 'lucide-react';

export const DrawTab: React.FC = () => {
  const {
    isDrawingMode,
    brushType,
    brushColor,
    brushSize,
    setIsDrawingMode,
    setBrushType,
    setBrushColor,
    setBrushSize,
  } = useCanvas();

  const brushPresets = [
    {
      id: 'pen',
      label: 'Fine Pen',
      desc: 'Crisp precision lines',
      icon: PenTool,
      defaultSize: 4,
    },
    {
      id: 'marker',
      label: 'Bold Marker',
      desc: 'Expressive medium stroke',
      icon: Paintbrush,
      defaultSize: 12,
    },
    {
      id: 'highlighter',
      label: 'Highlighter',
      desc: 'Semi-transparent wash',
      icon: Highlighter,
      defaultSize: 24,
    },
    {
      id: 'eraser',
      label: 'Eraser Mode',
      desc: 'Select & delete lines',
      icon: Eraser,
      defaultSize: 10,
    },
  ] as const;

  return (
    <div className="flex flex-col h-full p-4 overflow-y-auto bg-white select-none">
      {/* Title */}
      <div className="flex items-center space-x-2 mb-3">
        <PenTool className="w-5 h-5 text-blue-600" />
        <h2 className="text-sm font-bold text-slate-800 tracking-wide uppercase">
          Freehand Drawing
        </h2>
      </div>

      <p className="text-xs text-slate-500 mb-4 leading-relaxed">
        Draw and sketch freely on your canvas artboard. All strokes are rendered as smooth vector paths.
      </p>

      {/* Primary Toggle: Enter / Exit Draw Mode */}
      <button
        onClick={() => setIsDrawingMode(!isDrawingMode)}
        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-xs mb-5 ${
          isDrawingMode
            ? 'bg-emerald-600 text-white hover:bg-emerald-700 ring-2 ring-emerald-500/30'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isDrawingMode ? (
          <>
            <MousePointer className="w-4 h-4" />
            <span>Drawing Active (Click to Exit)</span>
          </>
        ) : (
          <>
            <PenTool className="w-4 h-4" />
            <span>Enable Brush Canvas</span>
          </>
        )}
      </button>

      {/* Brush Types */}
      <div className="mb-5">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
          Brush Tip
        </span>
        <div className="grid grid-cols-2 gap-2">
          {brushPresets.map((b) => {
            const Icon = b.icon;
            const isSelected = brushType === b.id;

            return (
              <button
                key={b.id}
                onClick={() => {
                  setBrushType(b.id);
                  if (b.id !== 'eraser') setBrushSize(b.defaultSize);
                  if (!isDrawingMode) setIsDrawingMode(true);
                }}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/60 shadow-xs'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Icon
                    className={`w-4 h-4 ${
                      isSelected ? 'text-blue-600' : 'text-slate-600'
                    }`}
                  />
                  {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    {b.label}
                  </span>
                  <span className="text-[10px] text-slate-400">{b.desc}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Brush Size Slider */}
      <div className="mb-5 p-3.5 rounded-xl border border-slate-200 bg-slate-50/60">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-700">Brush Stroke Size</span>
          <span className="text-xs font-mono font-bold text-blue-600">{brushSize}px</span>
        </div>
        <input
          type="range"
          min="2"
          max="48"
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value))}
          className="w-full accent-blue-600 cursor-pointer"
        />
        <div className="mt-2 flex items-center justify-center h-8 bg-white border border-slate-200 rounded-lg">
          <div
            className="rounded-full bg-slate-800 transition-all"
            style={{ width: `${brushSize}px`, height: `${brushSize}px` }}
          />
        </div>
      </div>

      {/* Brush Color Swatches */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Ink Color
          </span>
          <div className="relative w-5 h-5 rounded-md overflow-hidden border border-slate-300 shadow-2xs cursor-pointer">
            <input
              type="color"
              value={brushColor}
              onChange={(e) => setBrushColor(e.target.value)}
              className="absolute -top-3 -left-3 w-12 h-12 cursor-pointer border-none p-0"
            />
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {COLOR_PALETTES.slice(0, 21).map((col, idx) => {
            const isSelected = brushColor.toLowerCase() === col.toLowerCase();
            return (
              <button
                key={idx}
                onClick={() => setBrushColor(col)}
                style={{ backgroundColor: col }}
                title={col}
                className={`h-7 rounded-lg border transition-transform cursor-pointer relative flex items-center justify-center ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-500/40 scale-105'
                    : 'border-slate-300/80 hover:scale-105'
                }`}
              >
                {isSelected && (
                  <Check
                    className={`w-3 h-3 ${
                      col === '#FFFFFF' || col.startsWith('#FE') ? 'text-black' : 'text-white'
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
