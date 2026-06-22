import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  GlobalWorkerOptions,
  Util,
  getDocument,
} from 'pdfjs-dist/build/pdf';
import { findResumeHotspot, ResumeHotspot } from '../content/resumeHotspots';

GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL || ''}/pdf.worker.min.js`;

interface ResumePdfViewerProps {
  url: string;
  onError?: () => void;
  onHotspotClick?: (hotspot: ResumeHotspot) => void;
}

interface PdfTextItem {
  str: string;
  transform: number[];
  width: number;
}

interface LineGroup {
  text: string;
  items: PdfTextItem[];
}

const useStyles = makeStyles({
  viewer: {
    width: '100%',
  },
  pageWrap: {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    marginBottom: 8,
  },
  pageCanvas: {
    display: 'block',
    width: '100%',
    height: 'auto',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.25)',
  },
  textLayer: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    lineHeight: 1,
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    minHeight: 320,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  hint: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.875rem',
    marginBottom: 12,
    textAlign: 'center',
  },
});

function isPdfBuffer(buffer: ArrayBuffer): boolean {
  const bytes = new Uint8Array(buffer.slice(0, 4));
  return (
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46
  );
}

function groupTextIntoLines(items: PdfTextItem[]): LineGroup[] {
  const lines: LineGroup[] = [];

  items.forEach((item) => {
    const y = item.transform[5];
    const lastLine = lines[lines.length - 1];
    const lastY = lastLine?.items[0]?.transform[5];

    if (lastLine && lastY !== undefined && Math.abs(y - lastY) < 2) {
      lastLine.items.push(item);
      lastLine.text += item.str;
    } else {
      lines.push({ text: item.str, items: [item] });
    }
  });

  return lines;
}

function isJobHeadingLine(text: string): boolean {
  return /\|\s*(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?|\d{4})/i.test(
    text
  );
}

function isHotspotBoundaryLine(text: string): boolean {
  const normalized = text.trim().toLowerCase();
  if (normalized.includes('internal innovation initiative')) {
    return true;
  }
  if (normalized.startsWith('atos client:')) {
    return true;
  }
  return isSectionHeadingLine(text) || isJobHeadingLine(text);
}

const RESUME_SECTION_HEADINGS = new Set([
  'professional summary',
  'certifications',
  'technical skills',
  'professional experience',
  'projects',
  'previous experience',
  'education',
]);

function isSectionHeadingLine(text: string): boolean {
  return RESUME_SECTION_HEADINGS.has(text.trim().toLowerCase());
}

function getExpandedLineIndices(
  lines: LineGroup[],
  startIndex: number,
  hotspot: ResumeHotspot
): number[] {
  const indices = [startIndex];
  if (!hotspot.expandThroughBullets) {
    return indices;
  }

  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const lineText = lines[index].text.trim();
    if (!lineText) {
      continue;
    }

    if (isHotspotBoundaryLine(lines[index].text)) {
      break;
    }

    const otherHotspot = findResumeHotspot(lines[index].text);
    if (
      !hotspot.expandIgnoreNestedHotspots &&
      otherHotspot &&
      otherHotspot.id !== hotspot.id
    ) {
      break;
    }

    indices.push(index);
  }

  return indices;
}

function getLineBounds(
  items: PdfTextItem[],
  viewport: { width: number; height: number; transform: number[]; scale: number }
) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  items.forEach((item) => {
    const tx = Util.transform(viewport.transform, item.transform);
    const fontSize = Math.hypot(tx[2], tx[3]);
    const x = tx[4];
    const y = tx[5] - fontSize;
    const width = item.width * viewport.scale;
    const height = fontSize * 1.2;

    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x + width);
    maxY = Math.max(maxY, y + height);
  });

  const left = minX;
  const top = minY;
  const width = Math.max(maxX - minX, 12);
  const height = Math.max(maxY - minY, 12);

  return {
    left: `${(left / viewport.width) * 100}%`,
    top: `${(top / viewport.height) * 100}%`,
    width: `${(width / viewport.width) * 100}%`,
    height: `${(height / viewport.height) * 100}%`,
  };
}

export default function ResumePdfViewer({
  url,
  onError,
  onHotspotClick,
}: ResumePdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onErrorRef = useRef(onError);
  const onHotspotClickRef = useRef(onHotspotClick);
  const pdfDataRef = useRef<ArrayBuffer | null>(null);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  onErrorRef.current = onError;
  onHotspotClickRef.current = onHotspotClick;

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;

    async function renderPdf() {
      if (!container) return;

      setLoading(true);
      container.innerHTML = '';

      try {
        if (!pdfDataRef.current) {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          const data = await response.arrayBuffer();
          if (!isPdfBuffer(data)) {
            throw new Error('Not a PDF file');
          }

          pdfDataRef.current = data;
        }

        const pdf = await getDocument({ data: pdfDataRef.current }).promise;

        let containerWidth = container.clientWidth;
        if (containerWidth === 0) {
          await new Promise<void>((resolve) => {
            requestAnimationFrame(() => resolve());
          });
          containerWidth = container.clientWidth || 860;
        }

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          if (cancelled) return;

          const page = await pdf.getPage(pageNumber);
          const baseViewport = page.getViewport({ scale: 1 });
          const scale = containerWidth / baseViewport.width;
          const viewport = page.getViewport({ scale });

          const pageWrap = document.createElement('div');
          pageWrap.className = classes.pageWrap;
          pageWrap.style.aspectRatio = `${viewport.width} / ${viewport.height}`;

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          if (!context) {
            throw new Error('Canvas not supported');
          }

          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.className = classes.pageCanvas;

          await page.render({ canvasContext: context, viewport }).promise;

          const textLayer = document.createElement('div');
          textLayer.className = classes.textLayer;

          const textContent = await page.getTextContent();
          const textItems = textContent.items.filter(
            (item): item is PdfTextItem =>
              typeof (item as PdfTextItem).str === 'string' &&
              Array.isArray((item as PdfTextItem).transform)
          );

          const lines = groupTextIntoLines(textItems);
          const usedHotspotIds = new Set<string>();
          const usedLineIndices = new Set<number>();

          lines.forEach((line, lineIndex) => {
            if (usedLineIndices.has(lineIndex)) return;

            const hotspot = findResumeHotspot(line.text);
            if (!hotspot || usedHotspotIds.has(hotspot.id)) return;

            usedHotspotIds.add(hotspot.id);
            const expandedIndices = getExpandedLineIndices(lines, lineIndex, hotspot);
            expandedIndices.forEach((index) => usedLineIndices.add(index));

            const mergedItems = expandedIndices.flatMap((index) => lines[index].items);
            const bounds = getLineBounds(mergedItems, viewport);
            const hitArea = document.createElement('button');
            hitArea.type = 'button';
            hitArea.className = 'resume-hotspot';
            hitArea.setAttribute('aria-label', `More about ${hotspot.title}`);
            hitArea.style.left = bounds.left;
            hitArea.style.top = bounds.top;
            hitArea.style.width = bounds.width;
            hitArea.style.height = bounds.height;
            hitArea.onclick = (event) => {
              event.preventDefault();
              event.stopPropagation();
              onHotspotClickRef.current?.(hotspot);
            };
            textLayer.appendChild(hitArea);
          });

          pageWrap.appendChild(canvas);
          pageWrap.appendChild(textLayer);

          if (!cancelled) {
            container.appendChild(pageWrap);
          }
        }

        if (!cancelled) {
          setLoading(false);
        }
      } catch (err) {
        console.error('Resume PDF load failed:', err);
        if (!cancelled) {
          setLoading(false);
          onErrorRef.current?.();
        }
      }
    }

    renderPdf();

    return () => {
      cancelled = true;
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [url, classes.pageCanvas, classes.pageWrap, classes.textLayer]);

  useEffect(() => {
    pdfDataRef.current = null;
  }, [url]);

  return (
    <>
      <Typography className={classes.hint}>
        Click any section on the resume to open details in the side panel.
      </Typography>

      {loading && (
        <div className={classes.loading}>
          <CircularProgress size={28} style={{ color: '#7ec8ff' }} />
          <Typography>Loading resume…</Typography>
        </div>
      )}

      <div ref={containerRef} className={classes.viewer} />
    </>
  );
}
