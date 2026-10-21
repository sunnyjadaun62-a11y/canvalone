import type { CanvasElement, TransformHandle } from '../../types/canvas';
import { RotateCw } from 'lucide-react';

interface TransformGizmoProps {
  element: CanvasElement;
  zoom: number;
  onResizeStart: (e: React.MouseEvent, handle: TransformHandle) => void;
  onRotateStart: (e: React.MouseEvent) => void;
  isResizing: boolean;
  isRotating: boolean;
  activeHandle: TransformHandle | null;
}

export const TransformGizmo: React.FC<TransformGizmoProps> = ({
  element,
  zoom,
  onResizeStart,
  onRotateStart,
  isResizing,
  isRotating,
  activeHandle,
}) => {
  if (element.isHidden || element.isLocked) return null;

  // The gizmo is drawn matching element rotation and bounding box
  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${element.x}px`,
    top: `${element.y}px`,
    width: `${element.width}px`,
    height: `${element.height}px`,
    transform: `rotate(${element.rotation}deg)`,
    transformOrigin: 'center center',
    pointerEvents: 'none',
  };

  const getHandleClasses = (h: TransformHandle) =>
    `absolute w-3.5 h-3.5 border-2 rounded-full shadow-md pointer-events-auto cursor-pointer transition-transform hover:scale-125 z-30 ${
      activeHandle === h
        ? 'bg-blue-600 border-white scale-125'
        : 'bg-white border-blue-600'
    }`;

  return (
    <div style={style} className="z-20">
      {/* Bounding Box Outline */}
      <div className="absolute inset-0 border-2 border-blue-600 rounded-xs pointer-events-none" />

      {/* Resize Handles (8 directions) */}
      {/* North-West */}
      <div
        className={`${getHandleClasses('nw')} -top-1.5 -left-1.5 cursor-nwse-resize`}
        onMouseDown={(e) => onResizeStart(e, 'nw')}
      />
      {/* North */}
      <div
        className={`${getHandleClasses('n')} -top-1.5 left-1/2 -translate-x-1/2 cursor-ns-resize`}
        onMouseDown={(e) => onResizeStart(e, 'n')}
      />
      {/* North-East */}
      <div
        className={`${getHandleClasses('ne')} -top-1.5 -right-1.5 cursor-nesw-resize`}
        onMouseDown={(e) => onResizeStart(e, 'ne')}
      />
      {/* East */}
      <div
        className={`${getHandleClasses('e')} top-1/2 -right-1.5 -translate-y-1/2 cursor-ew-resize`}
        onMouseDown={(e) => onResizeStart(e, 'e')}
      />
      {/* South-East */}
      <div
        className={`${getHandleClasses('se')} -bottom-1.5 -right-1.5 cursor-nwse-resize`}
        onMouseDown={(e) => onResizeStart(e, 'se')}
      />
      {/* South */}
      <div
        className={`${getHandleClasses('s')} -bottom-1.5 left-1/2 -translate-x-1/2 cursor-ns-resize`}
        onMouseDown={(e) => onResizeStart(e, 's')}
      />
      {/* South-West */}
      <div
        className={`${getHandleClasses('sw')} -bottom-1.5 -left-1.5 cursor-nesw-resize`}
        onMouseDown={(e) => onResizeStart(e, 'sw')}
      />
      {/* West */}
      <div
        className={`${getHandleClasses('w')} top-1/2 -left-1.5 -translate-y-1/2 cursor-ew-resize`}
        onMouseDown={(e) => onResizeStart(e, 'w')}
      />

      {/* Rotation Stem & Handle */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto">
        <div
          className="w-5 h-5 bg-white border-2 border-blue-600 rounded-full shadow-md flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
          onMouseDown={onRotateStart}
          title="Drag to rotate (Hold Shift for 15° steps)"
        >
          <RotateCw className="w-2.5 h-2.5 text-blue-600" />
        </div>
        <div className="w-0.5 h-2 bg-blue-600" />
      </div>

      {/* Live Dimension Tooltip when Resizing */}
      {isResizing && (
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white text-slate-800 text-[11px] font-semibold px-2 py-0.5 rounded shadow-lg whitespace-nowrap pointer-events-none border border-slate-200"
          style={{ transform: `translateX(-50%) scale(${1 / Math.max(zoom, 0.4)})` }}
        >
          {Math.round(element.width)} × {Math.round(element.height)} px
        </div>
      )}

      {/* Live Rotation Tooltip when Rotating */}
      {isRotating && (
        <div
          className="absolute -top-13 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-lg whitespace-nowrap pointer-events-none"
          style={{ transform: `translateX(-50%) scale(${1 / Math.max(zoom, 0.4)})` }}
        >
          {Math.round(element.rotation)}°
        </div>
      )}
    </div>
  );
};
