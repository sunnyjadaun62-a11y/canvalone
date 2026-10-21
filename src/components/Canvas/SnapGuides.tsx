import React from 'react';
import type { SnapGuide } from '../../utils/math';

interface SnapGuidesProps {
  guides: SnapGuide[];
  canvasWidth: number;
  canvasHeight: number;
}

export const SnapGuides: React.FC<SnapGuidesProps> = ({
  guides,
  canvasWidth,
  canvasHeight,
}) => {
  if (!guides || guides.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-40">
      {guides.map((guide, idx) => {
        if (guide.type === 'x') {
          return (
            <div
              key={`guide-x-${idx}`}
              className="absolute top-0 bottom-0 border-l border-dashed border-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]"
              style={{
                left: `${guide.position}px`,
                height: `${canvasHeight}px`,
              }}
            />
          );
        } else {
          return (
            <div
              key={`guide-y-${idx}`}
              className="absolute left-0 right-0 border-t border-dashed border-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]"
              style={{
                top: `${guide.position}px`,
                width: `${canvasWidth}px`,
              }}
            />
          );
        }
      })}
    </div>
  );
};
