import React, { useRef, useState } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { STOCK_IMAGES } from '../../utils/presets';
import { UploadCloud, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';

interface UploadedItem {
  id: string;
  name: string;
  url: string;
  date: number;
}

export const UploadsTab: React.FC = () => {
  const { addImage } = useCanvas();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploads, setUploads] = useState<UploadedItem[]>([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [stockCategory, setStockCategory] = useState<string>('All');

  const stockCategories = ['All', 'Food & Drink', 'Business', 'Architecture', 'Nature', 'Lifestyle', 'Fashion'];

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const url = e.target.result as string;
          const newItem: UploadedItem = {
            id: `upload-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            name: file.name,
            url,
            date: Date.now(),
          };
          setUploads((prev) => [newItem, ...prev]);
          addImage(url);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteUpload = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setUploads((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredStock = stockCategory === 'All'
    ? STOCK_IMAGES
    : STOCK_IMAGES.filter((s) => s.category === stockCategory);

  return (
    <div className="flex flex-col h-full p-4 overflow-y-auto bg-white select-none">
      {/* Title */}
      <div className="flex items-center space-x-2 mb-3">
        <UploadCloud className="w-5 h-5 text-blue-600" />
        <h2 className="text-sm font-bold text-slate-800 tracking-wide uppercase">
          Uploads & Media
        </h2>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/png, image/jpeg, image/webp, image/svg+xml"
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Drag & Drop Upload Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDraggingOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`w-full p-5 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all mb-5 ${
          isDraggingOver
            ? 'border-blue-500 bg-blue-50/70 scale-102 shadow-sm'
            : 'border-slate-200 bg-slate-50/60 hover:border-blue-400 hover:bg-white'
        }`}
      >
        <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
          <UploadCloud className="w-5 h-5" />
        </div>
        <span className="text-xs font-bold text-slate-800 block">
          Upload images from PC
        </span>
        <span className="text-[11px] text-slate-500 mt-0.5">
          Drag & drop files or click to browse
        </span>
        <span className="text-[10px] text-slate-400 mt-1.5 bg-slate-100 px-2 py-0.5 rounded">
          PNG, JPG, WebP, SVG up to 25MB
        </span>
      </div>

      {/* User Uploads Gallery */}
      {uploads.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Your Uploads ({uploads.length})
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {uploads.map((item) => (
              <div
                key={item.id}
                onClick={() => addImage(item.url)}
                className="group relative h-24 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 cursor-pointer hover:border-blue-500 transition-all shadow-2xs"
              >
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[11px] font-semibold text-white bg-blue-600 px-2.5 py-1 rounded shadow">
                    Insert
                  </span>
                </div>
                <button
                  onClick={(e) => handleDeleteUpload(e, item.id)}
                  title="Delete"
                  className="absolute top-1 right-1 p-1 rounded-md bg-white/90 text-rose-600 hover:bg-rose-600 hover:text-white opacity-0 group-hover:opacity-100 transition-all shadow-xs"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Curated High-Res Unsplash Stock Photos (12) */}
      <div>
        <div className="flex items-center space-x-1.5 mb-2.5">
          <ImageIcon className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Curated Stock Photos (12)
          </span>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1 mb-3">
          {stockCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setStockCategory(cat)}
              className={`text-[10px] px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                stockCategory === cat
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {filteredStock.map((stock) => (
            <div
              key={stock.id}
              onClick={() => addImage(stock.url)}
              className="group relative h-24 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 cursor-pointer hover:border-blue-500 transition-all shadow-2xs"
            >
              <img
                src={stock.url}
                alt={stock.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-slate-900/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-[11px] font-semibold text-white bg-blue-600 px-2 py-1 rounded shadow flex items-center space-x-1">
                  <Plus className="w-3 h-3" />
                  <span>Insert</span>
                </span>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 to-transparent p-1.5">
                <span className="text-[10px] font-medium text-white block truncate">
                  {stock.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
