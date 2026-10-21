import React, { useState } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import type { ShapeElement, TextElement, ImageElement, DrawingElement, TextEffect } from '../../types/canvas';
import { FONT_FAMILIES, CANVAS_PRESETS } from '../../utils/presets';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  BringToFront,
  SendToBack,
  ArrowUp,
  ArrowDown,
  Copy,
  Trash2,
  Lock,
  Unlock,
  FlipHorizontal,
  FlipVertical,
  Scaling,
  Grid,
  Sparkles,
  Sliders,
  AlignVerticalJustifyCenter,
  Palette,
} from 'lucide-react';

export const ContextToolbar: React.FC = () => {
  const {
    document: doc,
    currentPage,
    selectedElement,
    updateElement,
    deleteElement,
    duplicateElement,
    bringForward,
    sendBackward,
    bringToFront,
    sendToBack,
    alignElement,
    flipHorizontal,
    flipVertical,
    toggleLock,
    setDimensions,
    setPageBackgroundColor,
    setPageBackgroundGradient,
    showRulerGrid,
    toggleRulerGrid,
  } = useCanvas();

  // Popover menus state
  const [showSpacingPopover, setShowSpacingPopover] = useState(false);
  const [showEffectsPopover, setShowEffectsPopover] = useState(false);
  const [showAlignPopover, setShowAlignPopover] = useState(false);
  const [showFilterPopover, setShowFilterPopover] = useState(false);

  // 1. TEXT TOOLBAR
  if (selectedElement && selectedElement.type === 'text') {
    const textEl = selectedElement as TextElement;

    return (
      <div className="h-12 bg-white border-b border-slate-200 px-4 flex items-center space-x-2 text-xs text-slate-700 overflow-x-auto select-none shrink-0 shadow-2xs">
        {/* Font Family Dropdown with live font styling preview */}
        <select
          value={textEl.fontFamily}
          onChange={(e) => updateElement(textEl.id, { fontFamily: e.target.value }, true)}
          className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 font-semibold focus:ring-1 focus:ring-blue-500 outline-none cursor-pointer text-xs"
        >
          {FONT_FAMILIES.map((f) => (
            <option key={f.name} value={f.family} style={{ fontFamily: f.family }}>
              {f.name}
            </option>
          ))}
        </select>

        {/* Font Size Stepper */}
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
          <button
            onClick={() => updateElement(textEl.id, { fontSize: Math.max(8, textEl.fontSize - 2) }, true)}
            className="px-2 py-1 hover:bg-slate-200 text-slate-700 cursor-pointer font-bold"
          >
            -
          </button>
          <input
            type="number"
            value={textEl.fontSize}
            onChange={(e) => updateElement(textEl.id, { fontSize: Number(e.target.value) || 12 }, true)}
            className="w-11 text-center bg-transparent border-x border-slate-200 text-slate-900 font-bold outline-none py-1 text-xs"
          />
          <button
            onClick={() => updateElement(textEl.id, { fontSize: textEl.fontSize + 2 }, true)}
            className="px-2 py-1 hover:bg-slate-200 text-slate-700 cursor-pointer font-bold"
          >
            +
          </button>
        </div>

        <div className="h-5 w-px bg-slate-200 mx-1" />

        {/* Text Color Picker */}
        <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1" title="Text Color">
          <div className="relative w-4 h-4 rounded-full overflow-hidden border border-slate-300 shadow-2xs cursor-pointer">
            <input
              type="color"
              value={textEl.fill}
              onChange={(e) => updateElement(textEl.id, { fill: e.target.value }, true)}
              className="absolute -top-3 -left-3 w-10 h-10 cursor-pointer border-none p-0"
            />
          </div>
          <span className="font-mono text-[10px] text-slate-600 font-medium">{textEl.fill}</span>
        </div>

        {/* Highlight / Background Pill Color */}
        <div className="flex items-center space-x-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1" title="Highlight Pill Background">
          <div className="relative w-4 h-4 rounded overflow-hidden border border-slate-300 shadow-2xs cursor-pointer">
            <input
              type="color"
              value={textEl.backgroundColor && textEl.backgroundColor !== 'transparent' ? textEl.backgroundColor : '#FEF3C7'}
              onChange={(e) => updateElement(textEl.id, { backgroundColor: e.target.value }, true)}
              className="absolute -top-3 -left-3 w-10 h-10 cursor-pointer border-none p-0"
            />
          </div>
          <button
            onClick={() =>
              updateElement(
                textEl.id,
                { backgroundColor: textEl.backgroundColor ? undefined : '#FEF3C7' },
                true
              )
            }
            className={`text-[10px] px-1 py-0.5 rounded ${
              textEl.backgroundColor ? 'bg-amber-100 text-amber-800 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Pill
          </button>
        </div>

        {/* Formatting: Bold, Italic, Underline, Uppercase */}
        <div className="flex items-center space-x-0.5 bg-slate-50 border border-slate-200 rounded-lg p-0.5">
          <button
            onClick={() =>
              updateElement(textEl.id, { fontWeight: textEl.fontWeight === 'bold' ? 'normal' : 'bold' }, true)
            }
            title="Bold"
            className={`p-1.5 rounded-md cursor-pointer ${
              textEl.fontWeight === 'bold' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() =>
              updateElement(textEl.id, { fontStyle: textEl.fontStyle === 'italic' ? 'normal' : 'italic' }, true)
            }
            title="Italic"
            className={`p-1.5 rounded-md cursor-pointer ${
              textEl.fontStyle === 'italic' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() =>
              updateElement(
                textEl.id,
                { textDecoration: textEl.textDecoration === 'underline' ? 'none' : 'underline' },
                true
              )
            }
            title="Underline"
            className={`p-1.5 rounded-md cursor-pointer ${
              textEl.textDecoration === 'underline' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Underline className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() =>
              updateElement(
                textEl.id,
                { textTransform: textEl.textTransform === 'uppercase' ? 'none' : 'uppercase' },
                true
              )
            }
            title="Uppercase (AA)"
            className={`px-1.5 py-1 text-[11px] font-bold rounded-md cursor-pointer ${
              textEl.textTransform === 'uppercase' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            aA
          </button>
        </div>

        {/* Text Alignment */}
        <div className="flex items-center space-x-0.5 bg-slate-50 border border-slate-200 rounded-lg p-0.5">
          <button
            onClick={() => updateElement(textEl.id, { textAlign: 'left' }, true)}
            title="Align Left"
            className={`p-1.5 rounded-md cursor-pointer ${
              textEl.textAlign === 'left' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => updateElement(textEl.id, { textAlign: 'center' }, true)}
            title="Align Center"
            className={`p-1.5 rounded-md cursor-pointer ${
              textEl.textAlign === 'center' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => updateElement(textEl.id, { textAlign: 'right' }, true)}
            title="Align Right"
            className={`p-1.5 rounded-md cursor-pointer ${
              textEl.textAlign === 'right' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <AlignRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Spacing Popover */}
        <div className="relative">
          <button
            onClick={() => setShowSpacingPopover(!showSpacingPopover)}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 cursor-pointer"
            title="Line and Letter Spacing"
          >
            <Sliders className="w-3.5 h-3.5 text-slate-600" />
            <span>Spacing</span>
          </button>

          {showSpacingPopover && (
            <div className="absolute top-10 left-0 w-56 bg-white border border-slate-200 rounded-xl p-3 shadow-xl z-50 animate-in fade-in">
              <div className="mb-2.5">
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                  <span>Letter Spacing</span>
                  <span>{textEl.letterSpacing || 0}px</span>
                </div>
                <input
                  type="range"
                  min="-2"
                  max="16"
                  value={textEl.letterSpacing || 0}
                  onChange={(e) => updateElement(textEl.id, { letterSpacing: parseInt(e.target.value) }, true)}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                  <span>Line Spacing</span>
                  <span>{(textEl.lineHeight || 1.25).toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="2.5"
                  step="0.1"
                  value={textEl.lineHeight || 1.25}
                  onChange={(e) => updateElement(textEl.id, { lineHeight: parseFloat(e.target.value) }, true)}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Text Effects Popover */}
        <div className="relative">
          <button
            onClick={() => setShowEffectsPopover(!showEffectsPopover)}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 cursor-pointer"
            title="Text Effects (Shadow, Glow, Stroke)"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Effects</span>
          </button>

          {showEffectsPopover && (
            <div className="absolute top-10 left-0 w-48 bg-white border border-slate-200 rounded-xl p-2.5 shadow-xl z-50 animate-in fade-in">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Text Effect
              </span>
              {(['none', 'shadow', 'glow', 'stroke'] as TextEffect[]).map((eff) => (
                <button
                  key={eff}
                  onClick={() => {
                    updateElement(textEl.id, { effect: eff }, true);
                    setShowEffectsPopover(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs capitalize transition-all cursor-pointer ${
                    (textEl.effect || 'none') === eff
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {eff === 'none' ? 'None (Clean)' : eff}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Position / Alignment Popover */}
        <div className="relative">
          <button
            onClick={() => setShowAlignPopover(!showAlignPopover)}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 cursor-pointer"
          >
            <AlignVerticalJustifyCenter className="w-3.5 h-3.5 text-slate-600" />
            <span>Position</span>
          </button>

          {showAlignPopover && (
            <div className="absolute top-10 left-0 w-40 bg-white border border-slate-200 rounded-xl p-2 shadow-xl z-50 animate-in fade-in">
              <div className="grid grid-cols-2 gap-1 text-[11px]">
                <button onClick={() => alignElement('top')} className="p-1.5 rounded hover:bg-slate-100 text-left">Top</button>
                <button onClick={() => alignElement('middle')} className="p-1.5 rounded hover:bg-slate-100 text-left">Middle</button>
                <button onClick={() => alignElement('bottom')} className="p-1.5 rounded hover:bg-slate-100 text-left">Bottom</button>
                <button onClick={() => alignElement('left')} className="p-1.5 rounded hover:bg-slate-100 text-left">Left</button>
                <button onClick={() => alignElement('center')} className="p-1.5 rounded hover:bg-slate-100 text-left">Center</button>
                <button onClick={() => alignElement('right')} className="p-1.5 rounded hover:bg-slate-100 text-left">Right</button>
              </div>
            </div>
          )}
        </div>

        {/* Opacity */}
        <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
          <span className="text-[11px] text-slate-500">Opacity</span>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={textEl.opacity}
            onChange={(e) => updateElement(textEl.id, { opacity: parseFloat(e.target.value) }, true)}
            className="w-14 accent-blue-600 cursor-pointer"
          />
          <span className="text-[11px] font-mono text-slate-700 font-semibold w-7">
            {Math.round(textEl.opacity * 100)}%
          </span>
        </div>

        <div className="h-5 w-px bg-slate-200 mx-1" />

        {/* Layer Arrange */}
        <div className="flex items-center space-x-0.5">
          <button
            onClick={() => bringForward(textEl.id)}
            title="Bring Forward"
            className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => sendBackward(textEl.id)}
            title="Send Backward"
            className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => bringToFront(textEl.id)}
            title="To Front"
            className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <BringToFront className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => sendToBack(textEl.id)}
            title="To Back"
            className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <SendToBack className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="h-5 w-px bg-slate-200 mx-1" />

        {/* Duplicate, Lock, Delete */}
        <button
          onClick={() => duplicateElement(textEl.id)}
          title="Duplicate (Ctrl+D)"
          className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => toggleLock(textEl.id)}
          title={textEl.isLocked ? 'Unlock' : 'Lock'}
          className={`p-1.5 border rounded-lg cursor-pointer ${
            textEl.isLocked
              ? 'bg-rose-50 border-rose-200 text-rose-600'
              : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
          }`}
        >
          {textEl.isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={() => deleteElement(textEl.id)}
          title="Delete"
          className="p-1.5 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-slate-600 hover:text-rose-600 rounded-lg cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  // 2. SHAPE & ICON TOOLBAR
  if (selectedElement && (selectedElement.type === 'shape' || selectedElement.type === 'icon')) {
    const shape = selectedElement as ShapeElement;

    return (
      <div className="h-12 bg-white border-b border-slate-200 px-4 flex items-center space-x-2 text-xs text-slate-700 overflow-x-auto select-none shrink-0 shadow-2xs">
        {/* Fill Color */}
        <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
          <span className="text-[11px] text-slate-500">Fill</span>
          <div className="relative w-4 h-4 rounded overflow-hidden border border-slate-300 shadow-2xs cursor-pointer">
            <input
              type="color"
              value={shape.fill === 'transparent' ? '#2563EB' : shape.fill}
              onChange={(e) => updateElement(shape.id, { fill: e.target.value, gradientFill: null }, true)}
              className="absolute -top-3 -left-3 w-10 h-10 cursor-pointer border-none p-0"
            />
          </div>
          <button
            onClick={() =>
              updateElement(shape.id, { fill: shape.fill === 'transparent' ? '#2563EB' : 'transparent' }, true)
            }
            className={`text-[10px] px-1 py-0.5 rounded ${
              shape.fill === 'transparent' ? 'bg-blue-600 text-white font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            None
          </button>
        </div>

        {/* Gradient Fill Quick Toggle */}
        <button
          onClick={() => {
            const hasGrad = !!shape.gradientFill;
            updateElement(
              shape.id,
              {
                gradientFill: hasGrad
                  ? null
                  : { type: 'linear', colors: ['#2563EB', '#06B6D4'], angle: 135 },
              },
              true
            );
          }}
          className={`flex items-center space-x-1 px-2 py-1 rounded-lg border text-xs cursor-pointer ${
            shape.gradientFill
              ? 'bg-blue-50 border-blue-400 text-blue-700 font-bold'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Gradient</span>
        </button>

        {/* Border / Stroke Color & Width */}
        <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
          <span className="text-[11px] text-slate-500">Border</span>
          <div className="relative w-4 h-4 rounded overflow-hidden border border-slate-300 shadow-2xs cursor-pointer">
            <input
              type="color"
              value={shape.stroke === 'transparent' ? '#0F172A' : shape.stroke || '#0F172A'}
              onChange={(e) =>
                updateElement(shape.id, { stroke: e.target.value, strokeWidth: shape.strokeWidth || 2 }, true)
              }
              className="absolute -top-3 -left-3 w-10 h-10 cursor-pointer border-none p-0"
            />
          </div>
          <input
            type="number"
            min="0"
            max="30"
            value={shape.strokeWidth || 0}
            onChange={(e) =>
              updateElement(shape.id, { strokeWidth: Math.max(0, parseInt(e.target.value) || 0) }, true)
            }
            className="w-9 bg-white border border-slate-200 rounded px-1 py-0.5 text-center text-xs text-slate-900 font-bold"
          />
          <span className="text-[10px] text-slate-400">px</span>
        </div>

        {/* Dashed vs Solid Toggle */}
        <button
          onClick={() =>
            updateElement(
              shape.id,
              { strokeStyle: shape.strokeStyle === 'dashed' ? 'solid' : 'dashed' },
              true
            )
          }
          className={`px-2 py-1 rounded-lg border text-[11px] cursor-pointer ${
            shape.strokeStyle === 'dashed'
              ? 'bg-blue-50 border-blue-300 text-blue-700 font-bold'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
          title="Toggle dashed border"
        >
          {shape.strokeStyle === 'dashed' ? 'Dashed' : 'Solid'}
        </button>

        {/* Corner Radius (for rect/rounded-rect) */}
        {(shape.shapeType === 'rounded-rect' || shape.shapeType === 'rect') && (
          <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
            <span className="text-[11px] text-slate-500">Radius</span>
            <input
              type="range"
              min="0"
              max="80"
              value={shape.cornerRadius || 0}
              onChange={(e) =>
                updateElement(
                  shape.id,
                  { cornerRadius: parseInt(e.target.value), shapeType: 'rounded-rect' },
                  true
                )
              }
              className="w-14 accent-blue-600 cursor-pointer"
            />
            <span className="text-[11px] font-mono font-semibold text-slate-700 w-5">
              {shape.cornerRadius || 0}
            </span>
          </div>
        )}

        {/* Shadow Toggle */}
        <button
          onClick={() => updateElement(shape.id, { hasShadow: !shape.hasShadow }, true)}
          className={`px-2 py-1 rounded-lg border text-[11px] cursor-pointer ${
            shape.hasShadow
              ? 'bg-blue-50 border-blue-400 text-blue-700 font-bold'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
        >
          Shadow
        </button>

        {/* Flip H / V */}
        <div className="flex items-center space-x-0.5 bg-slate-50 border border-slate-200 rounded-lg p-0.5">
          <button
            onClick={() => flipHorizontal(shape.id)}
            title="Flip Horizontal"
            className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200 cursor-pointer"
          >
            <FlipHorizontal className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => flipVertical(shape.id)}
            title="Flip Vertical"
            className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200 cursor-pointer"
          >
            <FlipVertical className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Opacity */}
        <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
          <span className="text-[11px] text-slate-500">Opacity</span>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={shape.opacity}
            onChange={(e) => updateElement(shape.id, { opacity: parseFloat(e.target.value) }, true)}
            className="w-14 accent-blue-600 cursor-pointer"
          />
          <span className="text-[11px] font-mono text-slate-700 font-semibold w-7">
            {Math.round(shape.opacity * 100)}%
          </span>
        </div>

        <div className="h-5 w-px bg-slate-200 mx-1" />

        {/* Layer Arrange */}
        <div className="flex items-center space-x-0.5">
          <button onClick={() => bringForward(shape.id)} title="Forward" className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900">
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => sendBackward(shape.id)} title="Backward" className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900">
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => bringToFront(shape.id)} title="To Front" className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900">
            <BringToFront className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => sendToBack(shape.id)} title="To Back" className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900">
            <SendToBack className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="h-5 w-px bg-slate-200 mx-1" />

        {/* Duplicate, Lock, Delete */}
        <button onClick={() => duplicateElement(shape.id)} title="Duplicate" className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900">
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => toggleLock(shape.id)} title={shape.isLocked ? 'Unlock' : 'Lock'} className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600">
          {shape.isLocked ? <Lock className="w-3.5 h-3.5 text-rose-600" /> : <Unlock className="w-3.5 h-3.5" />}
        </button>
        <button onClick={() => deleteElement(shape.id)} title="Delete" className="p-1.5 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-slate-600 hover:text-rose-600 rounded-lg">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  // 3. IMAGE TOOLBAR
  if (selectedElement && selectedElement.type === 'image') {
    const imgEl = selectedElement as ImageElement;

    return (
      <div className="h-12 bg-white border-b border-slate-200 px-4 flex items-center space-x-2 text-xs text-slate-700 overflow-x-auto select-none shrink-0 shadow-2xs">
        {/* Filters Popover */}
        <div className="relative">
          <button
            onClick={() => setShowFilterPopover(!showFilterPopover)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-300 text-blue-700 font-bold cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Image Filters</span>
          </button>

          {showFilterPopover && (
            <div className="absolute top-10 left-0 w-64 bg-white border border-slate-200 rounded-xl p-3.5 shadow-xl z-50 animate-in fade-in space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Filter Adjustments
              </span>
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                  <span>Brightness</span>
                  <span>{imgEl.brightness ?? 100}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="180"
                  value={imgEl.brightness ?? 100}
                  onChange={(e) => updateElement(imgEl.id, { brightness: parseInt(e.target.value) }, true)}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                  <span>Contrast</span>
                  <span>{imgEl.contrast ?? 100}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="180"
                  value={imgEl.contrast ?? 100}
                  onChange={(e) => updateElement(imgEl.id, { contrast: parseInt(e.target.value) }, true)}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                  <span>Saturation</span>
                  <span>{imgEl.saturation ?? 100}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={imgEl.saturation ?? 100}
                  onChange={(e) => updateElement(imgEl.id, { saturation: parseInt(e.target.value) }, true)}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1 border-t border-slate-100">
                <button
                  onClick={() => updateElement(imgEl.id, { grayscale: imgEl.grayscale ? 0 : 100 }, true)}
                  className={`flex-1 py-1 rounded text-xs font-semibold ${
                    imgEl.grayscale ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  B&W
                </button>
                <button
                  onClick={() => updateElement(imgEl.id, { sepia: imgEl.sepia ? 0 : 80 }, true)}
                  className={`flex-1 py-1 rounded text-xs font-semibold ${
                    imgEl.sepia ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Sepia
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Corner Radius */}
        <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
          <span className="text-[11px] text-slate-500">Radius</span>
          <input
            type="range"
            min="0"
            max="60"
            value={imgEl.borderRadius || 0}
            onChange={(e) => updateElement(imgEl.id, { borderRadius: parseInt(e.target.value) }, true)}
            className="w-14 accent-blue-600 cursor-pointer"
          />
          <span className="text-[11px] font-mono font-semibold text-slate-700 w-5">
            {imgEl.borderRadius || 0}
          </span>
        </div>

        {/* Shadow Toggle */}
        <button
          onClick={() => updateElement(imgEl.id, { hasShadow: !imgEl.hasShadow }, true)}
          className={`px-2.5 py-1.5 rounded-lg border text-xs cursor-pointer ${
            imgEl.hasShadow
              ? 'bg-blue-50 border-blue-400 text-blue-700 font-bold'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
        >
          Drop Shadow
        </button>

        {/* Flip H / V */}
        <div className="flex items-center space-x-0.5 bg-slate-50 border border-slate-200 rounded-lg p-0.5">
          <button
            onClick={() => flipHorizontal(imgEl.id)}
            title="Flip Horizontal"
            className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200 cursor-pointer"
          >
            <FlipHorizontal className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => flipVertical(imgEl.id)}
            title="Flip Vertical"
            className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200 cursor-pointer"
          >
            <FlipVertical className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Opacity */}
        <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
          <span className="text-[11px] text-slate-500">Opacity</span>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={imgEl.opacity}
            onChange={(e) => updateElement(imgEl.id, { opacity: parseFloat(e.target.value) }, true)}
            className="w-14 accent-blue-600 cursor-pointer"
          />
          <span className="text-[11px] font-mono text-slate-700 font-semibold w-7">
            {Math.round(imgEl.opacity * 100)}%
          </span>
        </div>

        <div className="h-5 w-px bg-slate-200 mx-1" />

        {/* Duplicate, Lock, Delete */}
        <button onClick={() => duplicateElement(imgEl.id)} title="Duplicate" className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900">
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => toggleLock(imgEl.id)} title={imgEl.isLocked ? 'Unlock' : 'Lock'} className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600">
          {imgEl.isLocked ? <Lock className="w-3.5 h-3.5 text-rose-600" /> : <Unlock className="w-3.5 h-3.5" />}
        </button>
        <button onClick={() => deleteElement(imgEl.id)} title="Delete" className="p-1.5 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-slate-600 hover:text-rose-600 rounded-lg">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  // 4. DRAWING PATH TOOLBAR
  if (selectedElement && selectedElement.type === 'drawing') {
    const drawEl = selectedElement as DrawingElement;

    return (
      <div className="h-12 bg-white border-b border-slate-200 px-4 flex items-center space-x-2 text-xs text-slate-700 overflow-x-auto select-none shrink-0 shadow-2xs">
        <span className="font-bold text-slate-700 text-xs">Brush Path:</span>

        {/* Color */}
        <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
          <span className="text-[11px] text-slate-500">Color</span>
          <div className="relative w-4 h-4 rounded-full overflow-hidden border border-slate-300 shadow-2xs cursor-pointer">
            <input
              type="color"
              value={drawEl.stroke}
              onChange={(e) => updateElement(drawEl.id, { stroke: e.target.value }, true)}
              className="absolute -top-3 -left-3 w-10 h-10 cursor-pointer border-none p-0"
            />
          </div>
        </div>

        {/* Stroke Width */}
        <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
          <span className="text-[11px] text-slate-500">Width</span>
          <input
            type="number"
            min="2"
            max="60"
            value={drawEl.strokeWidth}
            onChange={(e) => updateElement(drawEl.id, { strokeWidth: parseInt(e.target.value) || 2 }, true)}
            className="w-10 bg-white border border-slate-200 rounded px-1 py-0.5 text-center text-xs text-slate-900 font-bold"
          />
        </div>

        {/* Opacity */}
        <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
          <span className="text-[11px] text-slate-500">Opacity</span>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={drawEl.opacity}
            onChange={(e) => updateElement(drawEl.id, { opacity: parseFloat(e.target.value) }, true)}
            className="w-14 accent-blue-600 cursor-pointer"
          />
        </div>

        <button onClick={() => deleteElement(drawEl.id)} className="p-1.5 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-slate-600 hover:text-rose-600 rounded-lg">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  // 5. NOTHING SELECTED -> ARTBOARD PROPERTIES TOOLBAR
  return (
    <div className="h-12 bg-white border-b border-slate-200 px-4 flex items-center justify-between text-xs text-slate-700 select-none shrink-0 shadow-2xs">
      <div className="flex items-center space-x-3">
        {/* Canvas Color Picker */}
        <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1">
          <span className="text-[11px] font-semibold text-slate-600">Background:</span>
          <div className="relative w-4 h-4 rounded overflow-hidden border border-slate-300 shadow-2xs cursor-pointer">
            <input
              type="color"
              value={currentPage.backgroundColor || '#FFFFFF'}
              onChange={(e) => setPageBackgroundColor(e.target.value)}
              className="absolute -top-3 -left-3 w-10 h-10 cursor-pointer border-none p-0"
            />
          </div>
          <span className="font-mono text-[10px] text-slate-500 uppercase font-medium">
            {currentPage.backgroundColor || '#FFFFFF'}
          </span>
        </div>

        {/* Quick Gradient Preset Button */}
        <button
          onClick={() =>
            setPageBackgroundGradient(
              currentPage.backgroundGradient
                ? null
                : { type: 'linear', colors: ['#F8FAFC', '#E2E8F0'], angle: 135 }
            )
          }
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg border text-xs cursor-pointer ${
            currentPage.backgroundGradient
              ? 'bg-blue-50 border-blue-400 text-blue-700 font-bold'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Palette className="w-3.5 h-3.5 text-blue-600" />
          <span>Gradient</span>
        </button>

        {/* Canvas Size Presets Dropdown */}
        <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1">
          <Scaling className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={`${doc.width}x${doc.height}`}
            onChange={(e) => {
              const [w, h] = e.target.value.split('x').map(Number);
              if (w && h) setDimensions(w, h);
            }}
            className="bg-transparent text-slate-800 font-bold outline-none cursor-pointer text-xs"
          >
            {CANVAS_PRESETS.map((p) => (
              <option key={p.name} value={`${p.width}x${p.height}`}>
                {p.name} ({p.width} × {p.height})
              </option>
            ))}
          </select>
        </div>

        {/* Grid / Alignment Guidelines Toggle */}
        <button
          onClick={toggleRulerGrid}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg border text-xs cursor-pointer ${
            showRulerGrid
              ? 'bg-blue-50 border-blue-400 text-blue-700 font-bold'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
          title="Toggle Grid Overlay"
        >
          <Grid className="w-3.5 h-3.5" />
          <span>Grid {showRulerGrid ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      <div className="flex items-center space-x-2 text-slate-400 text-xs">
        <span className="text-[11px] font-medium text-slate-500">
          💡 Select any object on canvas to edit its properties
        </span>
      </div>
    </div>
  );
};
