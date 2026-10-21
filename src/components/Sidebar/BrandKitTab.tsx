import React, { useState } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { BRAND_KITS } from '../../utils/presets';
import { Sparkles, Check, Wand2, Copy, Palette } from 'lucide-react';
import confetti from 'canvas-confetti';

export const BrandKitTab: React.FC = () => {
  const {
    currentPage,
    selectedElement,
    updateElement,
    setPageBackgroundColor,
    commitSnapshot,
  } = useCanvas();

  const [activeKitId, setActiveKitId] = useState<string>('bk-studioflow');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = (hex: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  // Apply single color to selected element or page
  const handleApplyColor = (hex: string) => {
    if (!selectedElement) {
      setPageBackgroundColor(hex);
      return;
    }

    if (selectedElement.type === 'shape') {
      updateElement(selectedElement.id, { fill: hex }, true);
    } else if (selectedElement.type === 'text') {
      updateElement(selectedElement.id, { fill: hex }, true);
    } else if (selectedElement.type === 'icon') {
      updateElement(selectedElement.id, { fill: hex }, true);
    } else if (selectedElement.type === 'drawing') {
      updateElement(selectedElement.id, { stroke: hex }, true);
    }
  };

  // Apply complete Brand Kit to current page artboard
  const handleApplyKit = (kit: typeof BRAND_KITS[0]) => {
    commitSnapshot();
    setActiveKitId(kit.id);

    // 1. Recolor elements based on kit palette
    currentPage.elements.forEach((el, index) => {
      if (el.type === 'shape') {
        const shapeFill = index % 2 === 0 ? kit.colors[0] : kit.colors[1];
        updateElement(el.id, { fill: shapeFill });
      } else if (el.type === 'text') {
        const isHeading = el.fontSize >= 28;
        updateElement(el.id, {
          fontFamily: isHeading ? kit.headingFont : kit.bodyFont,
          fill: kit.colors[2],
        });
      } else if (el.type === 'icon') {
        updateElement(el.id, { fill: kit.colors[0] });
      }
    });

    // 2. Trigger celebratory mini confetti
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 },
        colors: kit.colors,
      });
    } catch {
      // Ignore if confetti fails
    }
  };

  return (
    <div className="flex flex-col h-full bg-white select-none overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="font-extrabold text-sm text-slate-800">Brand Kit</h2>
          </div>
          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
            PRO SUITE
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          1-Click palette transformation & curated typography pairings.
        </p>
      </div>

      <div className="p-4 space-y-5">
        {/* Active Selection Tip */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-600 flex items-start space-x-2.5">
          <Palette className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Click any swatch to color the{' '}
            <strong className="text-slate-900 font-bold">
              {selectedElement ? `selected ${selectedElement.type}` : 'canvas background'}
            </strong>
            , or hit <strong className="text-indigo-600 font-bold">Apply Kit</strong> to transform the entire design.
          </p>
        </div>

        {/* Brand Kits Grid */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Curated Brand Palettes
          </h3>

          {BRAND_KITS.map((kit) => {
            const isSelected = activeKitId === kit.id;

            return (
              <div
                key={kit.id}
                className={`border rounded-2xl p-4 transition-all ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                {/* Kit Title and Badge */}
                <div className="flex items-center justify-between mb-2.5">
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900">{kit.name}</h4>
                    <span className="text-[10px] text-slate-500">{kit.tag}</span>
                  </div>
                  <button
                    onClick={() => handleApplyKit(kit)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>Apply Kit</span>
                  </button>
                </div>

                {/* 5-Color Swatch Row */}
                <div className="grid grid-cols-5 gap-1.5 mb-3">
                  {kit.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleApplyColor(color)}
                      title={`Apply ${color} (Click to copy)`}
                      className="group relative h-9 rounded-lg border border-black/10 transition-transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer shadow-2xs"
                      style={{ backgroundColor: color }}
                    >
                      <button
                        onClick={(e) => handleCopyHex(color, e)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-black/40 rounded text-white"
                        title="Copy hex code"
                      >
                        {copiedHex === color ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </button>
                  ))}
                </div>

                {/* Typography preview in this kit */}
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 flex items-center justify-between text-xs">
                  <div className="truncate mr-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Heading • Body
                    </span>
                    <span
                      className="font-bold text-slate-800 truncate block text-xs"
                      style={{ fontFamily: kit.headingFont }}
                    >
                      {kit.headingFont.split(',')[0].replace(/['"]/g, '')}
                    </span>
                    <span
                      className="text-slate-500 truncate block text-[11px]"
                      style={{ fontFamily: kit.bodyFont }}
                    >
                      {kit.bodyFont.split(',')[0].replace(/['"]/g, '')}
                    </span>
                  </div>

                  {selectedElement?.type === 'text' && (
                    <button
                      onClick={() => {
                        updateElement(
                          selectedElement.id,
                          { fontFamily: kit.headingFont },
                          true
                        );
                      }}
                      className="shrink-0 px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold cursor-pointer"
                    >
                      Use Font
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
