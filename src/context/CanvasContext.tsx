import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import type {
  CanvasDocument,
  CanvasPage,
  CanvasElement,
  ShapeElement,
  TextElement,
  ImageElement,
  IconElement,
  DrawingElement,
  DrawingPoint,
  ShapeType,
  Template,
  BackgroundPattern,
} from '../types/canvas';
import { TEMPLATES } from '../utils/presets';
import type { SnapGuide } from '../utils/math';

interface CanvasContextType {
  document: CanvasDocument;
  currentPage: CanvasPage;
  currentPageIndex: number;
  selectedElementId: string | null;
  selectedElement: CanvasElement | null;
  zoom: number;
  panOffset: { x: number; y: number };
  activeSidebarTab: 'templates' | 'elements' | 'text' | 'uploads' | 'draw' | 'brandkit' | 'background' | 'layers';
  snapGuides: SnapGuide[];
  editingTextId: string | null;
  canUndo: boolean;
  canRedo: boolean;
  showRulerGrid: boolean;

  // Freehand Brush state
  isDrawingMode: boolean;
  brushType: 'pen' | 'marker' | 'highlighter' | 'eraser';
  brushColor: string;
  brushSize: number;

  // Viewport Actions
  setZoom: (zoom: number | ((prev: number) => number)) => void;
  setPanOffset: (offset: { x: number; y: number } | ((prev: { x: number; y: number }) => { x: number; y: number })) => void;
  setActiveSidebarTab: (tab: 'templates' | 'elements' | 'text' | 'uploads' | 'draw' | 'brandkit' | 'background' | 'layers') => void;
  setSnapGuides: (guides: SnapGuide[]) => void;
  setEditingTextId: (id: string | null) => void;
  selectElement: (id: string | null) => void;
  resetZoomAndPan: () => void;
  fitToScreen: (containerWidth: number, containerHeight: number) => void;
  toggleRulerGrid: () => void;

  // Brush controls
  setIsDrawingMode: (mode: boolean) => void;
  setBrushType: (type: 'pen' | 'marker' | 'highlighter' | 'eraser') => void;
  setBrushColor: (color: string) => void;
  setBrushSize: (size: number) => void;
  addDrawingElement: (points: DrawingPoint[]) => void;

  // History Actions
  undo: () => void;
  redo: () => void;
  commitSnapshot: () => void;

  // Document & Page Actions
  setDimensions: (width: number, height: number) => void;
  setTitle: (title: string) => void;
  setCurrentPageIndex: (index: number) => void;
  addPage: () => void;
  duplicatePage: (index?: number) => void;
  deletePage: (index?: number) => void;
  setPageBackgroundColor: (color: string) => void;
  setPageBackgroundGradient: (gradient: CanvasPage['backgroundGradient']) => void;
  setPageBackgroundPattern: (pattern: BackgroundPattern) => void;

  // Element Actions
  addElement: (element: Partial<CanvasElement> & { type: CanvasElement['type'] }) => string;
  addShape: (shapeType: ShapeType) => string;
  addText: (preset?: 'heading' | 'subheading' | 'body', customText?: string) => string;
  addImage: (src: string, width?: number, height?: number) => string;
  addIcon: (icon: { id: string; name: string; viewBox: string; path: string }) => string;
  updateElement: (id: string, updates: Partial<CanvasElement>, commit?: boolean) => void;
  deleteElement: (id?: string) => void;
  duplicateElement: (id?: string) => void;
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;
  alignElement: (alignment: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => void;
  flipHorizontal: (id?: string) => void;
  flipVertical: (id?: string) => void;
  toggleLock: (id: string) => void;
  toggleVisibility: (id: string) => void;

  // Template & Project Loaders
  loadTemplate: (template: Template) => void;
  loadDocument: (newDoc: CanvasDocument) => void;
  clearCanvas: () => void;
}

const CanvasContext = createContext<CanvasContextType | null>(null);

// Initial Document loaded from Template 1 (Artisan Cafe & Bakery)
const INITIAL_DOC: CanvasDocument = {
  id: 'doc-starter',
  title: 'Artisan Cafe & Bakery Promo',
  width: 1080,
  height: 1080,
  currentPageIndex: 0,
  pages: [
    JSON.parse(JSON.stringify(TEMPLATES[0].page)),
  ],
  updatedAt: Date.now(),
};

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [doc, setDoc] = useState<CanvasDocument>(INITIAL_DOC);
  const [past, setPast] = useState<CanvasDocument[]>([]);
  const [future, setFuture] = useState<CanvasDocument[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [zoom, setZoomState] = useState<number>(0.65);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeSidebarTab, setActiveSidebarTab] = useState<'templates' | 'elements' | 'text' | 'uploads' | 'draw' | 'brandkit' | 'background' | 'layers'>('templates');
  const [snapGuides, setSnapGuides] = useState<SnapGuide[]>([]);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [showRulerGrid, setShowRulerGrid] = useState<boolean>(false);

