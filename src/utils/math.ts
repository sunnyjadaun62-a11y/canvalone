export interface Point {
  x: number;
  y: number;
}

export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function radToDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

/**
 * Rotates a point (x, y) around origin (cx, cy) by angle in degrees.
 */
export function rotatePoint(x: number, y: number, cx: number, cy: number, angleDeg: number): Point {
  const rad = degToRad(angleDeg);
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const nx = cos * (x - cx) - sin * (y - cy) + cx;
  const ny = sin * (x - cx) + cos * (y - cy) + cy;
  return { x: nx, y: ny };
}

/**
 * Inverse rotation: takes rotated coordinates and returns unrotated local coordinate.
 */
export function unrotatePoint(x: number, y: number, cx: number, cy: number, angleDeg: number): Point {
  return rotatePoint(x, y, cx, cy, -angleDeg);
}

/**
 * Calculates angle in degrees from center (cx, cy) to target point (px, py).
 * Normalized to 0 - 360 degrees.
 */
export function getAngle(cx: number, cy: number, px: number, py: number): number {
  const deltaX = px - cx;
  const deltaY = py - cy;
  let angle = radToDeg(Math.atan2(deltaY, deltaX));
  // Convert standard cartesian atan2 to canvas top-relative or standard 0-360
  angle = (angle + 360) % 360;
  return angle;
}

/**
 * Snaps angle to nearest step (e.g. 15 or 45 degrees) if within threshold.
 */
export function snapAngle(angle: number, step = 15, threshold = 4): number {
  const remainder = angle % step;
  if (remainder < threshold) {
    return angle - remainder;
  }
  if (remainder > step - threshold) {
    return angle + (step - remainder);
  }
  return angle;
}

export interface SnapGuide {
  type: 'x' | 'y';
  position: number;
}

/**
 * Checks for alignment with canvas center and boundaries.
 */
export function calculateSnapGuides(
  x: number,
  y: number,
  width: number,
  height: number,
  canvasWidth: number,
  canvasHeight: number,
  threshold = 6
): { snappedX: number; snappedY: number; guides: SnapGuide[] } {
  let snappedX = x;
  let snappedY = y;
  const guides: SnapGuide[] = [];

  const elemCenterX = x + width / 2;
  const elemCenterY = y + height / 2;
  const canvasCenterX = canvasWidth / 2;
  const canvasCenterY = canvasHeight / 2;

  // Horizontal snapping (X-axis)
  if (Math.abs(elemCenterX - canvasCenterX) <= threshold) {
    snappedX = canvasCenterX - width / 2;
    guides.push({ type: 'x', position: canvasCenterX });
  } else if (Math.abs(x) <= threshold) {
    snappedX = 0;
    guides.push({ type: 'x', position: 0 });
  } else if (Math.abs(x + width - canvasWidth) <= threshold) {
    snappedX = canvasWidth - width;
    guides.push({ type: 'x', position: canvasWidth });
  }

  // Vertical snapping (Y-axis)
  if (Math.abs(elemCenterY - canvasCenterY) <= threshold) {
    snappedY = canvasCenterY - height / 2;
    guides.push({ type: 'y', position: canvasCenterY });
  } else if (Math.abs(y) <= threshold) {
    snappedY = 0;
    guides.push({ type: 'y', position: 0 });
  } else if (Math.abs(y + height - canvasHeight) <= threshold) {
    snappedY = canvasHeight - height;
    guides.push({ type: 'y', position: canvasHeight });
  }

  return { snappedX, snappedY, guides };
}
