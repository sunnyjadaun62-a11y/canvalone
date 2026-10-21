import React from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { FONT_PAIRINGS } from '../../utils/presets';
import { Type, Sparkles } from 'lucide-react';

export const TextTab: React.FC = () => {
  const { addText, addElement } = useCanvas();

  const handleAddPairing = (pairing: typeof FONT_PAIRINGS[0]) => {
    // Add Heading
    addElement({
      type: 'text',
      text: pairing.heading,
      fontSize: 48,
      fontFamily: pairing.headingFont,
      fill: pairing.headingColor,
      fontWeight: '700',
      textAlign: 'center',
      width: 600,
      height: 70,
      y: 340,
    });

    // Add Subheading directly below
    addElement({
      type: 'text',
      text: pairing.subheading,
      fontSize: 20,
      fontFamily: pairing.subheadingFont,
      fill: pairing.subheadingColor,
      fontWeight: '600',
      textAlign: 'center',
      width: 550,
      height: 50,
      y: 420,
    });
  };

  return (
    <div className="flex flex-col h-full p-4 overflow-y-auto bg-white select-none">
      {/* Title */}
      <div className="flex items-center space-x-2 mb-3">
        <Type className="w-5 h-5 text-blue-600" />
        <h2 className="text-sm font-bold text-slate-800 tracking-wide uppercase">
          Text & Typography
        </h2>
      </div>

      <p className="text-xs text-slate-500 mb-4 leading-relaxed">
        Click to add single text blocks or choose from pre-styled font combinations.
      </p>

      {/* Primary Action Buttons */}
      <div className="flex flex-col gap-2.5 mb-6">
        <button
          onClick={() => addText('heading')}
          className="w-full text-left p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-blue-50/50 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group"
        >
          <span className="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors block">
            Add a heading
          </span>
          <span className="text-[11px] text-slate-400">Large primary header (48px)</span>
        </button>

        <button
          onClick={() => addText('subheading')}
          className="w-full text-left p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-blue-50/50 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group"
        >
          <span className="text-base font-semibold text-slate-800 group-hover:text-blue-600 transition-colors block">
            Add a subheading
          </span>
          <span className="text-[11px] text-slate-400">Supporting subtitle (28px)</span>
        </button>

        <button
          onClick={() => addText('body')}
          className="w-full text-left p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-blue-50/50 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group"
        >
          <span className="text-sm font-normal text-slate-700 group-hover:text-blue-600 transition-colors block">
            Add a little bit of body text
          </span>
          <span className="text-[11px] text-slate-400">Paragraph description (17px)</span>
        </button>
      </div>

      {/* Pre-styled Font Combinations */}
      <div className="flex items-center space-x-1.5 mb-3">
        <Sparkles className="w-4 h-4 text-amber-500" />
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Curated Font Combinations (8)
        </h3>
      </div>

      <div className="flex flex-col gap-2.5">
        {FONT_PAIRINGS.map((pairing, idx) => (
          <button
            key={idx}
            onClick={() => handleAddPairing(pairing)}
            className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/30 text-left transition-all cursor-pointer group shadow-2xs"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                {pairing.title}
              </span>
              <span className="text-[10px] text-slate-400 group-hover:text-blue-600">
                Click to add pair
              </span>
            </div>
            <div
              className="text-lg font-bold leading-tight truncate mb-0.5"
              style={{
                fontFamily: pairing.headingFont,
                color: pairing.headingColor,
              }}
            >
              {pairing.heading}
            </div>
            <div
              className="text-xs truncate text-slate-500"
              style={{
                fontFamily: pairing.subheadingFont,
              }}
            >
              {pairing.subheading}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