  // Brush controls
  const [isDrawingMode, setIsDrawingMode] = useState<boolean>(false);
  const [brushType, setBrushType] = useState<'pen' | 'marker' | 'highlighter' | 'eraser'>('pen');
  const [brushColor, setBrushColor] = useState<string>('#1E293B');
  const [brushSize, setBrushSize] = useState<number>(6);

  const docRef = useRef<CanvasDocument>(doc);
  docRef.current = doc;

  const activePageIndex = Math.max(0, Math.min(doc.currentPageIndex, doc.pages.length - 1));
  const currentPage = doc.pages[activePageIndex] || doc.pages[0];

  const setZoom = useCallback((newZoom: number | ((prev: number) => number)) => {
    setZoomState((prev) => {
      const val = typeof newZoom === 'function' ? newZoom(prev) : newZoom;
      return Math.min(Math.max(val, 0.2), 3.0);
    });
  }, []);

  const pushToPast = useCallback((previousDoc: CanvasDocument) => {
    setPast((prev) => {
      const updated = [...prev, previousDoc];
      if (updated.length > 40) return updated.slice(updated.length - 40);
      return updated;
    });
    setFuture([]);
  }, []);

  const commitSnapshot = useCallback(() => {
    pushToPast(JSON.parse(JSON.stringify(docRef.current)));
  }, [pushToPast]);

  const undo = useCallback(() => {
    setPast((prevPast) => {
      if (prevPast.length === 0) return prevPast;
      const previous = prevPast[prevPast.length - 1];
      const newPast = prevPast.slice(0, prevPast.length - 1);

      setFuture((prevFuture) => [docRef.current, ...prevFuture]);
      setDoc(previous);
      return newPast;
    });
  }, []);

  const redo = useCallback(() => {
    setFuture((prevFuture) => {
      if (prevFuture.length === 0) return prevFuture;
      const next = prevFuture[0];
      const newFuture = prevFuture.slice(1);

      setPast((prevPast) => [...prevPast, docRef.current]);
      setDoc(next);
      return newFuture;
    });
  }, []);

  const selectElement = useCallback((id: string | null) => {
    setSelectedElementId(id);
    if (editingTextId && editingTextId !== id) {
      setEditingTextId(null);
    }
  }, [editingTextId]);

