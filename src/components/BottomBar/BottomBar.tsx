import React from 'react';
import { useCanvas } from '../../context/CanvasContext';
import {
  Plus,
  Copy,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Grid,
} from 'lucide-react';

export const BottomBar: React.FC = () => {
  const {
    document: doc,
    currentPageIndex,
    zoom,
    setZoom,
    resetZoomAndPan,
    setCurrentPageIndex,
    addPage,
    duplicatePage,
    deletePage,
    showRulerGrid,
    toggleRulerGrid,
  } = useCanvas();

  return (
    <div className="h-11 bg-white border-t border-slate-200 px-4 flex items-center justify-between text-xs text-slate-700 select-none shrink-0 z-30 shadow-2xs">
      {/* Left: Multi-Page Navigator */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1 bg-slate-50 border border-slate-200 rounded-lg p-0.5">
          <button
            onClick={() => setCurrentPageIndex(currentPageIndex - 1)}
            disabled={currentPageIndex <= 0}
            title="Previous Page"
            className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-200 disabled:opacity-25 cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <span className="text-[11px] font-bold text-slate-800 px-2">
            Page {currentPageIndex + 1} of {doc.pages.length}
          </span>

          <button
            onClick={() => setCurrentPageIndex(currentPageIndex + 1)}
            disabled={currentPageIndex >= doc.pages.length - 1}
            title="Next Page"
            className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-200 disabled:opacity-25 cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Add Page Button */}
        <button
          onClick={addPage}
          className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold cursor-pointer text-xs"
          title="Add New Blank Page"
        >
          <Plus className="w-3.5 h-3.5 text-blue-600" />
          <span>Add Page</span>
        </button>

        {/* Duplicate Page Button */}
        <button
          onClick={() => duplicatePage(currentPageIndex)}
          className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 cursor-pointer"
          title="Duplicate Current Page"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>

        {/* Delete Page Button */}
        {doc.pages.length > 1 && (
          <button
            onClick={() => deletePage(currentPageIndex)}
            className="p-1.5 rounded-lg bg-slate-50 hover:bg-rose-50 border border-slate-200 text-slate-600 hover:text-rose-600 cursor-pointer"
            title="Delete Current Page"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Right: Zoom Controls & Alignment Grid */}
      <div className="flex items-center space-x-2">
        <button
          onClick={toggleRulerGrid}
          title="Toggle Grid Overlay"
          className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
            showRulerGrid
              ? 'bg-blue-50 border-blue-300 text-blue-700'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
        </button>

        <div className="h-4 w-px bg-slate-200" />

        <div className="flex items-center space-x-1 bg-slate-50 border border-slate-200 rounded-lg px-1 py-0.5">
          <button
            onClick={() => setZoom((prev) => prev - 0.1)}
            title="Zoom Out"
            className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200 cursor-pointer"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          {/* Zoom Slider */}
          <input
            type="range"
            min="0.25"
            max="2.0"
            step="0.05"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="w-20 accent-blue-600 cursor-pointer h-1.5"
          />

          <span className="text-[11px] font-mono font-bold text-slate-800 w-11 text-center">
            {Math.round(zoom * 100)}%
          </span>

          <button
            onClick={() => setZoom((prev) => prev + 0.1)}
            title="Zoom In"
            className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200 cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={resetZoomAndPan}
            title="Fit to Screen"
            className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200 cursor-pointer ml-0.5"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
