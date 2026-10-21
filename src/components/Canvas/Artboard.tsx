import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import type { CanvasElement as ICanvasElement, TransformHandle, DrawingPoint } from '../../types/canvas';
import { CanvasElement } from './CanvasElement';
import { TransformGizmo } from './TransformGizmo';
import { SnapGuides } from './SnapGuides';
import { calculateSnapGuides, snapAngle, degToRad } from '../../utils/math';

export const Artboard: React.FC = () => {
  const {
    document: doc,
    currentPage,
    selectedElementId,
    selectedElement,
    zoom,
    panOffset,
    snapGuides,
    showRulerGrid,
    isDrawingMode,
    brushType,
    brushColor,
    brushSize,
    setZoom,
    setPanOffset,
    setSnapGuides,
    selectElement,
    updateElement,
    addImage,
    addDrawingElement,
    commitSnapshot,
    fitToScreen,
  } = useCanvas();

  const containerRef = useRef<HTMLDivElement>(null);
  const artboardRef = useRef<HTMLDivElement>(null);

  // Interaction states
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Freehand drawing in-progress points
  const [activeDrawPoints, setActiveDrawPoints] = useState<DrawingPoint[]>([]);
  const [isDrawingStroke, setIsDrawingStroke] = useState(false);

  // Dragging element
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({
    startX: 0,
    startY: 0,
    elemX: 0,
    elemY: 0,
  });

  // Resizing element
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<TransformHandle | null>(null);
  const [resizeStart, setResizeStart] = useState({
    startX: 0,
    startY: 0,
    elemX: 0,
    elemY: 0,
    elemW: 0,
    elemH: 0,
    elemRot: 0,
  });

  // Rotating element
  const [isRotating, setIsRotating] = useState(false);
  const [rotateCenter, setRotateCenter] = useState({ cx: 0, cy: 0 });

  // Spacebar pan listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && !target.isContentEditable) {
          setIsSpacePressed(true);
        }
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false);
        setIsPanning(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Initial fit to screen on mount
  useEffect(() => {
    if (containerRef.current) {
      fitToScreen(containerRef.current.clientWidth, containerRef.current.clientHeight);
    }
  }, []);

  // Mouse Down on Canvas Background
  const handleContainerMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || isSpacePressed) {
      e.preventDefault();
      setIsPanning(true);
      setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
      return;
    }

    // Freehand drawing start
    if (isDrawingMode && artboardRef.current) {
      const rect = artboardRef.current.getBoundingClientRect();
      const clickX = (e.clientX - rect.left) / zoom;
      const clickY = (e.clientY - rect.top) / zoom;

      if (clickX >= 0 && clickX <= doc.width && clickY >= 0 && clickY <= doc.height) {
        setIsDrawingStroke(true);
        setActiveDrawPoints([{ x: Math.round(clickX), y: Math.round(clickY) }]);
        return;
      }
    }

    // Left click on background = Deselect
    if (e.target === containerRef.current || (artboardRef.current && e.target === artboardRef.current)) {
      selectElement(null);
    }
  };

  // Mouse Down on Element
  const handleElementMouseDown = (e: React.MouseEvent, element: ICanvasElement) => {
    if (isSpacePressed || isDrawingMode || element.isLocked || element.isHidden) return;
    e.stopPropagation();

    selectElement(element.id);

    setIsDragging(true);
    setDragStart({
      startX: e.clientX,
      startY: e.clientY,
      elemX: element.x,
      elemY: element.y,
    });
  };

  // Resize Start
  const handleResizeStart = (e: React.MouseEvent, handle: TransformHandle) => {
    e.stopPropagation();
    if (!selectedElement) return;

    setIsResizing(true);
    setResizeHandle(handle);
    setResizeStart({
      startX: e.clientX,
      startY: e.clientY,
      elemX: selectedElement.x,
      elemY: selectedElement.y,
      elemW: selectedElement.width,
      elemH: selectedElement.height,
      elemRot: selectedElement.rotation,
    });
  };

  // Rotate Start
  const handleRotateStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedElement || !artboardRef.current) return;

    const rect = artboardRef.current.getBoundingClientRect();
    const elemCenterArtboardX = selectedElement.x + selectedElement.width / 2;
    const elemCenterArtboardY = selectedElement.y + selectedElement.height / 2;

    const cx = rect.left + elemCenterArtboardX * zoom;
    const cy = rect.top + elemCenterArtboardY * zoom;

    setIsRotating(true);
    setRotateCenter({ cx, cy });
  };

  // Mouse Move
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      // 1. Panning canvas
      if (isPanning) {
        setPanOffset({
          x: e.clientX - panStart.x,
          y: e.clientY - panStart.y,
        });
        return;
      }

      // 2. Freehand brush drawing in progress
      if (isDrawingStroke && artboardRef.current) {
        const rect = artboardRef.current.getBoundingClientRect();
        const ptX = (e.clientX - rect.left) / zoom;
        const ptY = (e.clientY - rect.top) / zoom;
        setActiveDrawPoints((prev) => [...prev, { x: Math.round(ptX), y: Math.round(ptY) }]);
        return;
      }

      // 3. Dragging element
      if (isDragging && selectedElement) {
        const dx = (e.clientX - dragStart.startX) / zoom;
        const dy = (e.clientY - dragStart.startY) / zoom;

        let newX = Math.round(dragStart.elemX + dx);
        let newY = Math.round(dragStart.elemY + dy);

        // Snap guides
        const snap = calculateSnapGuides(newX, newY, selectedElement.width, selectedElement.height, doc.width, doc.height);
        newX = snap.snappedX;
        newY = snap.snappedY;
        setSnapGuides(snap.guides);

        updateElement(selectedElement.id, { x: newX, y: newY }, false);
        return;
      }

      // 4. Resizing element
      if (isResizing && selectedElement && resizeHandle) {
        const dx = (e.clientX - resizeStart.startX) / zoom;
        const dy = (e.clientY - resizeStart.startY) / zoom;

        const rad = degToRad(-resizeStart.elemRot);
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const localDx = dx * cos - dy * sin;
        const localDy = dx * sin + dy * cos;

        let newW = resizeStart.elemW;
        let newH = resizeStart.elemH;
        let deltaCenterLocalX = 0;
        let deltaCenterLocalY = 0;

        switch (resizeHandle) {
          case 'e':
            newW = Math.max(15, resizeStart.elemW + localDx);
            deltaCenterLocalX = (newW - resizeStart.elemW) / 2;
            break;
          case 'w':
            newW = Math.max(15, resizeStart.elemW - localDx);
            deltaCenterLocalX = -(newW - resizeStart.elemW) / 2;
            break;
          case 's':
            newH = Math.max(15, resizeStart.elemH + localDy);
            deltaCenterLocalY = (newH - resizeStart.elemH) / 2;
            break;
          case 'n':
            newH = Math.max(15, resizeStart.elemH - localDy);
            deltaCenterLocalY = -(newH - resizeStart.elemH) / 2;
            break;
          case 'se':
            newW = Math.max(15, resizeStart.elemW + localDx);
            newH = Math.max(15, resizeStart.elemH + localDy);
            deltaCenterLocalX = (newW - resizeStart.elemW) / 2;
            deltaCenterLocalY = (newH - resizeStart.elemH) / 2;
            break;
          case 'sw':
            newW = Math.max(15, resizeStart.elemW - localDx);
            newH = Math.max(15, resizeStart.elemH + localDy);
            deltaCenterLocalX = -(newW - resizeStart.elemW) / 2;
            deltaCenterLocalY = (newH - resizeStart.elemH) / 2;
            break;
          case 'ne':
            newW = Math.max(15, resizeStart.elemW + localDx);
            newH = Math.max(15, resizeStart.elemH - localDy);
            deltaCenterLocalX = (newW - resizeStart.elemW) / 2;
            deltaCenterLocalY = -(newH - resizeStart.elemH) / 2;
            break;
          case 'nw':
            newW = Math.max(15, resizeStart.elemW - localDx);
            newH = Math.max(15, resizeStart.elemH - localDy);
            deltaCenterLocalX = -(newW - resizeStart.elemW) / 2;
            deltaCenterLocalY = -(newH - resizeStart.elemH) / 2;
            break;
        }

        if (e.shiftKey || selectedElement.type === 'image' || selectedElement.type === 'icon') {
          const ratio = resizeStart.elemW / resizeStart.elemH;
          if (['se', 'nw', 'ne', 'sw'].includes(resizeHandle)) {
            newH = newW / ratio;
          }
        }

        const invRad = degToRad(resizeStart.elemRot);
        const invCos = Math.cos(invRad);
        const invSin = Math.sin(invRad);
        const deltaGlobalCenterX = deltaCenterLocalX * invCos - deltaCenterLocalY * invSin;
        const deltaGlobalCenterY = deltaCenterLocalX * invSin + deltaCenterLocalY * invCos;

        const origCenterX = resizeStart.elemX + resizeStart.elemW / 2;
        const origCenterY = resizeStart.elemY + resizeStart.elemH / 2;

        const newCenterX = origCenterX + deltaGlobalCenterX;
        const newCenterY = origCenterY + deltaGlobalCenterY;

        const newX = newCenterX - newW / 2;
        const newY = newCenterY - newH / 2;

        updateElement(
          selectedElement.id,
          {
            width: Math.round(newW),
            height: Math.round(newH),
            x: Math.round(newX),
            y: Math.round(newY),
          },
          false
        );
        return;
      }

      // 5. Rotating element
      if (isRotating && selectedElement) {
        const deltaX = e.clientX - rotateCenter.cx;
        const deltaY = e.clientY - rotateCenter.cy;
        let deg = (Math.atan2(deltaY, deltaX) * 180) / Math.PI + 90;
        deg = (deg + 360) % 360;

        if (e.shiftKey) {
          deg = snapAngle(deg, 15);
        }

        updateElement(selectedElement.id, { rotation: Math.round(deg) }, false);
      }
    },
    [
      isPanning,
      panStart,
      isDrawingStroke,
      isDragging,
      selectedElement,
      dragStart,
      zoom,
      doc.width,
      doc.height,
      isResizing,
      resizeHandle,
      resizeStart,
      isRotating,
      rotateCenter,
      setPanOffset,
      setSnapGuides,
      updateElement,
    ]
  );

  // Mouse Up
  const handleMouseUp = () => {
    if (isPanning) {
      setIsPanning(false);
    }
    if (isDrawingStroke) {
      setIsDrawingStroke(false);
      if (activeDrawPoints.length > 1) {
        addDrawingElement(activeDrawPoints);
      }
      setActiveDrawPoints([]);
    }
    if (isDragging) {
      setIsDragging(false);
      setSnapGuides([]);
      commitSnapshot();
    }
    if (isResizing) {
      setIsResizing(false);
      setResizeHandle(null);
      commitSnapshot();
    }
    if (isRotating) {
      setIsRotating(false);
      commitSnapshot();
    }
  };

  // Wheel Zoom & Pan
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
      setZoom((prev) => prev * zoomFactor);
    } else {
      setPanOffset((prev) => ({
        x: prev.x - e.deltaX * 0.8,
        y: prev.y - e.deltaY * 0.8,
      }));
    }
  };

  // Drop files onto artboard
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          if (loadEvent.target?.result) {
            addImage(loadEvent.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Background style computation
  const backgroundStyle: React.CSSProperties = {
    backgroundColor: currentPage.backgroundColor || '#FFFFFF',
    backgroundImage: currentPage.backgroundGradient
      ? `linear-gradient(${currentPage.backgroundGradient.angle || 135}deg, ${currentPage.backgroundGradient.colors.join(', ')})`
      : 'none',
  };

  // Pattern overlay style
  const renderPatternOverlay = () => {
    if (!currentPage.backgroundPattern || currentPage.backgroundPattern === 'none') return null;

    if (currentPage.backgroundPattern === 'dots') {
      return (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#CBD5E1 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
          }}
        />
      );
    }

    if (currentPage.backgroundPattern === 'grid') {
      return (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(203, 213, 225, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(203, 213, 225, 0.5) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      );
    }

    if (currentPage.backgroundPattern === 'stripes') {
      return (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(241, 245, 249, 0.7), rgba(241, 245, 249, 0.7) 10px, transparent 10px, transparent 20px)',
          }}
        />
      );
    }

    return null;
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleContainerMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`relative flex-1 w-full h-full overflow-hidden canvas-workspace-bg select-none ${
        isSpacePressed || isPanning
          ? 'cursor-grab active:cursor-grabbing'
          : isDrawingMode
          ? 'cursor-crosshair'
          : 'cursor-default'
      }`}
    >
      {/* Viewport Transform Layer */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
        }}
      >
        {/* The Artboard */}
        <div
          ref={artboardRef}
          style={{
            width: `${doc.width}px`,
            height: `${doc.height}px`,
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
            ...backgroundStyle,
          }}
          className="relative bg-white shadow-2xl shadow-slate-400/35 border border-slate-200/80 transition-shadow duration-300"
        >
          {/* Pattern Overlay */}
          {renderPatternOverlay()}

          {/* Optional Ruler Grid Overlay */}
          {showRulerGrid && (
            <div
              className="absolute inset-0 pointer-events-none z-30"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(59, 130, 246, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.15) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
              }}
            />
          )}

          {/* Snap Guidelines */}
          <SnapGuides guides={snapGuides} canvasWidth={doc.width} canvasHeight={doc.height} />

          {/* Canvas Elements of Current Page */}
          {currentPage.elements.map((el) => (
            <CanvasElement
              key={el.id}
              element={el}
              isSelected={selectedElementId === el.id}
              onMouseDown={handleElementMouseDown}
            />
          ))}

          {/* Active In-Progress Freehand Drawing Stroke */}
          {isDrawingStroke && activeDrawPoints.length > 1 && (
            <svg
              className="absolute inset-0 pointer-events-none z-30"
              width={doc.width}
              height={doc.height}
            >
              <path
                d={activeDrawPoints.reduce((acc, pt, i) => {
                  return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
                }, '')}
                fill="none"
                stroke={brushColor}
                strokeWidth={brushSize}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={brushType === 'highlighter' ? 0.45 : 1}
              />
            </svg>
          )}

          {/* Active Element Transform Gizmo */}
          {selectedElement && !isDrawingMode && (
            <TransformGizmo
              element={selectedElement}
              zoom={zoom}
              onResizeStart={handleResizeStart}
              onRotateStart={handleRotateStart}
              isResizing={isResizing}
              isRotating={isRotating}
              activeHandle={resizeHandle}
            />
          )}
        </div>
      </div>
    </div>
  );
};
