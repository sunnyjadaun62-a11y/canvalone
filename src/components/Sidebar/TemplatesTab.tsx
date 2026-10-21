import React, { useState } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { TEMPLATES } from '../../utils/presets';
import type { Template } from '../../types/canvas';
import { LayoutTemplate, Search, Sparkles, Check } from 'lucide-react';

export const TemplatesTab: React.FC = () => {
  const { loadTemplate } = useCanvas();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [appliedId, setAppliedId] = useState<string | null>(null);

  const categories = ['All', 'Social Media', 'Marketing', 'Business', 'Quotes', 'Events', 'Presentation'];

  const filteredTemplates = TEMPLATES.filter((t) => {
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesQuery =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleApply = (template: Template) => {
    loadTemplate(template);
    setAppliedId(template.id);
    setTimeout(() => setAppliedId(null), 1800);
  };

  return (
    <div className="flex flex-col h-full p-4 overflow-y-auto bg-white select-none">
      {/* Title */}
      <div className="flex items-center space-x-2 mb-3">
        <LayoutTemplate className="w-5 h-5 text-blue-600" />
        <h2 className="text-sm font-bold text-slate-800 tracking-wide uppercase">
          Studio Templates
        </h2>
      </div>

      {/* Search Input */}
      <div className="relative mb-3">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search professional templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs px-2.5 py-1 rounded-full transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white font-medium shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates List */}
      <div className="grid grid-cols-1 gap-3.5">
        {filteredTemplates.map((template) => {
          const isApplied = appliedId === template.id;

          return (
            <div
              key={template.id}
              onClick={() => handleApply(template)}
              className="group relative rounded-xl overflow-hidden border border-slate-200 hover:border-blue-500 bg-white transition-all cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5"
            >
              {/* Thumbnail Representation */}
              <div
                className="h-36 w-full flex flex-col items-center justify-center p-4 relative"
                style={{ backgroundColor: template.thumbnailBg }}
              >
                <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors" />

                <div className="relative z-10 text-center max-w-[240px]">
                  <span className="text-[10px] tracking-wider uppercase font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {template.category}
                  </span>
                  <h4 className="text-slate-900 font-extrabold text-sm mt-2 leading-snug truncate">
                    {template.title}
                  </h4>
                  <span className="text-[11px] text-slate-500 block mt-1 font-mono">
                    {template.width} × {template.height} px
                  </span>
                </div>

                {/* Hover overlay button */}
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-lg flex items-center space-x-1.5 transform scale-95 group-hover:scale-100 transition-transform">
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Loaded!</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Use This Template</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-white border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800 truncate">
                  {template.title}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {template.page.elements.length} objects
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
