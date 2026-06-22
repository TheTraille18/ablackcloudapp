export interface ProgressUpdate {
  date: string;
  title: string;
  detail: string;
}

export interface ToolGroup {
  category: string;
  tools: string[];
}

export interface DiagramBox {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sublabel?: string;
  fill: string;
}

export interface DiagramArrow {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface ArchitectureDiagramConfig {
  viewBox: string;
  boxes: DiagramBox[];
  arrows: DiagramArrow[];
  footer?: string;
  /** Show a work-in-progress notice on the architecture diagram. */
  workInProgress?: boolean;
  /** Custom label for the architecture notice (defaults to "Work in progress"). */
  workInProgressLabel?: string;
}

export interface AppShowcaseContent {
  title: string;
  tagline: string;
  githubUrl?: string;
  githubLabel?: string;
  githubSecondaryUrl?: string;
  githubSecondaryLabel?: string;
  summary: string[];
  architectureCaption: string;
  diagram: ArchitectureDiagramConfig;
  toolsUsed: ToolGroup[];
  progressUpdates: ProgressUpdate[];
  /** Show work-in-progress notices on architecture and tools sections. */
  workInProgress?: boolean;
}
