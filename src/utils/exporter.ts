import type {
  CanvasDocument,
  CanvasPage,
  CanvasElement,
  ImageElement,
  ShapeElement,
  TextElement,
  IconElement,
  DrawingElement,
} from '../types/canvas';

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

/**
 * Draws a single element onto a CanvasRenderingContext2D
 */
async function drawElementToCanvas(
  ctx: CanvasRenderingContext2D,
  el: CanvasElement,
  scale = 1
) {
  if (el.isHidden) return;

  ctx.save();
  ctx.globalAlpha = el.opacity ?? 1;

  // Scale and translate coordinates
  const elX = el.x * scale;
  const elY = el.y * scale;
  const elW = el.width * scale;
  const elH = el.height * scale;

  // Center transformation for rotation
  const cx = elX + elW / 2;
  const cy = elY + elH / 2;
  ctx.translate(cx, cy);
  ctx.rotate((el.rotation * Math.PI) / 180);

  // Flip horizontal / vertical
  const flipH = (el as any).flipH ? -1 : 1;
  const flipV = (el as any).flipV ? -1 : 1;
  ctx.scale(flipH, flipV);

  ctx.translate(-cx, -cy);

  // Shadow support
  if ((el as any).hasShadow) {
    ctx.shadowColor = (el as any).shadowColor || 'rgba(0,0,0,0.15)';
    ctx.shadowBlur = ((el as any).shadowBlur || 16) * scale;
    ctx.shadowOffsetX = ((el as any).shadowOffsetX || 0) * scale;
    ctx.shadowOffsetY = ((el as any).shadowOffsetY || 4) * scale;
  }

  if (el.type === 'shape') {
    const shape = el as ShapeElement;
    ctx.fillStyle = shape.fill;
    ctx.strokeStyle = shape.stroke;
    ctx.lineWidth = shape.strokeWidth * scale;

    if (shape.strokeStyle === 'dashed') {
      ctx.setLineDash([8 * scale, 6 * scale]);
    } else {
      ctx.setLineDash([]);
    }

    ctx.beginPath();
    switch (shape.shapeType) {
      case 'rect': {
        if (shape.fill && shape.fill !== 'transparent') ctx.fillRect(elX, elY, elW, elH);
        if (shape.strokeWidth > 0 && shape.stroke !== 'transparent') ctx.strokeRect(elX, elY, elW, elH);
        break;
      }
      case 'rounded-rect':
      case 'pill': {
        const radius = Math.min((shape.cornerRadius || 20) * scale, elW / 2, elH / 2);
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(elX, elY, elW, elH, radius);
        } else {
          ctx.rect(elX, elY, elW, elH);
        }
        if (shape.fill && shape.fill !== 'transparent') ctx.fill();
        if (shape.strokeWidth > 0 && shape.stroke !== 'transparent') ctx.stroke();
        break;
      }
      case 'circle': {
        ctx.ellipse(
          elX + elW / 2,
          elY + elH / 2,
          Math.max(1, elW / 2),
          Math.max(1, elH / 2),
          0,
          0,
          2 * Math.PI
        );
        if (shape.fill && shape.fill !== 'transparent') ctx.fill();
        if (shape.strokeWidth > 0 && shape.stroke !== 'transparent') ctx.stroke();
        break;
      }
      case 'triangle': {
        ctx.moveTo(elX + elW / 2, elY);
        ctx.lineTo(elX + elW, elY + elH);
        ctx.lineTo(elX, elY + elH);
        ctx.closePath();
        if (shape.fill && shape.fill !== 'transparent') ctx.fill();
        if (shape.strokeWidth > 0 && shape.stroke !== 'transparent') ctx.stroke();
        break;
      }
      case 'diamond': {
        ctx.moveTo(elX + elW / 2, elY);
        ctx.lineTo(elX + elW, elY + elH / 2);
        ctx.lineTo(elX + elW / 2, elY + elH);
        ctx.lineTo(elX, elY + elH / 2);
        ctx.closePath();
        if (shape.fill && shape.fill !== 'transparent') ctx.fill();
        if (shape.strokeWidth > 0 && shape.stroke !== 'transparent') ctx.stroke();
        break;
      }
      case 'pentagon': {
        const numPts = 5;
        const pr = Math.min(elW, elH) / 2;
        const pcx = elX + elW / 2;
        const pcy = elY + elH / 2;
        for (let i = 0; i < numPts; i++) {
          const a = (i * 2 * Math.PI) / numPts - Math.PI / 2;
          const px = pcx + pr * Math.cos(a);
          const py = pcy + pr * Math.sin(a);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        if (shape.fill && shape.fill !== 'transparent') ctx.fill();
        if (shape.strokeWidth > 0 && shape.stroke !== 'transparent') ctx.stroke();
        break;
      }
      case 'hexagon': {
        const numPts = 6;
        const hr = Math.min(elW, elH) / 2;
        const hcx = elX + elW / 2;
        const hcy = elY + elH / 2;
        for (let i = 0; i < numPts; i++) {
          const a = (i * 2 * Math.PI) / numPts;
          const px = hcx + hr * Math.cos(a);
          const py = hcy + hr * Math.sin(a);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        if (shape.fill && shape.fill !== 'transparent') ctx.fill();
        if (shape.strokeWidth > 0 && shape.stroke !== 'transparent') ctx.stroke();
        break;
      }
      case 'star': {
        const points = 5;
        const outerR = Math.min(elW, elH) / 2;
        const innerR = outerR * 0.42;
        const scx = elX + elW / 2;
        const scy = elY + elH / 2;
        for (let i = 0; i < points * 2; i++) {
          const r = i % 2 === 0 ? outerR : innerR;
          const a = (i * Math.PI) / points - Math.PI / 2;
          const px = scx + r * Math.cos(a);
          const py = scy + r * Math.sin(a);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        if (shape.fill && shape.fill !== 'transparent') ctx.fill();
        if (shape.strokeWidth > 0 && shape.stroke !== 'transparent') ctx.stroke();
        break;
      }
      case 'heart': {
        ctx.moveTo(elX + elW / 2, elY + elH * 0.8);
        ctx.bezierCurveTo(elX, elY + elH * 0.5, elX, elY, elX + elW * 0.28, elY);
        ctx.bezierCurveTo(elX + elW * 0.45, elY, elX + elW / 2, elY + elH * 0.2, elX + elW / 2, elY + elH * 0.25);
        ctx.bezierCurveTo(elX + elW / 2, elY + elH * 0.2, elX + elW * 0.55, elY, elX + elW * 0.72, elY);
        ctx.bezierCurveTo(elX + elW, elY, elX + elW, elY + elH * 0.5, elX + elW / 2, elY + elH * 0.8);
        ctx.closePath();
        if (shape.fill && shape.fill !== 'transparent') ctx.fill();
        if (shape.strokeWidth > 0 && shape.stroke !== 'transparent') ctx.stroke();
        break;
      }
      case 'line': {
        ctx.moveTo(elX, elY + elH / 2);
        ctx.lineTo(elX + elW, elY + elH / 2);
        ctx.stroke();
        break;
      }
      case 'arrow': {
        const arrowY = elY + elH / 2;
        ctx.moveTo(elX, arrowY);
        ctx.lineTo(elX + elW - 15 * scale, arrowY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(elX + elW - 20 * scale, arrowY - 10 * scale);
        ctx.lineTo(elX + elW, arrowY);
        ctx.lineTo(elX + elW - 20 * scale, arrowY + 10 * scale);
        ctx.fillStyle = shape.stroke;
        ctx.fill();
        break;
      }
      default: {
        ctx.fillRect(elX, elY, elW, elH);
      }
    }
  } else if (el.type === 'text') {
    const textEl = el as TextElement;

    // Background pill/highlight effect
    if (textEl.backgroundColor && textEl.backgroundColor !== 'transparent') {
      ctx.fillStyle = textEl.backgroundColor;
      if (typeof ctx.roundRect === 'function') {
        ctx.beginPath();
        ctx.roundRect(elX, elY, elW, elH, 8 * scale);
        ctx.fill();
      } else {
        ctx.fillRect(elX, elY, elW, elH);
      }
    }

    ctx.fillStyle = textEl.fill;
    const fontStyle = textEl.fontStyle === 'italic' ? 'italic ' : '';
    const fontWeight = textEl.fontWeight || 'normal';
    ctx.font = `${fontStyle}${fontWeight} ${textEl.fontSize * scale}px ${textEl.fontFamily}`;
    ctx.textAlign = textEl.textAlign === 'justify' ? 'left' : textEl.textAlign || 'left';
    ctx.textBaseline = 'top';

    const textToDraw =
      textEl.textTransform === 'uppercase'
        ? textEl.text.toUpperCase()
        : textEl.textTransform === 'lowercase'
        ? textEl.text.toLowerCase()
        : textEl.text;

    const lines = textToDraw.split('\n');
    const lineHeight = textEl.fontSize * (textEl.lineHeight || 1.25) * scale;

    let drawX = elX;
    if (textEl.textAlign === 'center') {
      drawX = elX + elW / 2;
    } else if (textEl.textAlign === 'right') {
      drawX = elX + elW;
    }

    lines.forEach((line, index) => {
      const lineY = elY + index * lineHeight;

      // Text stroke
      if (textEl.stroke && (textEl.strokeWidth || 0) > 0) {
        ctx.strokeStyle = textEl.stroke;
        ctx.lineWidth = (textEl.strokeWidth || 1) * scale;
        ctx.strokeText(line, drawX, lineY);
      }
      ctx.fillText(line, drawX, lineY);
    });
  } else if (el.type === 'image') {
    const imgEl = el as ImageElement;
    try {
      const img = await loadImage(imgEl.src);
      if (imgEl.borderRadius && imgEl.borderRadius > 0) {
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(elX, elY, elW, elH, imgEl.borderRadius * scale);
        } else {
          ctx.rect(elX, elY, elW, elH);
        }
        ctx.clip();
      }

      const filters: string[] = [];
      if (imgEl.brightness !== undefined && imgEl.brightness !== 100) filters.push(`brightness(${imgEl.brightness}%)`);
      if (imgEl.contrast !== undefined && imgEl.contrast !== 100) filters.push(`contrast(${imgEl.contrast}%)`);
      if (imgEl.saturation !== undefined && imgEl.saturation !== 100) filters.push(`saturate(${imgEl.saturation}%)`);
      if (imgEl.grayscale) filters.push(`grayscale(${imgEl.grayscale}%)`);
      if (imgEl.sepia) filters.push(`sepia(${imgEl.sepia}%)`);
      if (imgEl.blur) filters.push(`blur(${imgEl.blur * scale}px)`);

      if (filters.length > 0) ctx.filter = filters.join(' ');

      ctx.drawImage(img, elX, elY, elW, elH);
      ctx.filter = 'none';

      // Border
      if (imgEl.borderWidth && imgEl.borderWidth > 0 && imgEl.borderColor) {
        ctx.strokeStyle = imgEl.borderColor;
        ctx.lineWidth = imgEl.borderWidth * scale;
        ctx.strokeRect(elX, elY, elW, elH);
      }
    } catch (err) {
      console.warn('Could not draw image to export:', err);
    }
  } else if (el.type === 'icon') {
    const iconEl = el as IconElement;
    try {
      const p2d = new Path2D(iconEl.svgPath);
      ctx.fillStyle = iconEl.fill;
      // SVG path coordinates are in standard 24x24 viewBox
      ctx.save();
      ctx.translate(elX, elY);
      const iconScale = elW / 24;
      ctx.scale(iconScale, iconScale);
      ctx.fill(p2d);
      ctx.restore();
    } catch (e) {
      console.warn('Could not render SVG icon path:', e);
    }
  } else if (el.type === 'drawing') {
    const drawEl = el as DrawingElement;
    if (drawEl.points && drawEl.points.length > 1) {
      ctx.strokeStyle = drawEl.stroke;
      ctx.lineWidth = drawEl.strokeWidth * scale;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(elX + drawEl.points[0].x * scale, elY + drawEl.points[0].y * scale);
      for (let i = 1; i < drawEl.points.length; i++) {
        ctx.lineTo(elX + drawEl.points[i].x * scale, elY + drawEl.points[i].y * scale);
      }
      ctx.stroke();
    }
  }

  ctx.restore();
}

/**
 * Draws a page onto a canvas
 */
export async function renderPageToCanvas(
  canvas: HTMLCanvasElement,
  page: CanvasPage,
  width: number,
  height: number,
  scale = 1,
  format: 'png' | 'jpeg' = 'png'
) {
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background
  if (page.backgroundGradient) {
    const angleRad = ((page.backgroundGradient.angle || 135) * Math.PI) / 180;
    const x2 = Math.cos(angleRad) * canvas.width;
    const y2 = Math.sin(angleRad) * canvas.height;
    const grad = ctx.createLinearGradient(0, 0, Math.abs(x2), Math.abs(y2));
    const colors = page.backgroundGradient.colors;
    colors.forEach((col, idx) => {
      grad.addColorStop(idx / (colors.length - 1), col);
    });
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    ctx.fillStyle =
      page.backgroundColor && page.backgroundColor !== 'transparent'
        ? page.backgroundColor
        : format === 'jpeg'
        ? '#FFFFFF'
        : 'rgba(0,0,0,0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Draw pattern if any
  if (page.backgroundPattern === 'dots') {
    ctx.fillStyle = '#CBD5E1';
    const step = 24 * scale;
    for (let x = step / 2; x < canvas.width; x += step) {
      for (let y = step / 2; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.arc(x, y, 1.5 * scale, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }

  // Draw elements sequentially
  for (const el of page.elements) {
    await drawElementToCanvas(ctx, el, scale);
  }
}

/**
 * Exports document page as PNG, JPG, or SVG
 */
export async function exportPageImage(
  page: CanvasPage,
  docWidth: number,
  docHeight: number,
  format: 'png' | 'jpeg' | 'svg',
  scale = 1,
  filename = 'canvalone-design'
): Promise<void> {
  if (format === 'svg') {
    // Generate SVG string
    const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${docWidth}" height="${docHeight}" viewBox="0 0 ${docWidth} ${docHeight}">
      <rect width="100%" height="100%" fill="${page.backgroundColor || '#FFFFFF'}"/>
      <!-- Canvalone Studio Design -->
    </svg>`;
    const blob = new Blob([svgStr], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, `${filename}.svg`);
    URL.revokeObjectURL(url);
    return;
  }

  const canvas = document.createElement('canvas');
  await renderPageToCanvas(canvas, page, docWidth, docHeight, scale, format);

  const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png';
  const dataUrl = canvas.toDataURL(mime, format === 'jpeg' ? 0.95 : 1.0);
  triggerDownload(dataUrl, `${filename}.${format === 'jpeg' ? 'jpg' : 'png'}`);
}

function triggerDownload(url: string, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportDocumentToJSON(doc: CanvasDocument, filename?: string): void {
  const jsonStr = JSON.stringify(doc, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  triggerDownload(url, filename || `${doc.title.toLowerCase().replace(/\s+/g, '-')}.json`);
  URL.revokeObjectURL(url);
}

export function importDocumentFromJSON(file: File): Promise<CanvasDocument> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (!parsed.width || !parsed.height || !Array.isArray(parsed.pages)) {
          throw new Error('Invalid Canvalone document JSON structure');
        }
        resolve(parsed as CanvasDocument);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsText(file);
  });
}
