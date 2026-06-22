import { AppImage } from '../types';
import { appShowcases } from '../content/appShowcases';

export function getCatalogAppBySlug(slug: string): AppImage | undefined {
  return catalogApps.find((app) => getAppSlug(app.path) === slug);
}

export const catalogApps: AppImage[] = [
  {
    imageNumber: '1',
    url: '/static/images/task-manager.jpg',
    title: 'Task Manager',
    width: '100%',
    path: '/apps/task-manager',
    badge: 'Serverless',
    group: 'Serverless',
    status: 'Maintenance',
    infoLine1: 'Serverless task manager with timers',
    infoLine2: 'and real-time notifications',
    infoLine3: '',
    infoLine4: '',
  },
  {
    imageNumber: '2',
    url: '/static/images/ablackcloudapp.jpg',
    title: 'ablackcloudapp',
    width: '100%',
    path: '/apps/ablackcloudapp',
    badge: 'Platform',
    group: 'Tools',
    status: 'Live',
    infoLine1: 'Serverless app hub on AWS',
    infoLine2: 'browse and deploy cloud tools',
    infoLine3: '',
    infoLine4: '',
  },
  {
    imageNumber: '3',
    url: '/static/images/rag-system.jpg',
    title: 'RAG System',
    width: '100%',
    path: '/apps/rag-system',
    badge: 'RAG',
    group: 'AI',
    status: 'In Development',
    infoLine1: 'Retrieval-augmented generation',
    infoLine2: 'query your knowledge base with AI',
    infoLine3: '',
    infoLine4: '',
  },
  {
    imageNumber: '4',
    url: '/static/images/kubesentry-ai.jpg',
    title: 'KubeSentry AI',
    width: '100%',
    path: '/apps/kubesentry-ai',
    badge: 'AI',
    group: 'AI',
    status: 'POC',
    infoLine1: 'AI-powered Kubernetes monitoring',
    infoLine2: 'and anomaly detection for your clusters',
    infoLine3: '',
    infoLine4: '',
  },
  {
    imageNumber: '5',
    url: '/static/images/shopping-4-chow.jpg',
    title: 'Shopping 4 Chow',
    width: '100%',
    path: '/apps/shopping-4-chow',
    badge: 'Food',
    group: 'Tools',
    status: 'In Development',
    infoLine1: 'Grocery lists and meal planning',
    infoLine2: 'shop smarter for your next meal',
    infoLine3: '',
    infoLine4: '',
  },
  {
    imageNumber: '6',
    url: '/static/images/house-detector.jpg',
    title: 'House Detector',
    width: '100%',
    path: '/apps/house-detector',
    badge: 'AR',
    group: 'AI',
    status: 'POC',
    infoLine1: 'Point your phone at a house',
    infoLine2: 'and get property info instantly',
    infoLine3: '',
    infoLine4: '',
  },
];

export function getAppSlug(path: string): string {
  return path.replace(/^\/apps\//, '');
}

export function getToolsForApp(path: string): string[] {
  const showcase = appShowcases[getAppSlug(path)];
  if (!showcase) return [];
  return showcase.toolsUsed.flatMap((group) => group.tools);
}

export function getSearchableText(app: AppImage): string {
  const tools = getToolsForApp(app.path);
  const showcase = appShowcases[getAppSlug(app.path)];
  const summary = showcase?.summary.join(' ') ?? '';

  return [
    app.title,
    app.badge,
    app.group,
    app.status,
    app.infoLine1,
    app.infoLine2,
    summary,
    ...tools,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

export function appMatchesSearch(app: AppImage, query: string): boolean {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return true;

  const haystack = getSearchableText(app);
  const tokens = trimmed.split(/\s+/);

  return tokens.every((token) => haystack.includes(token));
}

export function filterCatalogApps(
  apps: AppImage[],
  options: { category: string; query: string }
): AppImage[] {
  return apps
    .filter(
      (app) =>
        options.category === 'All apps' ||
        app.group === options.category ||
        app.badge === options.category
    )
    .filter((app) => appMatchesSearch(app, options.query))
    .sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));
}
