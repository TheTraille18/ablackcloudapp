import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { ArchitectureDiagramConfig } from '../types/appShowcase';

interface AppArchitectureDiagramProps {
  diagram: ArchitectureDiagramConfig;
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
    position: 'relative',
  },
  wipOverlay: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    zIndex: 1,
  },
  wipOverlayText: {
    padding: '10px 18px',
    borderRadius: 8,
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: '#1a1400',
    backgroundColor: 'rgba(255, 180, 50, 0.88)',
    border: '2px solid rgba(255, 200, 80, 1)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
  },
  svg: {
    display: 'block',
    minWidth: 720,
    width: '100%',
    height: 'auto',
  },
  svgWip: {
    opacity: 0.72,
  },
});

function Box({
  x,
  y,
  w,
  h,
  label,
  sublabel,
  lines,
  fill,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sublabel?: string;
  lines?: string[];
  fill: string;
}) {
  const detailLines = lines ?? [];
  const hasSublabel = Boolean(sublabel);
  const titleY = y + (hasSublabel || detailLines.length > 0 ? 18 : h / 2 + 5);
  const sublabelY = y + 34;
  const detailsStartY = y + (hasSublabel ? 50 : 36);

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={fill}
        stroke="rgba(255,255,255,0.35)"
        strokeWidth={1.5}
      />
      <text
        x={x + w / 2}
        y={titleY}
        textAnchor="middle"
        fill="#ffffff"
        fontSize={13}
        fontWeight={700}
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={x + w / 2}
          y={sublabelY}
          textAnchor="middle"
          fill="rgba(255,255,255,0.75)"
          fontSize={11}
        >
          {sublabel}
        </text>
      )}
      {detailLines.map((line, index) => (
        <text
          key={`${line}-${index}`}
          x={x + w / 2}
          y={detailsStartY + index * 14}
          textAnchor="middle"
          fill="rgba(255,255,255,0.75)"
          fontSize={10}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export default function AppArchitectureDiagram({ diagram }: AppArchitectureDiagramProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {diagram.workInProgress && (
        <div className={classes.wipOverlay} aria-hidden>
          <span className={classes.wipOverlayText}>
            {diagram.workInProgressLabel ?? 'Work in progress'}
          </span>
        </div>
      )}
      <svg
        className={clsx(classes.svg, diagram.workInProgress && classes.svgWip)}
        viewBox={diagram.viewBox}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Architecture diagram"
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="rgba(255,255,255,0.55)" />
          </marker>
        </defs>

        {diagram.boxes.map((box) => (
          <Box key={`${box.label}-${box.x}`} {...box} />
        ))}

        {diagram.arrows.map((arrow) => (
          <line
            key={`${arrow.x1}-${arrow.y1}-${arrow.x2}-${arrow.y2}`}
            x1={arrow.x1}
            y1={arrow.y1}
            x2={arrow.x2}
            y2={arrow.y2}
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={1.5}
            markerEnd="url(#arrowhead)"
          />
        ))}

        {diagram.footer && (
          <text
            x={parseInt(diagram.viewBox.split(' ')[2], 10) / 2}
            y={parseInt(diagram.viewBox.split(' ')[3], 10) - 12}
            textAnchor="middle"
            fill="rgba(255,255,255,0.6)"
            fontSize={11}
          >
            {diagram.footer}
          </text>
        )}
      </svg>
    </div>
  );
}
