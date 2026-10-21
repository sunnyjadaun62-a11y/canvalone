import React, { useRef, useEffect } from 'react';
import type {
  CanvasElement as ICanvasElement,
  ShapeElement,
  TextElement,
  ImageElement,
  IconElement,
  DrawingElement,
} from '../../types/canvas';
import { useCanvas } from '../../context/CanvasContext';

interface CanvasElementProps {
  element: ICanvasElement;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent, element: ICanvasElement) => void;
}

export const CanvasElement: React.FC<CanvasElementProps> = ({
  element,
  isSelected,
  onMouseDown,
}) => {
  const { editingTextId, setEditingTextId, updateElement } = useCanvas();
  const textInputRef = useRef<HTMLTextAreaElement>(null);

  const isEditing = element.type === 'text' && editingTextId === element.id;

  useEffect(() => {
    if (isEditing && textInputRef.current) {
      textInputRef.current.focus();
      textInputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (element.type === 'text') {
      e.stopPropagation();
      setEditingTextId(element.id);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateElement(element.id, { text: e.target.value });
  };

  const handleTextBlur = () => {
    setEditingTextId(null);
  };

  // Flip transforms
  const flipH = (element as any).flipH ? -1 : 1;
  const flipV = (element as any).flipV ? -1 : 1;

  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${element.x}px`,
    top: `${element.y}px`,
    width: `${element.width}px`,
    height: `${element.height}px`,
    transform: `rotate(${element.rotation}deg) scale(${flipH}, ${flipV})`,
    transformOrigin: 'center center',
    opacity: element.opacity,
    pointerEvents: element.isHidden ? 'none' : 'auto',
    cursor: element.isLocked ? 'not-allowed' : isSelected ? 'move' : 'pointer',
    display: element.isHidden ? 'none' : 'block',
  };

  const renderContent = () => {
    switch (element.type) {
      case 'shape': {
        const shape = element as ShapeElement;
        const sw = shape.strokeWidth || 0;
        const hasStroke = sw > 0 && shape.stroke && shape.stroke !== 'transparent';
        const dashArray = shape.strokeStyle === 'dashed' ? '8,6' : 'none';

        const fillStyle = shape.gradientFill
          ? `url(#grad-${shape.id})`
          : shape.fill;

        return (
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${shape.width} ${shape.height}`}
            style={{
              overflow: 'visible',
              display: 'block',
              filter: shape.hasShadow ? 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' : 'none',
            }}
          >
            {shape.gradientFill && (
              <defs>
                <linearGradient
                  id={`grad-${shape.id}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  {shape.gradientFill.colors.map((c, idx) => (
                    <stop
                      key={idx}
                      offset={`${(idx / (shape.gradientFill!.colors.length - 1)) * 100}%`}
                      stopColor={c}
                    />
                  ))}
                </linearGradient>
              </defs>
            )}

            {shape.shapeType === 'rect' && (
              <rect
                x={sw / 2}
                y={sw / 2}
                width={Math.max(0, shape.width - sw)}
                height={Math.max(0, shape.height - sw)}
                fill={fillStyle}
                stroke={hasStroke ? shape.stroke : 'none'}
                strokeWidth={sw}
                strokeDasharray={dashArray}
              />
            )}

            {(shape.shapeType === 'rounded-rect' || shape.shapeType === 'pill') && (
              <rect
                x={sw / 2}
                y={sw / 2}
                width={Math.max(0, shape.width - sw)}
                height={Math.max(0, shape.height - sw)}
                rx={shape.shapeType === 'pill' ? shape.height / 2 : shape.cornerRadius ?? 20}
                ry={shape.shapeType === 'pill' ? shape.height / 2 : shape.cornerRadius ?? 20}
                fill={fillStyle}
                stroke={hasStroke ? shape.stroke : 'none'}
                strokeWidth={sw}
                strokeDasharray={dashArray}
              />
            )}

            {shape.shapeType === 'circle' && (
              <ellipse
                cx={shape.width / 2}
                cy={shape.height / 2}
                rx={Math.max(0, shape.width / 2 - sw / 2)}
                ry={Math.max(0, shape.height / 2 - sw / 2)}
                fill={fillStyle}
                stroke={hasStroke ? shape.stroke : 'none'}
                strokeWidth={sw}
                strokeDasharray={dashArray}
              />
            )}

            {shape.shapeType === 'triangle' && (
              <polygon
                points={`${shape.width / 2},${sw} ${shape.width - sw},${shape.height - sw} ${sw},${shape.height - sw}`}
                fill={fillStyle}
                stroke={hasStroke ? shape.stroke : 'none'}
                strokeWidth={sw}
                strokeLinejoin="round"
                strokeDasharray={dashArray}
              />
            )}

            {shape.shapeType === 'diamond' && (
              <polygon
                points={`${shape.width / 2},${sw} ${shape.width - sw},${shape.height / 2} ${shape.width / 2},${shape.height - sw} ${sw},${shape.height / 2}`}
                fill={fillStyle}
                stroke={hasStroke ? shape.stroke : 'none'}
                strokeWidth={sw}
                strokeLinejoin="round"
                strokeDasharray={dashArray}
              />
            )}

            {shape.shapeType === 'pentagon' && (() => {
              const pts: string[] = [];
              const pr = Math.min(shape.width, shape.height) / 2 - sw;
              const pcx = shape.width / 2;
              const pcy = shape.height / 2;
              for (let i = 0; i < 5; i++) {
                const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
                pts.push(`${pcx + pr * Math.cos(a)},${pcy + pr * Math.sin(a)}`);
              }
              return (
                <polygon
                  points={pts.join(' ')}
                  fill={fillStyle}
                  stroke={hasStroke ? shape.stroke : 'none'}
                  strokeWidth={sw}
                  strokeLinejoin="round"
                  strokeDasharray={dashArray}
                />
              );
            })()}

            {shape.shapeType === 'hexagon' && (() => {
              const pts: string[] = [];
              const hr = Math.min(shape.width, shape.height) / 2 - sw;
              const hcx = shape.width / 2;
              const hcy = shape.height / 2;
              for (let i = 0; i < 6; i++) {
                const a = (i * 2 * Math.PI) / 6;
                pts.push(`${hcx + hr * Math.cos(a)},${hcy + hr * Math.sin(a)}`);
              }
              return (
                <polygon
                  points={pts.join(' ')}
                  fill={fillStyle}
                  stroke={hasStroke ? shape.stroke : 'none'}
                  strokeWidth={sw}
                  strokeLinejoin="round"
                  strokeDasharray={dashArray}
                />
              );
            })()}

            {shape.shapeType === 'star' && (() => {
              const points = 5;
              const outerRadius = Math.min(shape.width, shape.height) / 2 - sw;
              const innerRadius = outerRadius * 0.42;
              const cx = shape.width / 2;
              const cy = shape.height / 2;
              const pts: string[] = [];
              for (let i = 0; i < points * 2; i++) {
                const r = i % 2 === 0 ? outerRadius : innerRadius;
                const a = (i * Math.PI) / points - Math.PI / 2;
                pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
              }
              return (
                <polygon
                  points={pts.join(' ')}
                  fill={fillStyle}
                  stroke={hasStroke ? shape.stroke : 'none'}
                  strokeWidth={sw}
                  strokeLinejoin="round"
                  strokeDasharray={dashArray}
                />
              );
            })()}

            {shape.shapeType === 'badge' && (() => {
              const points = 12;
              const outerRadius = Math.min(shape.width, shape.height) / 2 - sw;
              const innerRadius = outerRadius * 0.85;
              const cx = shape.width / 2;
              const cy = shape.height / 2;
              const pts: string[] = [];
              for (let i = 0; i < points * 2; i++) {
                const r = i % 2 === 0 ? outerRadius : innerRadius;
                const a = (i * Math.PI) / points;
                pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
              }
              return (
                <polygon
                  points={pts.join(' ')}
                  fill={fillStyle}
                  stroke={hasStroke ? shape.stroke : 'none'}
                  strokeWidth={sw}
                  strokeLinejoin="round"
                  strokeDasharray={dashArray}
                />
              );
            })()}

            {shape.shapeType === 'speech-bubble' && (
              <path
                d={`M 16 0
                    H ${shape.width - 16}
                    A 16 16 0 0 1 ${shape.width} 16
                    V ${shape.height - 32}
                    A 16 16 0 0 1 ${shape.width - 16} ${shape.height - 16}
                    H 48
                    L 20 ${shape.height}
                    L 28 ${shape.height - 16}
                    H 16
                    A 16 16 0 0 1 0 ${shape.height - 32}
                    V 16
                    A 16 16 0 0 1 16 0 Z`}
                fill={fillStyle}
                stroke={hasStroke ? shape.stroke : 'none'}
                strokeWidth={sw}
                strokeDasharray={dashArray}
              />
            )}

            {shape.shapeType === 'heart' && (
              <path
                d={`M ${shape.width / 2} ${shape.height * 0.8}
                    C ${shape.width * 0.05} ${shape.height * 0.5}, ${shape.width * 0.05} ${shape.height * 0.05}, ${shape.width * 0.3} ${shape.height * 0.05}
                    C ${shape.width * 0.45} ${shape.height * 0.05}, ${shape.width / 2} ${shape.height * 0.25}, ${shape.width / 2} ${shape.height * 0.25}
                    C ${shape.width / 2} ${shape.height * 0.25}, ${shape.width * 0.55} ${shape.height * 0.05}, ${shape.width * 0.7} ${shape.height * 0.05}
                    C ${shape.width * 0.95} ${shape.height * 0.05}, ${shape.width * 0.95} ${shape.height * 0.5}, ${shape.width / 2} ${shape.height * 0.8} Z`}
                fill={fillStyle}
                stroke={hasStroke ? shape.stroke : 'none'}
                strokeWidth={sw}
                strokeLinejoin="round"
                strokeDasharray={dashArray}
              />
            )}

            {shape.shapeType === 'line' && (
              <line
                x1={0}
                y1={shape.height / 2}
                x2={shape.width}
                y2={shape.height / 2}
                stroke={shape.stroke || shape.fill || '#2563EB'}
                strokeWidth={Math.max(sw, 2)}
                strokeLinecap="round"
                strokeDasharray={dashArray}
              />
            )}

            {shape.shapeType === 'arrow' && (
              <g>
                <line
                  x1={0}
                  y1={shape.height / 2}
                  x2={shape.width - 15}
                  y2={shape.height / 2}
                  stroke={shape.stroke || shape.fill || '#2563EB'}
                  strokeWidth={Math.max(sw, 3)}
                  strokeLinecap="round"
                  strokeDasharray={dashArray}
                />
                <polygon
                  points={`${shape.width},${shape.height / 2} ${shape.width - 20},${shape.height / 2 - 10} ${shape.width - 20},${shape.height / 2 + 10}`}
                  fill={shape.stroke || shape.fill || '#2563EB'}
                />
              </g>
            )}
          </svg>
        );
      }

      case 'text': {
        const textEl = element as TextElement;

        const textTransform = textEl.textTransform || 'none';
        const displayContent =
          textTransform === 'uppercase'
            ? textEl.text.toUpperCase()
            : textTransform === 'lowercase'
            ? textEl.text.toLowerCase()
            : textEl.text;

        // Shadow / Glow / Stroke effects
        let textShadow = 'none';
        if (textEl.effect === 'shadow') {
          textShadow = '2px 4px 8px rgba(0,0,0,0.3)';
        } else if (textEl.effect === 'glow') {
          textShadow = `0 0 12px ${textEl.fill}`;
        } else if (textEl.effect === 'stroke' || (textEl.stroke && (textEl.strokeWidth || 0) > 0)) {
          const sc = textEl.stroke || '#000000';
          textShadow = `-1px -1px 0 ${sc}, 1px -1px 0 ${sc}, -1px 1px 0 ${sc}, 1px 1px 0 ${sc}`;
        }

        if (isEditing) {
          return (
            <textarea
              ref={textInputRef}
              value={textEl.text}
              onChange={handleTextChange}
              onBlur={handleTextBlur}
              style={{
                width: '100%',
                height: '100%',
                fontSize: `${textEl.fontSize}px`,
                fontFamily: textEl.fontFamily,
                color: textEl.fill,
                fontWeight: textEl.fontWeight,
                fontStyle: textEl.fontStyle,
                textDecoration: textEl.textDecoration,
                textTransform,
                textAlign: textEl.textAlign,
                letterSpacing: textEl.letterSpacing ? `${textEl.letterSpacing}px` : 'normal',
                lineHeight: textEl.lineHeight || 1.25,
                background: textEl.backgroundColor || 'rgba(37, 99, 235, 0.08)',
                border: '1.5px dashed #2563EB',
                borderRadius: textEl.backgroundColor ? '8px' : '4px',
                outline: 'none',
                resize: 'none',
                padding: '4px',
                margin: '0',
                overflow: 'hidden',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') handleTextBlur();
              }}
            />
          );
        }

        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              fontSize: `${textEl.fontSize}px`,
              fontFamily: textEl.fontFamily,
              color: textEl.fill,
              fontWeight: textEl.fontWeight,
              fontStyle: textEl.fontStyle,
              textDecoration: textEl.textDecoration,
              textTransform,
              textAlign: textEl.textAlign,
              letterSpacing: textEl.letterSpacing ? `${textEl.letterSpacing}px` : 'normal',
              lineHeight: textEl.lineHeight || 1.25,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              userSelect: 'none',
              backgroundColor: textEl.backgroundColor || 'transparent',
              borderRadius: textEl.backgroundColor ? '10px' : '0',
              padding: textEl.backgroundColor ? '4px 10px' : '0',
              textShadow,
            }}
          >
            {displayContent}
          </div>
        );
      }

      case 'image': {
        const imgEl = element as ImageElement;
        const filterStr = [
          imgEl.brightness !== undefined && imgEl.brightness !== 100 ? `brightness(${imgEl.brightness}%)` : '',
          imgEl.contrast !== undefined && imgEl.contrast !== 100 ? `contrast(${imgEl.contrast}%)` : '',
          imgEl.saturation !== undefined && imgEl.saturation !== 100 ? `saturate(${imgEl.saturation}%)` : '',
          imgEl.grayscale ? `grayscale(${imgEl.grayscale}%)` : '',
          imgEl.sepia ? `sepia(${imgEl.sepia}%)` : '',
          imgEl.blur ? `blur(${imgEl.blur}px)` : '',
        ].filter(Boolean).join(' ');

        return (
          <img
            src={imgEl.src}
            alt={imgEl.name || 'Canvas Image'}
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: `${imgEl.borderRadius ?? 0}px`,
              filter: filterStr || 'none',
              border:
                imgEl.borderWidth && imgEl.borderWidth > 0
                  ? `${imgEl.borderWidth}px solid ${imgEl.borderColor || '#E2E8F0'}`
                  : 'none',
              boxShadow: imgEl.hasShadow ? '0 12px 24px -4px rgba(0,0,0,0.15)' : 'none',
              display: 'block',
              pointerEvents: 'none',
            }}
          />
        );
      }

      case 'icon': {
        const iconEl = element as IconElement;
        return (
          <svg
            width="100%"
            height="100%"
            viewBox={iconEl.svgViewBox || '0 0 24 24'}
            fill={iconEl.fill || '#2563EB'}
            style={{ display: 'block' }}
          >
            <path d={iconEl.svgPath} />
          </svg>
        );
      }

      case 'drawing': {
        const drawEl = element as DrawingElement;
        if (!drawEl.points || drawEl.points.length < 2) return null;

        const pathData = drawEl.points.reduce((acc, pt, i) => {
          return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
        }, '');

        return (
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${drawEl.width} ${drawEl.height}`}
            style={{ overflow: 'visible', display: 'block' }}
          >
            <path
              d={pathData}
              fill="none"
              stroke={drawEl.stroke}
              strokeWidth={drawEl.strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div
      style={style}
      onMouseDown={(e) => onMouseDown(e, element)}
      onDoubleClick={handleDoubleClick}
      className={`group select-none transition-shadow ${
        isSelected ? 'ring-2 ring-blue-600/80 shadow-md' : 'hover:ring-1 hover:ring-blue-400/50'
      }`}
    >
      {renderContent()}
    </div>
  );
};
