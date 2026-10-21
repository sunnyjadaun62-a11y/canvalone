import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCanvas } from '../../context/CanvasContext';
import { importDocumentFromJSON } from '../../utils/exporter';
import {
  Undo2,
  Redo2,
  Download,
  Upload,
  HelpCircle,
  Scaling,
  Trash2,
  Home,
} from 'lucide-react';
import { StudioFlowLogo } from '../Brand/StudioFlowLogo';
import { ShortcutsModal } from '../Modals/ShortcutsModal';
import { CanvasSizeModal } from '../Modals/CanvasSizeModal';
import { ExportModal } from '../Modals/ExportModal';

export const TopHeader: React.FC = () => {
  const {
    document: doc,
    canUndo,
    canRedo,
    undo,
    redo,
    setTitle,
    loadDocument,
    clearCanvas,
  } = useCanvas();

  const jsonFileInputRef = useRef<HTMLInputElement>(null);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isResizeOpen, setIsResizeOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const handleLoadJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    importDocumentFromJSON(file)
      .then((loadedDoc) => {
        loadDocument(loadedDoc);
      })
      .catch((err) => {
        alert('Could not parse StudioFlow JSON project file.');
        console.error(err);
      })
      .finally(() => {
        if (jsonFileInputRef.current) jsonFileInputRef.current.value = '';
      });
  };

  return (
    <>
      <header className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between shrink-0 select-none z-30 shadow-2xs">
        {/* Left Section: Brand Logo, Home link, Project Title, Canvas Dimensions */}
        <div className="flex items-center space-x-3.5">
          <Link
            to="/"
            className="group flex items-center hover:opacity-90 transition-opacity"
            title="Back to StudioFlow Home"
          >
            <StudioFlowLogo size="sm" />
          </Link>

          <Link
            to="/"
            className="flex items-center space-x-1 px-2 py-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-xs font-semibold transition-colors"
            title="Go to Landing Page"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          <div className="h-5 w-px bg-slate-200" />

          {/* Inline Project Title Input */}
          <input
            type="text"
            value={doc.title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent hover:bg-slate-50 focus:bg-white border border-transparent hover:border-slate-300 focus:border-blue-500 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800 outline-none transition-colors w-48 truncate"
            title="Click to rename design"
          />

          {/* Canvas Size Pill Button */}
          <button
            onClick={() => setIsResizeOpen(true)}
            className="flex items-center space-x-1.5 px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
            title="Resize Canvas Artboard"
          >
            <Scaling className="w-3.5 h-3.5 text-blue-600" />
            <span>
              {doc.width} × {doc.height} px
            </span>
          </button>
        </div>

        {/* Center Section: History Controls */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-0.5 bg-slate-50 border border-slate-200 rounded-lg p-0.5">
            <button
              onClick={undo}
              disabled={!canUndo}
              title="Undo (Ctrl + Z)"
              className="p-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-200 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              title="Redo (Ctrl + Y)"
              className="p-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-200 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Section: Actions & Export */}
        <div className="flex items-center space-x-2">
          {/* Shortcuts Modal Trigger */}
          <button
            onClick={() => setIsShortcutsOpen(true)}
            title="Keyboard Shortcuts (?)"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-transparent hover:border-slate-200 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Clear Canvas */}
          <button
            onClick={() => {
              if (window.confirm('Clear all elements on current page?')) {
                clearCanvas();
              }
            }}
            title="Clear Page Canvas"
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <div className="h-5 w-px bg-slate-200" />

          {/* Hidden JSON file input */}
          <input
            ref={jsonFileInputRef}
            type="file"
            accept=".json"
            onChange={handleLoadJSON}
            className="hidden"
          />

          {/* Load JSON Button */}
          <button
            onClick={() => jsonFileInputRef.current?.click()}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
            title="Load project from JSON file"
          >
            <Upload className="w-3.5 h-3.5 text-blue-600" />
            <span>Load JSON</span>
          </button>

          {/* Primary Export Button */}
          <button
            onClick={() => setIsExportOpen(true)}
            className="flex items-center space-x-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-700 hover:to-teal-600 text-white text-xs font-bold shadow-md shadow-indigo-500/20 cursor-pointer transition-all active:scale-95"
            title="Export design as PNG, JPG, SVG, or JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>
      </header>

      {/* Modals */}
      <ShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
      <CanvasSizeModal isOpen={isResizeOpen} onClose={() => setIsResizeOpen(false)} />
      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </>
  );
};
