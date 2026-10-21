import React from 'react';
import { useCanvas } from '../../context/CanvasContext';
import {
  LayoutTemplate,
  Shapes,
  Type,
  UploadCloud,
  PenTool,
  Palette,
  Layers,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { TemplatesTab } from './TemplatesTab';
import { ElementsTab } from './ElementsTab';
import { TextTab } from './TextTab';
import { UploadsTab } from './UploadsTab';
import { DrawTab } from './DrawTab';
import { BrandKitTab } from './BrandKitTab';
import { BackgroundTab } from './BackgroundTab';
import { LayersTab } from './LayersTab';
import { Sparkles } from 'lucide-react';

export const LeftSidebar: React.FC = () => {
  const { activeSidebarTab, setActiveSidebarTab } = useCanvas();
  const [isOpen, setIsOpen] = React.useState(true);

  const tabs = [
    { id: 'templates', label: 'Templates', icon: LayoutTemplate },
    { id: 'elements', label: 'Elements', icon: Shapes },
    { id: 'text', label: 'Text', icon: Type },
    { id: 'uploads', label: 'Uploads', icon: UploadCloud },
    { id: 'draw', label: 'Draw', icon: PenTool },
    { id: 'brandkit', label: 'Brand Kit', icon: Sparkles },
    { id: 'background', label: 'Background', icon: Palette },
    { id: 'layers', label: 'Layers', icon: Layers },
  ] as const;

  const handleTabClick = (tabId: typeof tabs[number]['id']) => {
    if (activeSidebarTab === tabId && isOpen) {
      setIsOpen(false);
    } else {
      setActiveSidebarTab(tabId);
      setIsOpen(true);
    }
  };

  const renderActiveTabContent = () => {
    switch (activeSidebarTab) {
      case 'templates':
        return <TemplatesTab />;
      case 'elements':
        return <ElementsTab />;
      case 'text':
        return <TextTab />;
      case 'uploads':
        return <UploadsTab />;
      case 'draw':
        return <DrawTab />;
      case 'brandkit':
        return <BrandKitTab />;
      case 'background':
        return <BackgroundTab />;
      case 'layers':
        return <LayersTab />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full z-20 shrink-0 select-none bg-white">
      {/* 1. Left Icon Rail (68px wide) */}
      <div className="w-[68px] bg-white border-r border-slate-200 flex flex-col items-center py-3 space-y-1.5 shrink-0 z-30 shadow-2xs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSidebarTab === tab.id && isOpen;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer relative group ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600 font-bold'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {/* Active Indigo Indicator Pill */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-indigo-600 to-teal-500 rounded-r-full" />
              )}
              <Icon
                className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-indigo-600' : 'text-slate-500 group-hover:text-slate-800'
                }`}
              />
              <span className="text-[10px] tracking-tight mt-1">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Expanding 320px White Drawer Panel */}
      <div
        className={`bg-white border-r border-slate-200 flex flex-col transition-all duration-200 ease-in-out relative ${
          isOpen ? 'w-80 opacity-100' : 'w-0 opacity-0 pointer-events-none overflow-hidden'
        }`}
      >
        <div className="w-80 h-full flex flex-col">
          {renderActiveTabContent()}
        </div>

        {/* Drawer Edge Toggle Tab */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          title={isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-8 bg-white border border-slate-200 rounded-r-md text-slate-500 hover:text-slate-900 flex items-center justify-center shadow-xs cursor-pointer z-40 transition-colors"
        >
          {isOpen ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
