import React, { useState } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { exportPageImage, exportDocumentToJSON } from '../../utils/exporter';
import confetti from 'canvas-confetti';
import { X, Download, FileImage, FileCode } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const { document: doc, currentPage, currentPageIndex } = useCanvas();
  const [format, setFormat] = useState<'png' | 'jpeg' | 'svg' | 'json'>('png');
  const [scale, setScale] = useState<number>(2); // Default to 2x Retina
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      setIsExporting(true);

      if (format === 'json') {
        exportDocumentToJSON(doc);
      } else {
        await exportPageImage(
          currentPage,
          doc.width,
          doc.height,
          format,
          scale,
          `${doc.title.toLowerCase().replace(/\s+/g, '-')}-p${currentPageIndex + 1}`
        );
      }

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.15, x: 0.85 },
        colors: ['#4F46E5', '#06B6D4', '#6366F1', '#10B981'],
      });

      onClose();
    } catch (err) {
      console.error('Export error:', err);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const outputWidth = Math.round(doc.width * scale);
  const outputHeight = Math.round(doc.height * scale);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-150 select-none">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center space-x-2">
            <Download className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-800">Export Design</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* File Format Selection */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              File Format
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'png', label: 'PNG', desc: 'High Quality', icon: FileImage },
                { id: 'jpeg', label: 'JPG', desc: 'Compact Size', icon: FileImage },
                { id: 'svg', label: 'SVG', desc: 'Vector Graphic', icon: FileCode },
                { id: 'json', label: 'JSON', desc: 'Project File', icon: FileCode },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setFormat(fmt.id as any)}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                    format === fmt.id
                      ? 'border-blue-600 bg-blue-50/60 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                  }`}
                >
                  <span className={`text-xs font-bold block ${format === fmt.id ? 'text-blue-700' : 'text-slate-800'}`}>
                    {fmt.label}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">{fmt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Resolution Scale (for PNG and JPG) */}
          {format !== 'json' && format !== 'svg' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Resolution Scale
                </label>
                <span className="text-xs font-mono font-bold text-blue-600">
                  {outputWidth} × {outputHeight} px
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: 1, label: '1x', desc: 'Web (72 DPI)' },
                  { val: 2, label: '2x (Retina)', desc: 'Sharp (144 DPI)' },
                  { val: 3, label: '3x (Print)', desc: 'Ultra (300 DPI)' },
                ].map((s) => (
                  <button
                    key={s.val}
                    onClick={() => setScale(s.val)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      scale === s.val
                        ? 'border-blue-600 bg-blue-50 text-blue-800 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <span className="text-xs block">{s.label}</span>
                    <span className="text-[10px] text-slate-400 block">{s.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Page Notice */}
          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-blue-800">
            Exporting <span className="font-bold">Page {currentPageIndex + 1}</span> of {doc.pages.length} ({currentPage.elements.length} elements).
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-700 hover:to-teal-600 text-white text-xs font-bold shadow-md shadow-indigo-500/20 cursor-pointer transition-all flex items-center space-x-1.5 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Generating...' : `Download ${format.toUpperCase()}`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