  const resetZoomAndPan = useCallback(() => {
    setZoomState(0.65);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  const fitToScreen = useCallback((containerWidth: number, containerHeight: number) => {
    if (!containerWidth || !containerHeight) return;
    const padding = 100;
    const availableW = Math.max(containerWidth - padding, 200);
    const availableH = Math.max(containerHeight - padding, 200);
    const scaleX = availableW / docRef.current.width;
    const scaleY = availableH / docRef.current.height;
    const bestScale = Math.min(scaleX, scaleY, 1.1);
    setZoomState(Math.max(bestScale, 0.25));
    setPanOffset({ x: 0, y: 0 });
  }, []);

  const toggleRulerGrid = useCallback(() => {
    setShowRulerGrid((prev) => !prev);
  }, []);

  const setDimensions = useCallback((width: number, height: number) => {
    commitSnapshot();
    setDoc((prev) => ({
      ...prev,
      width,
      height,
      updatedAt: Date.now(),
    }));
  }, [commitSnapshot]);

  const setTitle = useCallback((title: string) => {
    setDoc((prev) => ({
      ...prev,
      title,
      updatedAt: Date.now(),
    }));
  }, []);

  // Multi-page management
  const setCurrentPageIndex = useCallback((index: number) => {
    setSelectedElementId(null);
    setDoc((prev) => ({
      ...prev,
      currentPageIndex: Math.max(0, Math.min(index, prev.pages.length - 1)),
    }));
  }, []);

  const addPage = useCallback(() => {
    commitSnapshot();
    const newPage: CanvasPage = {
      id: `page-${Date.now()}`,
      title: `Page ${docRef.current.pages.length + 1}`,
      backgroundColor: '#FFFFFF',
      backgroundGradient: null,
      backgroundPattern: 'none',
      elements: [],
    };

    setDoc((prev) => ({
      ...prev,
      pages: [...prev.pages, newPage],
      currentPageIndex: prev.pages.length,
      updatedAt: Date.now(),
    }));
    setSelectedElementId(null);
  }, [commitSnapshot]);

  const duplicatePage = useCallback((index?: number) => {
    commitSnapshot();
    const idx = index !== undefined ? index : docRef.current.currentPageIndex;
    const source = docRef.current.pages[idx];
    if (!source) return;

    const cloned: CanvasPage = {
      ...JSON.parse(JSON.stringify(source)),
      id: `page-${Date.now()}`,
      title: `${source.title} (Copy)`,
    };

    setDoc((prev) => {
      const pages = [...prev.pages];
      pages.splice(idx + 1, 0, cloned);
      return {
        ...prev,
        pages,
        currentPageIndex: idx + 1,
        updatedAt: Date.now(),
      };
    });
    setSelectedElementId(null);
  }, [commitSnapshot]);

  const deletePage = useCallback((index?: number) => {
    if (docRef.current.pages.length <= 1) {
      alert('A document must have at least one page.');
      return;
    }
    commitSnapshot();
    const idx = index !== undefined ? index : docRef.current.currentPageIndex;

    setDoc((prev) => {
      const pages = prev.pages.filter((_, i) => i !== idx);
      const newIndex = Math.min(prev.currentPageIndex, pages.length - 1);
      return {
        ...prev,
        pages,
        currentPageIndex: newIndex,
        updatedAt: Date.now(),
      };
    });
    setSelectedElementId(null);
  }, [commitSnapshot]);

  // Page background controls
  const setPageBackgroundColor = useCallback((color: string) => {
    commitSnapshot();
    setDoc((prev) => ({
      ...prev,
      pages: prev.pages.map((p, i) =>
        i === prev.currentPageIndex
          ? { ...p, backgroundColor: color, backgroundGradient: null }
          : p
      ),
      updatedAt: Date.now(),
    }));
  }, [commitSnapshot]);

  const setPageBackgroundGradient = useCallback((gradient: CanvasPage['backgroundGradient']) => {
    commitSnapshot();
    setDoc((prev) => ({
      ...prev,
      pages: prev.pages.map((p, i) =>
        i === prev.currentPageIndex
          ? { ...p, backgroundGradient: gradient }
          : p
      ),
      updatedAt: Date.now(),
    }));
  }, [commitSnapshot]);

  const setPageBackgroundPattern = useCallback((pattern: BackgroundPattern) => {
    commitSnapshot();
    setDoc((prev) => ({
      ...prev,
      pages: prev.pages.map((p, i) =>
        i === prev.currentPageIndex
          ? { ...p, backgroundPattern: pattern }
          : p
      ),
      updatedAt: Date.now(),
    }));
  }, [commitSnapshot]);

  // Element actions
  const addElement = useCallback(
    (elementData: Partial<CanvasElement> & { type: CanvasElement['type'] }): string => {
      commitSnapshot();
      const newId = `el-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      const currentDoc = docRef.current;
      const w = elementData.width || 240;
      const h = elementData.height || 200;
      const defaultX = Math.round(currentDoc.width / 2 - w / 2);
      const defaultY = Math.round(currentDoc.height / 2 - h / 2);

      const base: CanvasElement = {
        id: newId,
        name: elementData.name || `${elementData.type.toUpperCase()}`,
        x: elementData.x !== undefined ? elementData.x : defaultX,
        y: elementData.y !== undefined ? elementData.y : defaultY,
        width: w,
        height: h,
        rotation: elementData.rotation || 0,
        opacity: elementData.opacity !== undefined ? elementData.opacity : 1,
        isLocked: false,
        isHidden: false,
        ...elementData,
      } as CanvasElement;

      setDoc((prev) => {
        const pages = prev.pages.map((p, i) =>
          i === prev.currentPageIndex
            ? { ...p, elements: [...p.elements, base] }
            : p
        );
        return { ...prev, pages, updatedAt: Date.now() };
      });

      setSelectedElementId(newId);
      return newId;
    },
    [commitSnapshot]
  );

  const addShape = useCallback(
    (shapeType: ShapeType): string => {
      const isLine = shapeType === 'line' || shapeType === 'arrow';
      const initialW = isLine ? 300 : 200;
      const initialH = isLine ? 4 : 200;

      let defaultFill = '#2563EB';
      let defaultStroke = 'transparent';
      let strokeWidth = 0;

      if (isLine) {
        defaultFill = 'transparent';
        defaultStroke = '#2563EB';
        strokeWidth = 4;
      }

      const shapeElement: Partial<ShapeElement> & { type: 'shape' } = {
        type: 'shape',
        shapeType,
        name: `${shapeType.charAt(0).toUpperCase() + shapeType.slice(1)}`,
        width: initialW,
        height: initialH,
        fill: defaultFill,
        stroke: defaultStroke,
        strokeWidth,
        cornerRadius: shapeType === 'rounded-rect' ? 24 : shapeType === 'pill' ? 999 : 0,
      };

      return addElement(shapeElement);
    },
    [addElement]
  );

  const addText = useCallback(
    (preset: 'heading' | 'subheading' | 'body' = 'heading', customText?: string): string => {
      let text = customText || 'Add a heading';
      let fontSize = 48;
      let fontWeight: TextElement['fontWeight'] = '700';
      let height = 70;
      let width = 520;

      if (preset === 'subheading') {
        text = customText || 'Add a subheading';
        fontSize = 28;
        fontWeight = '600';
        height = 50;
        width = 440;
      } else if (preset === 'body') {
        text = customText || 'Add a little bit of body text for descriptions, lists, or notes.';
        fontSize = 17;
        fontWeight = 'normal';
        height = 60;
        width = 460;
      }

      const textElement: Partial<TextElement> & { type: 'text' } = {
        type: 'text',
        name: preset === 'heading' ? 'Heading' : preset === 'subheading' ? 'Subheading' : 'Body Text',
        text,
        fontSize,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fill: '#0F172A',
        fontWeight,
        fontStyle: 'normal',
        textDecoration: 'none',
        textAlign: 'center',
        width,
        height,
      };

      return addElement(textElement);
    },
    [addElement]
  );

  const addImage = useCallback(
    (src: string, width = 440, height = 330): string => {
      const imageElement: Partial<ImageElement> & { type: 'image' } = {
        type: 'image',
        name: 'Photo Layer',
        src,
        width,
        height,
        borderRadius: 16,
        brightness: 100,
        contrast: 100,
        saturation: 100,
        grayscale: 0,
        sepia: 0,
        blur: 0,
      };

      return addElement(imageElement);
    },
    [addElement]
  );

  const addIcon = useCallback(
    (icon: { id: string; name: string; viewBox: string; path: string }): string => {
      const iconElement: Partial<IconElement> & { type: 'icon' } = {
        type: 'icon',
        name: icon.name,
        iconKey: icon.id,
        svgPath: icon.path,
        svgViewBox: icon.viewBox,
        width: 120,
        height: 120,
        fill: '#2563EB',
      };

      return addElement(iconElement);
    },
    [addElement]
  );

  const addDrawingElement = useCallback(
    (points: DrawingPoint[]) => {
      if (points.length < 2) return;
      commitSnapshot();

      // Compute bounding box of points
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;

      points.forEach((p) => {
        minX = Math.min(minX, p.x);
        minY = Math.min(minY, p.y);
        maxX = Math.max(maxX, p.x);
        maxY = Math.max(maxY, p.y);
      });

      const pad = brushSize + 4;
      const x = Math.round(minX - pad);
      const y = Math.round(minY - pad);
      const width = Math.max(10, Math.round(maxX - minX + pad * 2));
      const height = Math.max(10, Math.round(maxY - minY + pad * 2));

      // Localize points relative to element (x, y)
      const localPoints = points.map((p) => ({
        x: p.x - x,
        y: p.y - y,
      }));

      const newId = `draw-${Date.now()}`;
      const drawEl: DrawingElement = {
        id: newId,
        type: 'drawing',
        name: 'Brush Stroke',
        x,
        y,
        width,
        height,
        rotation: 0,
        opacity: brushType === 'highlighter' ? 0.45 : 1,
        brushType: brushType === 'eraser' ? 'pen' : brushType,
        stroke: brushColor,
        strokeWidth: brushSize,
        points: localPoints,
      };

      setDoc((prev) => {
        const pages = prev.pages.map((p, i) =>
          i === prev.currentPageIndex
            ? { ...p, elements: [...p.elements, drawEl] }
            : p
        );
        return { ...prev, pages, updatedAt: Date.now() };
      });
      setSelectedElementId(newId);
    },
    [commitSnapshot, brushColor, brushSize, brushType]
  );

  const updateElement = useCallback(
    (id: string, updates: Partial<CanvasElement>, commit = false) => {
      if (commit) {
        commitSnapshot();
      }

      setDoc((prev) => {
        const pages = prev.pages.map((p, i) => {
          if (i !== prev.currentPageIndex) return p;
          return {
            ...p,
            elements: p.elements.map((el) => {
              if (el.id === id) {
                return { ...el, ...updates } as CanvasElement;
              }
              return el;
            }),
          };
        });
        return { ...prev, pages, updatedAt: Date.now() };
      });
    },
    [commitSnapshot]
  );

  const deleteElement = useCallback(
    (targetId?: string) => {
      const id = targetId || selectedElementId;
      if (!id) return;

      commitSnapshot();
      setDoc((prev) => {
        const pages = prev.pages.map((p, i) => {
          if (i !== prev.currentPageIndex) return p;
          return {
            ...p,
            elements: p.elements.filter((el) => el.id !== id),
          };
        });
        return { ...prev, pages, updatedAt: Date.now() };
      });

      if (selectedElementId === id) {
        setSelectedElementId(null);
      }
    },
    [commitSnapshot, selectedElementId]
  );

  const duplicateElement = useCallback(
    (targetId?: string) => {
      const id = targetId || selectedElementId;
      if (!id) return;

      const page = docRef.current.pages[docRef.current.currentPageIndex];
      const source = page?.elements.find((el) => el.id === id);
      if (!source) return;

      commitSnapshot();
      const newId = `el-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      const cloned: CanvasElement = {
        ...JSON.parse(JSON.stringify(source)),
        id: newId,
        name: `${source.name || 'Layer'} Copy`,
        x: source.x + 30,
        y: source.y + 30,
      };

      setDoc((prev) => {
        const pages = prev.pages.map((p, i) =>
          i === prev.currentPageIndex
            ? { ...p, elements: [...p.elements, cloned] }
            : p
        );
        return { ...prev, pages, updatedAt: Date.now() };
      });

      setSelectedElementId(newId);
    },
    [commitSnapshot, selectedElementId]
  );

  // Layer ordering
  const bringForward = useCallback(
    (id: string) => {
      commitSnapshot();
      setDoc((prev) => {
        const pages = prev.pages.map((p, pageIdx) => {
          if (pageIdx !== prev.currentPageIndex) return p;
          const idx = p.elements.findIndex((el) => el.id === id);
          if (idx === -1 || idx >= p.elements.length - 1) return p;
          const elements = [...p.elements];
          const temp = elements[idx];
          elements[idx] = elements[idx + 1];
          elements[idx + 1] = temp;
          return { ...p, elements };
        });
        return { ...prev, pages, updatedAt: Date.now() };
      });
    },
    [commitSnapshot]
  );

  const sendBackward = useCallback(
    (id: string) => {
      commitSnapshot();
      setDoc((prev) => {
        const pages = prev.pages.map((p, pageIdx) => {
          if (pageIdx !== prev.currentPageIndex) return p;
          const idx = p.elements.findIndex((el) => el.id === id);
          if (idx <= 0) return p;
          const elements = [...p.elements];
          const temp = elements[idx];
          elements[idx] = elements[idx - 1];
          elements[idx - 1] = temp;
          return { ...p, elements };
        });
        return { ...prev, pages, updatedAt: Date.now() };
      });
    },
    [commitSnapshot]
  );

  const bringToFront = useCallback(
    (id: string) => {
      commitSnapshot();
      setDoc((prev) => {
        const pages = prev.pages.map((p, pageIdx) => {
          if (pageIdx !== prev.currentPageIndex) return p;
          const idx = p.elements.findIndex((el) => el.id === id);
          if (idx === -1 || idx >= p.elements.length - 1) return p;
          const element = p.elements[idx];
          const elements = p.elements.filter((el) => el.id !== id);
          elements.push(element);
          return { ...p, elements };
        });
        return { ...prev, pages, updatedAt: Date.now() };
      });
    },
    [commitSnapshot]
  );

  const sendToBack = useCallback(
    (id: string) => {
      commitSnapshot();
      setDoc((prev) => {
        const pages = prev.pages.map((p, pageIdx) => {
          if (pageIdx !== prev.currentPageIndex) return p;
          const idx = p.elements.findIndex((el) => el.id === id);
          if (idx <= 0) return p;
          const element = p.elements[idx];
          const elements = p.elements.filter((el) => el.id !== id);
          elements.unshift(element);
          return { ...p, elements };
        });
        return { ...prev, pages, updatedAt: Date.now() };
      });
    },
    [commitSnapshot]
  );

  const alignElement = useCallback(
    (alignment: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => {
      if (!selectedElementId) return;
      const currentDoc = docRef.current;
      const page = currentDoc.pages[currentDoc.currentPageIndex];
      const selected = page?.elements.find((el) => el.id === selectedElementId);
      if (!selected || selected.isLocked) return;

      commitSnapshot();
      let newX = selected.x;
      let newY = selected.y;

      switch (alignment) {
        case 'left':
          newX = 0;
          break;
        case 'center':
          newX = Math.round((currentDoc.width - selected.width) / 2);
          break;
        case 'right':
          newX = currentDoc.width - selected.width;
          break;
        case 'top':
          newY = 0;
          break;
        case 'middle':
          newY = Math.round((currentDoc.height - selected.height) / 2);
          break;
        case 'bottom':
          newY = currentDoc.height - selected.height;
          break;
      }

      updateElement(selectedElementId, { x: newX, y: newY }, true);
    },
    [commitSnapshot, selectedElementId, updateElement]
  );

  const flipHorizontal = useCallback(
    (id?: string) => {
      const targetId = id || selectedElementId;
      if (!targetId) return;
      const page = docRef.current.pages[docRef.current.currentPageIndex];
      const selected = page?.elements.find((el) => el.id === targetId);
      if (!selected) return;

      const currentFlip = (selected as any).flipH || false;
      updateElement(targetId, { flipH: !currentFlip } as any, true);
    },
    [selectedElementId, updateElement]
  );

  const flipVertical = useCallback(
    (id?: string) => {
      const targetId = id || selectedElementId;
      if (!targetId) return;
      const page = docRef.current.pages[docRef.current.currentPageIndex];
      const selected = page?.elements.find((el) => el.id === targetId);
      if (!selected) return;

      const currentFlip = (selected as any).flipV || false;
      updateElement(targetId, { flipV: !currentFlip } as any, true);
    },
    [selectedElementId, updateElement]
  );

  const toggleLock = useCallback(
    (id: string) => {
      commitSnapshot();
      setDoc((prev) => {
        const pages = prev.pages.map((p, pageIdx) => {
          if (pageIdx !== prev.currentPageIndex) return p;
          return {
            ...p,
            elements: p.elements.map((el) => (el.id === id ? { ...el, isLocked: !el.isLocked } : el)),
          };
        });
        return { ...prev, pages, updatedAt: Date.now() };
      });
    },
    [commitSnapshot]
  );

  const toggleVisibility = useCallback(
    (id: string) => {
      commitSnapshot();
      setDoc((prev) => {
        const pages = prev.pages.map((p, pageIdx) => {
          if (pageIdx !== prev.currentPageIndex) return p;
          return {
            ...p,
            elements: p.elements.map((el) => (el.id === id ? { ...el, isHidden: !el.isHidden } : el)),
          };
        });
        return { ...prev, pages, updatedAt: Date.now() };
      });
    },
    [commitSnapshot]
  );

  const loadTemplate = useCallback(
    (template: Template) => {
      commitSnapshot();
      const newPage: CanvasPage = {
        ...JSON.parse(JSON.stringify(template.page)),
        id: `page-${Date.now()}`,
      };

      setDoc({
        id: `doc-${Date.now()}`,
        title: template.title,
        width: template.width,
        height: template.height,
        pages: [newPage],
        currentPageIndex: 0,
        updatedAt: Date.now(),
      });
      setSelectedElementId(null);
    },
    [commitSnapshot]
  );

  const loadDocument = useCallback(
    (newDoc: CanvasDocument) => {
      commitSnapshot();
      setDoc({
        ...newDoc,
        updatedAt: Date.now(),
      });
      setSelectedElementId(null);
    },
    [commitSnapshot]
  );

  const clearCanvas = useCallback(() => {
    commitSnapshot();
    setDoc((prev) => ({
      ...prev,
      pages: prev.pages.map((p, i) =>
        i === prev.currentPageIndex ? { ...p, elements: [] } : p
      ),
      updatedAt: Date.now(),
    }));
    setSelectedElementId(null);
  }, [commitSnapshot]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        editingTextId !== null
      ) {
        return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Undo: Ctrl+Z
      if (cmdOrCtrl && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
        return;
      }

      // Redo: Ctrl+Y or Ctrl+Shift+Z
      if ((cmdOrCtrl && e.key.toLowerCase() === 'y') || (cmdOrCtrl && e.shiftKey && e.key.toLowerCase() === 'z')) {
        e.preventDefault();
        redo();
        return;
      }

      // Duplicate: Ctrl+D
      if (cmdOrCtrl && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        if (selectedElementId) {
          duplicateElement(selectedElementId);
        }
        return;
      }

      // Delete: Backspace or Delete
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedElementId) {
          e.preventDefault();
          deleteElement(selectedElementId);
        }
        return;
      }

      // Escape: Deselect
      if (e.key === 'Escape') {
        setSelectedElementId(null);
        return;
      }

      // Arrow keys: Nudge 1px or 10px with Shift
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        if (!selectedElementId) return;
        const page = docRef.current.pages[docRef.current.currentPageIndex];
        const selected = page?.elements.find((el) => el.id === selectedElementId);
        if (!selected || selected.isLocked) return;

        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        let deltaX = 0;
        let deltaY = 0;

        if (e.key === 'ArrowUp') deltaY = -step;
        if (e.key === 'ArrowDown') deltaY = step;
        if (e.key === 'ArrowLeft') deltaX = -step;
        if (e.key === 'ArrowRight') deltaX = step;

        updateElement(selectedElementId, {
          x: selected.x + deltaX,
          y: selected.y + deltaY,
        }, true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editingTextId, selectedElementId, undo, redo, duplicateElement, deleteElement, updateElement]);

  const selectedElement =
    currentPage?.elements.find((el) => el.id === selectedElementId) || null;

  return (
    <CanvasContext.Provider
      value={{
        document: doc,
        currentPage,
        currentPageIndex: activePageIndex,
        selectedElementId,
        selectedElement,
        zoom,
        panOffset,
        activeSidebarTab,
        snapGuides,
        editingTextId,
        canUndo: past.length > 0,
        canRedo: future.length > 0,
        showRulerGrid,
        isDrawingMode,
        brushType,
        brushColor,
        brushSize,
        setZoom,
        setPanOffset,
        setActiveSidebarTab,
        setSnapGuides,
        setEditingTextId,
        selectElement,
        resetZoomAndPan,
        fitToScreen,
        toggleRulerGrid,
        setIsDrawingMode,
        setBrushType,
        setBrushColor,
        setBrushSize,
        addDrawingElement,
        undo,
        redo,
        commitSnapshot,
        setDimensions,
        setTitle,
        setCurrentPageIndex,
        addPage,
        duplicatePage,
        deletePage,
        setPageBackgroundColor,
        setPageBackgroundGradient,
        setPageBackgroundPattern,
        addElement,
        addShape,
        addText,
        addImage,
        addIcon,
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
        toggleVisibility,
        loadTemplate,
        loadDocument,
        clearCanvas,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = (): CanvasContextType => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error('useCanvas must be used within a CanvasProvider');
  }
  return context;
};
