export type ShapeType =
  | 'rect'
  | 'rounded-rect'
  | 'circle'
  | 'triangle'
  | 'diamond'
  | 'star'
  | 'pentagon'
  | 'hexagon'
  | 'pill'
  | 'badge'
  | 'speech-bubble'
  | 'arrow'
  | 'line'
  | 'heart';

export type ElementType = 'shape' | 'text' | 'image' | 'icon' | 'drawing';

export interface BaseCanvasElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number; // 0 - 360
  opacity: number;  // 0 - 1
  isLocked?: boolean;
  isHidden?: boolean;
  name?: string;
}

export interface ShapeElement extends BaseCanvasElement {
  type: 'shape';
  shapeType: ShapeType;
  fill: string;
  gradientFill?: {
    type: 'linear';
    colors: string[];
    angle: number;
  } | null;
  stroke: string;
  strokeWidth: number;
  strokeStyle?: 'solid' | 'dashed';
  cornerRadius?: number;
  hasShadow?: boolean;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  flipH?: boolean;
  flipV?: boolean;
}

export type TextEffect = 'none' | 'shadow' | 'stroke' | 'glow' | 'pill';

export interface TextElement extends BaseCanvasElement {
  type: 'text';
  text: string;
  fontSize: number;
  fontFamily: string;
  fill: string;
  backgroundColor?: string; // highlight background pill
  stroke?: string;
  strokeWidth?: number;
  fontWeight: 'normal' | 'bold' | '300' | '500' | '600' | '700' | '800';
  fontStyle: 'normal' | 'italic';
  textDecoration: 'none' | 'underline' | 'line-through';
  textTransform?: 'none' | 'uppercase' | 'lowercase';
  textAlign: 'left' | 'center' | 'right' | 'justify';
  letterSpacing?: number;
  lineHeight?: number;
  effect?: TextEffect;
  effectColor?: string;
}

export interface ImageElement extends BaseCanvasElement {
  type: 'image';
  src: string;
  borderRadius?: number;
  brightness?: number; // 0 - 200, default 100
  contrast?: number;   // 0 - 200, default 100
  saturation?: number; // 0 - 200, default 100
  grayscale?: number;  // 0 - 100, default 0
  sepia?: number;      // 0 - 100, default 0
  blur?: number;       // 0 - 20, default 0
  vintage?: boolean;
  hasShadow?: boolean;
  borderColor?: string;
  borderWidth?: number;
  flipH?: boolean;
  flipV?: boolean;
}

export interface IconElement extends BaseCanvasElement {
  type: 'icon';
  iconKey: string;
  svgPath: string;
  svgViewBox: string;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  flipH?: boolean;
  flipV?: boolean;
}

export interface DrawingPoint {
  x: number;
  y: number;
}

export interface DrawingElement extends BaseCanvasElement {
  type: 'drawing';
  brushType: 'pen' | 'marker' | 'highlighter';
  points: DrawingPoint[];
  stroke: string;
  strokeWidth: number;
}

export type CanvasElement = ShapeElement | TextElement | ImageElement | IconElement | DrawingElement;

export interface CanvasDimensions {
  width: number;
  height: number;
  name: string;
  category?: string;
}

export type BackgroundPattern = 'none' | 'dots' | 'grid' | 'stripes';

export interface CanvasPage {
  id: string;
  title: string;
  backgroundColor: string;
  backgroundGradient?: {
    type: 'linear' | 'radial';
    colors: string[];
    angle?: number;
  } | null;
  backgroundPattern?: BackgroundPattern;
  elements: CanvasElement[];
}

export interface CanvasDocument {
  id: string;
  title: string;
  width: number;
  height: number;
  pages: CanvasPage[];
  currentPageIndex: number;
  updatedAt: number;
}

export type TransformHandle =
  | 'nw' | 'n' | 'ne'
  | 'e'
  | 'se' | 's' | 'sw'
  | 'w'
  | 'rotate';

export interface Template {
  id: string;
  title: string;
  category: 'Social Media' | 'Marketing' | 'Business' | 'Quotes' | 'Events' | 'Presentation';
  width: number;
  height: number;
  thumbnailBg: string;
  page: CanvasPage;
}
