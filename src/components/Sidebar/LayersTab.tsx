import React from 'react';
import { useCanvas } from '../../context/CanvasContext';
import {
  Layers,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  Trash2,
  Type,
  Square,
  Image as ImageIcon,
  Sparkles,
  PenTool,
  Plus,
  Copy,
} from 'lucide-react';
import type { CanvasElement } from '../../types/canvas';

export const LayersTab: React.FC = () => {
  const {
    document: doc,
    currentPage,
    currentPageIndex,
    selectedElementId,
    selectElement,
    bringForward,
    sendBackward,
    toggleLock,
    toggleVisibility,
    deleteElement,
    setCurrentPageIndex,
    addPage,
    duplicatePage,
    deletePage,
  } = useCanvas();

  const reversedElements = [...currentPage.elements].map((el, originalIndex) => ({
    el,
    originalIndex,
  })).reverse();

  const getElementIcon = (el: CanvasElement) => {
    switch (el.type) {
      case 'shape':
        return <Square className="w-3.5 h-3.5 text-blue-600" />;
      case 'text':
        return <Type className="w-3.5 h-3.5 text-emerald-600" />;
      case 'image':
        return <ImageIcon className="w-3.5 h-3.5 text-sky-600" />;
      case 'icon':
        return <Sparkles className="w-3.5 h-3.5 text-amber-600" />;
      case 'drawing':
        return <PenTool className="w-3.5 h-3.5 text-purple-600" />;
      default:
        return <Square className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  const getElementLabel = (el: CanvasElement) => {
    if (el.name) return el.name;
    if (el.type === 'text') {
      const text = (el as any).text || '';
      return text.slice(0, 20) || 'Text Layer';
    }
    if (el.type === 'shape') {
      return `${(el as any).shapeType} shape`;
    }
    return 'Image Layer';
  };

  return (
    <div className="flex flex-col h-full p-4 overflow-y-auto bg-white select-none">
      {/* Title */}
      <div className="flex items-center space-x-2 mb-3">
        <Layers className="w-5 h-5 text-blue-600" />
        <h2 className="text-sm font-bold text-slate-800 tracking-wide uppercase">
          Layers & Pages
        </h2>
      </div>

      {/* Pages Section */}
      <div className="mb-5 p-3 rounded-xl border border-slate-200 bg-slate-50/70">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Pages ({doc.pages.length})
          </span>
          <button
            onClick={addPage}
            className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-blue-600 hover:bg-blue-50 text-[11px] font-semibold cursor-pointer shadow-2xs"
          >
            <Plus className="w-3 h-3" />
            <span>Add Page</span>
          </button>
        </div>

        <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto">
          {doc.pages.map((p, idx) => {
            const isCurrent = idx === currentPageIndex;
            return (
              <div
                key={p.id}
                onClick={() => setCurrentPageIndex(idx)}
                className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                  isCurrent
                    ? 'border-blue-500 bg-white font-bold text-blue-800 shadow-2xs'
                    : 'border-slate-200/80 bg-white/50 text-slate-600 hover:bg-white'
                }`}
              >
                <span className="truncate">
                  {idx + 1}. {p.title} ({p.elements.length} items)
                </span>
                <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => duplicatePage(idx)}
                    title="Duplicate Page"
                    className="p-1 rounded text-slate-400 hover:text-slate-800 hover:bg-slate-100"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  {doc.pages.length > 1 && (
                    <button
                      onClick={() => deletePage(idx)}
                      title="Delete Page"
                      className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-slate-100"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Layers Stack Section */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Elements on Page {currentPageIndex + 1} ({currentPage.elements.length})
        </span>
      </div>

      {currentPage.elements.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 border border-dashed border-slate-200 rounded-xl text-center">
          <Layers className="w-8 h-8 text-slate-400 mb-2" />
          <span className="text-xs font-medium text-slate-500">No objects on this page</span>
          <span className="text-[11px] text-slate-400 mt-0.5">
            Insert elements, text, or templates to begin
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-1.5">
          {reversedElements.map(({ el, originalIndex }) => {
            const isSelected = selectedElementId === el.id;
            const isTop = originalIndex === currentPage.elements.length - 1;
            const isBottom = originalIndex === 0;

            return (
              <div
                key={el.id}
                onClick={() => selectElement(el.id)}
                className={`flex items-center justify-between p-2 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/50 shadow-2xs font-semibold'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                  <div className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    {getElementIcon(el)}
                  </div>
                  <span className="text-xs text-slate-800 truncate">
                    {getElementLabel(el)}
                  </span>
                </div>

                <div className="flex items-center space-x-0.5 shrink-0 ml-1">
                  {/* Reorder Up */}
                  <button
                    disabled={isTop}
                    onClick={(e) => {
                      e.stopPropagation();
                      bringForward(el.id);
                    }}
                    title="Bring Forward"
                    className="p-1 rounded text-slate-400 hover:text-slate-800 hover:bg-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>

                  {/* Reorder Down */}
                  <button
                    disabled={isBottom}
                    onClick={(e) => {
                      e.stopPropagation();
                      sendBackward(el.id);
                    }}
                    title="Send Backward"
                    className="p-1 rounded text-slate-400 hover:text-slate-800 hover:bg-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Visibility */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVisibility(el.id);
                    }}
                    title={el.isHidden ? 'Show Layer' : 'Hide Layer'}
                    className={`p-1 rounded hover:bg-white cursor-pointer ${
                      el.isHidden ? 'text-amber-500' : 'text-slate-400 hover:text-slate-800'
                    }`}
                  >
                    {el.isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>

                  {/* Lock */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLock(el.id);
                    }}
                    title={el.isLocked ? 'Unlock Layer' : 'Lock Layer'}
                    className={`p-1 rounded hover:bg-white cursor-pointer ${
                      el.isLocked ? 'text-rose-500' : 'text-slate-400 hover:text-slate-800'
                    }`}
                  >
                    {el.isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteElement(el.id);
                    }}
                    title="Delete"
                    className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-white cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
