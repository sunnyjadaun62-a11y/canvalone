import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCanvas } from '../context/CanvasContext';
import { TEMPLATES } from '../utils/presets';
import { TopHeader } from '../components/Header/TopHeader';
import { ContextToolbar } from '../components/Header/ContextToolbar';
import { LeftSidebar } from '../components/Sidebar/LeftSidebar';
import { Artboard } from '../components/Canvas/Artboard';
import { BottomBar } from '../components/BottomBar/BottomBar';

export const EditorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { loadTemplate } = useCanvas();
  const loadedTemplateRef = useRef<string | null>(null);

  useEffect(() => {
    const templateId = searchParams.get('template');
    if (templateId && loadedTemplateRef.current !== templateId) {
      const foundTemplate = TEMPLATES.find((t) => t.id === templateId);
      if (foundTemplate) {
        loadTemplate(foundTemplate);
        loadedTemplateRef.current = templateId;
      }
    }
  }, [searchParams, loadTemplate]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#EBECF0] text-slate-800 font-sans select-none">
      {/* 1. Daylight Studio Top Header */}
      <TopHeader />

      {/* 2. Context-Aware 48px Action Sub-Header */}
      <ContextToolbar />

      {/* 3. Main Studio Workspace: 68px Icon Rail + 320px Drawer + Artboard */}
      <div className="flex flex-1 w-full h-[calc(100vh-8.5rem)] overflow-hidden relative">
        <LeftSidebar />
        <Artboard />
      </div>

      {/* 4. Multi-Page and Zoom Bottom Navigation Bar */}
      <BottomBar />
    </div>
  );
};
