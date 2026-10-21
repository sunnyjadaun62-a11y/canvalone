import React from 'react';
import { X, Keyboard } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Ctrl + D', action: 'Duplicate selected element' },
    { key: 'Delete / Backspace', action: 'Delete selected element' },
    { key: 'Ctrl + Z', action: 'Undo recent change' },
    { key: 'Ctrl + Y', action: 'Redo change' },
    { key: 'Arrow Keys', action: 'Nudge element by 1px' },
    { key: 'Shift + Arrow', action: 'Nudge element by 10px' },
    { key: 'Shift + Drag Corner', action: 'Lock aspect ratio during resize' },
    { key: 'Shift + Rotate', action: 'Snap rotation to 15° angles' },
    { key: 'Space + Drag', action: 'Pan canvas viewport' },
    { key: 'Ctrl + Scroll', action: 'Zoom in / out' },
    { key: 'Double Click (Text)', action: 'Inline edit text directly on canvas' },
    { key: 'Escape', action: 'Deselect current element' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-150 select-none">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center space-x-2">
            <Keyboard className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-800">Keyboard Shortcuts</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 max-h-[65vh] overflow-y-auto">
          <div className="grid grid-cols-1 gap-2">
            {shortcuts.map((s, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-xs"
              >
                <span className="text-slate-700 font-medium">{s.action}</span>
                <kbd className="px-2 py-1 rounded bg-white text-blue-700 font-mono text-[11px] border border-slate-200 shadow-2xs font-semibold">
                  {s.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
