import React, { useState } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { CANVAS_PRESETS } from '../../utils/presets';
import { X, Scaling, Check } from 'lucide-react';

interface CanvasSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CanvasSizeModal: React.FC<CanvasSizeModalProps> = ({ isOpen, onClose }) => {
  const { document: doc, setDimensions } = useCanvas();
  const [width, setWidth] = useState<number>(doc.width);
  const [height, setHeight] = useState<number>(doc.height);

  if (!isOpen) return null;

  const handleApply = () => {
    if (width > 0 && height > 0) {
      setDimensions(width, height);
      onClose();
    }
  };

  const handleSelectPreset = (pWidth: number, pHeight: number) => {
    setWidth(pWidth);
    setHeight(pHeight);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-150 select-none">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center space-x-2">
            <Scaling className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-800">Resize Canvas Artboard</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Custom Dimension Inputs */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Custom Size (Pixels)
            </label>
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">Width</span>
                <input
                  type="number"
                  min="100"
                  max="4000"
                  value={width}
                  onChange={(e) => setWidth(parseInt(e.target.value) || 100)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-bold text-sm outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
              <span className="text-slate-400 pt-5">×</span>
              <div className="flex-1">
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">Height</span>
                <input
                  type="number"
                  min="100"
                  max="4000"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value) || 100)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-bold text-sm outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Popular Presets */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Popular Presets
            </label>
            <div className="grid grid-cols-1 gap-1.5 max-h-52 overflow-y-auto">
              {CANVAS_PRESETS.map((preset, idx) => {
                const isSelected = width === preset.width && height === preset.height;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectPreset(preset.width, preset.height)}
                    className={`flex items-center justify-between p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/70 text-blue-900 font-bold shadow-2xs'
                        : 'border-slate-200 bg-slate-50/60 text-slate-700 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <span>{preset.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-mono text-slate-500">
                        {preset.width} × {preset.height} px
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer shadow-md shadow-blue-500/20"
          >
            Apply Dimensions
          </button>
        </div>
      </div>
    </div>
  );
};
