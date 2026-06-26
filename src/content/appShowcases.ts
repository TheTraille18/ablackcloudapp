import { AppShowcaseContent } from '../types/appShowcase';

const GITHUB_URL = 'https://github.com/TheTraille18/';

const platformDiagram = {
  viewBox: '0 0 760 420',
  boxes: [
    { x: 310, y: 20, w: 140, h: 52, label: 'User', sublabel: 'Browser', fill: 'rgba(0,0,0,0.45)' },
    { x: 280, y: 100, w: 200, h: 52, label: 'CloudFront', sublabel: 'CDN', fill: 'rgba(255,90,95,0.35)' },
    { x: 280, y: 180, w: 200, h: 52, label: 'S3', sublabel: 'React SPA', fill: 'rgba(0,166,153,0.35)' },
    { x: 540, y: 180, w: 180, h: 52, label: 'AppSync', sublabel: 'GraphQL API', fill: 'rgba(255,90,95,0.25)' },
    { x: 550, y: 260, w: 160, h: 52, label: 'Lambda', sublabel: 'Resolvers', fill: 'rgba(0,0,0,0.45)' },
    { x: 550, y: 340, w: 160, h: 52, label: 'DynamoDB', sublabel: 'Task data', fill: 'rgba(0,166,153,0.25)' },
    { x: 40, y: 180, w: 180, h: 52, label: 'GitHub Actions', sublabel: 'CI / CD', fill: 'rgba(0,0,0,0.45)' },
    { x: 40, y: 280, w: 180, h: 52, label: 'Cognito', sublabel: 'User pools', fill: 'rgba(0,0,0,0.35)' },
  ],
  arrows: [
    { x1: 380, y1: 72, x2: 380, y2: 98 },
    { x1: 380, y1: 152, x2: 380, y2: 178 },
    { x1: 480, y1: 206, x2: 540, y2: 206 },
    { x1: 630, y1: 232, x2: 630, y2: 258 },
    { x1: 630, y1: 312, x2: 630, y2: 338 },
    { x1: 220, y1: 206, x2: 280, y2: 206 },
    { x1: 220, y1: 306, x2: 540, y2: 220 },
  ],
  footer: 'Static hosting + serverless API on AWS · Deployed via GitHub Actions',
};

export const appShowcases: Record<string, AppShowcaseContent> = {
  ablackcloudapp: {
    title: 'ablackcloudapp',
    tagline:
      'Serverless app hub on AWS — browse tools, track progress, and explore the architecture.',
    githubUrl: 'https://github.com/TheTraille18/ablackcloudapp',
    githubLabel: 'App repo',
    githubSecondaryUrl: 'https://github.com/TheTraille18/ablackcloudapp-infra',
    githubSecondaryLabel: 'Infrastructure repo',
    summary: [
      'ablackcloudapp is a serverless app hub built on AWS. It hosts a React TypeScript frontend on S3 and CloudFront, with backend services powered by AppSync, Lambda, and DynamoDB.',
      'The platform showcases multiple tools — including a Task Manager with real-time GraphQL subscriptions — and deploys automatically through GitHub Actions on push to master and dev.',
    ],
    architectureCaption:
      'Users reach the React frontend through CloudFront and S3. The Task Manager and other services call AppSync, which invokes Lambda and persists data in DynamoDB. GitHub Actions builds and deploys the site; Cognito handles authentication for API access.',
    diagram: platformDiagram,
    toolsUsed: [
      { category: 'Frontend', tools: ['React', 'TypeScript', 'Material-UI', 'React Router', 'Redux'] },
      { category: 'AWS', tools: ['S3', 'CloudFront', 'AppSync', 'Lambda', 'DynamoDB', 'Cognito', 'Amplify'] },
      { category: 'DevOps', tools: ['GitHub Actions', 'Terraform', 'AWS CLI', 'Node.js'] },
      { category: 'API & Data', tools: ['GraphQL', 'Apollo Client', 'AWS AppSync SDK'] },
    ],
    progressUpdates: [
      {
        date: 'Jun 25, 2026',
        title: 'GitHub links fixed',
        detail:
          'Corrected GitHub repository links across several app showcase pages, including ablackcloudapp, Task Manager, and RAG System.',
      },
      {
        date: 'Jun 2026',
        title: 'App catalog and routing',
        detail:
          'Added an apps marketplace UI with category filters, alphabetical sorting, and /apps/<app-name> routes for each tool.',
      },
      {
        date: 'Jun 2026',
        title: 'UI redesign',
        detail:
          'Redesigned the site with an Airbnb-inspired layout, glassmorphism cards, and a black-cloud background theme.',
      },
      {
        date: 'Jun 2026',
        title: 'TypeScript migration',
        detail: 'Converted the React codebase from JavaScript to TypeScript with shared types and stricter build checks.',
      },
      {
        date: 'Jun 2026',
        title: 'GitHub Actions CI/CD',
        detail:
          'Set up CI builds and automated deploys to S3 + CloudFront for production and dev environments.',
      },
      {
        date: 'Earlier',
        title: 'Serverless backend',
        detail:
          'Task Manager integrated with AWS AppSync GraphQL API, Cognito auth, and real-time task subscriptions.',
      },
    ],
  },

  'task-manager': {
    title: 'Task Manager',
    tagline:
      'Serverless task scheduling with timers, real-time status updates, and GraphQL subscriptions.',
    githubUrl: 'https://github.com/TheTraille18/TaskManagerApp',
    summary: [
      'Task Manager is a serverless productivity app that lets users create timed tasks and track them in real time. Tasks are stored in DynamoDB and exposed through an AppSync GraphQL API with live subscriptions.',
      'The React frontend uses AWS Amplify to query and mutate tasks, subscribe to status changes, and display countdown timers that update as tasks run, complete, or expire.',
    ],
    architectureCaption:
      'The browser sends GraphQL queries, mutations, and subscriptions to AppSync. Lambda resolvers read and write task records in DynamoDB. Subscription events push task status changes back to connected clients in real time.',
    diagram: {
      viewBox: '0 0 760 380',
      boxes: [
        { x: 290, y: 30, w: 180, h: 52, label: 'React UI', sublabel: 'Task Manager', fill: 'rgba(0,166,153,0.35)' },
        { x: 290, y: 130, w: 180, h: 52, label: 'AppSync', sublabel: 'GraphQL + subs', fill: 'rgba(255,90,95,0.35)' },
        { x: 290, y: 230, w: 180, h: 52, label: 'Lambda', sublabel: 'CRUD resolvers', fill: 'rgba(0,0,0,0.45)' },
        { x: 290, y: 310, w: 180, h: 52, label: 'DynamoDB', sublabel: 'Tasks table', fill: 'rgba(0,166,153,0.25)' },
        { x: 520, y: 130, w: 180, h: 52, label: 'Amplify', sublabel: 'Auth + API', fill: 'rgba(0,0,0,0.35)' },
      ],
      arrows: [
        { x1: 380, y1: 82, x2: 380, y2: 128 },
        { x1: 380, y1: 182, x2: 380, y2: 228 },
        { x1: 380, y1: 282, x2: 380, y2: 308 },
        { x1: 470, y1: 156, x2: 518, y2: 156 },
      ],
      footer: 'Real-time task lifecycle powered by AppSync subscriptions',
    },
    toolsUsed: [
      { category: 'Frontend', tools: ['React', 'TypeScript', 'Material-UI', 'AWS Amplify'] },
      { category: 'AWS', tools: ['AppSync', 'Lambda', 'DynamoDB', 'Cognito'] },
      { category: 'API', tools: ['GraphQL', 'Apollo Client', 'GraphQL Subscriptions'] },
    ],
    progressUpdates: [
      {
        date: 'Jun 2026',
        title: 'Showcase page',
        detail: 'Added project documentation with architecture diagram, tools list, and progress timeline.',
      },
      {
        date: 'Earlier',
        title: 'Real-time subscriptions',
        detail: 'Wired onCreate, onUpdate, and onDelete AppSync subscriptions for live task board updates.',
      },
      {
        date: 'Earlier',
        title: 'Timer engine',
        detail: 'Implemented client-side countdown timers with hour, minute, and second scheduling.',
      },
      {
        date: 'Earlier',
        title: 'GraphQL API',
        detail: 'Built AppSync schema with getUserTasks query and create/delete task mutations.',
      },
    ],
  },

  'rag-system': {
    title: 'RAG System',
    tagline:
      'Retrieval-augmented generation for querying documents and knowledge bases with AI.',
    githubUrl: 'https://github.com/TheTraille18/jet_rag_ai_project',
    summary: [
      'RAG System will let users upload documents, embed them into a vector store, and ask natural-language questions grounded in their own data. Answers are generated by an LLM using retrieved context rather than model memory alone.',
      'The planned architecture separates ingestion (chunking, embedding, indexing) from query time (retrieval, reranking, and response generation) so the system scales as the knowledge base grows.',
    ],
    architectureCaption:
      'Documents are chunked and embedded at ingest time, then stored in a vector database. At query time, the user question is embedded, relevant chunks are retrieved, and an LLM generates a grounded answer from that context.',
    diagram: {
      viewBox: '0 0 760 400',
      boxes: [
        { x: 40, y: 40, w: 160, h: 52, label: 'Documents', sublabel: 'PDF / text', fill: 'rgba(0,0,0,0.45)' },
        { x: 280, y: 40, w: 200, h: 52, label: 'Ingest pipeline', sublabel: 'Chunk + embed', fill: 'rgba(255,90,95,0.35)' },
        { x: 540, y: 40, w: 180, h: 52, label: 'Vector store', sublabel: 'Embeddings', fill: 'rgba(0,166,153,0.35)' },
        { x: 40, y: 200, w: 160, h: 52, label: 'User query', sublabel: 'Natural language', fill: 'rgba(0,0,0,0.45)' },
        { x: 280, y: 200, w: 200, h: 52, label: 'Retrieval', sublabel: 'Similarity search', fill: 'rgba(255,90,95,0.25)' },
        { x: 540, y: 200, w: 180, h: 52, label: 'LLM', sublabel: 'Grounded answer', fill: 'rgba(0,166,153,0.25)' },
      ],
      arrows: [
        { x1: 200, y1: 66, x2: 278, y2: 66 },
        { x1: 480, y1: 66, x2: 538, y2: 66 },
        { x1: 200, y1: 226, x2: 278, y2: 226 },
        { x1: 480, y1: 226, x2: 538, y2: 226 },
        { x1: 630, y1: 92, x2: 630, y2: 198 },
      ],
      footer: 'Planned RAG pipeline — ingest, retrieve, generate',
    },
    toolsUsed: [
      { category: 'AI', tools: ['LLM', 'Embeddings', 'Vector search', 'RAG'] },
      { category: 'Backend', tools: ['Python', 'FastAPI', 'AWS Bedrock'] },
      { category: 'Data', tools: ['ChromaDB', 'S3', 'Chunking pipeline'] },
    ],
    progressUpdates: [
      {
        date: 'Jun 25, 2026',
        title: 'LangChain',
        detail: 'LangChain support added for document ingestion, retrieval, and RAG pipeline with AWS Bedrock.',
      },
      {
        date: 'Jun 2026',
        title: 'Project page',
        detail: 'Documented planned architecture, tools, and roadmap on the showcase page.',
      },
      {
        date: 'Planned',
        title: 'Document upload',
        detail: 'Build upload flow with chunking and embedding pipeline for PDF and text sources.',
      },
      {
        date: 'Planned',
        title: 'Query interface',
        detail: 'Add chat UI with retrieval-augmented answers and source citations.',
      },
    ],
  },

  'kubesentry-ai': {
    title: 'KubeSentry AI',
    tagline:
      'AI-powered Kubernetes monitoring, anomaly detection, and intelligent alerting for clusters.',
    githubUrl: GITHUB_URL,
    workInProgress: true,
    summary: [
      'KubeSentry AI aims to watch Kubernetes clusters for unusual behavior — failed pods, resource spikes, and deployment regressions — and explain what went wrong using AI-assisted analysis.',
      'Metrics and events from the cluster feed into an anomaly detection layer that correlates signals and surfaces actionable alerts instead of raw log noise.',
    ],
    architectureCaption:
      'Cluster metrics and events flow from Prometheus and the Kubernetes API into an analysis pipeline. An AI layer interprets anomalies, correlates root causes, and sends alerts to operators through a dashboard or notification channel.',
    diagram: {
      viewBox: '0 0 760 400',
      boxes: [
        { x: 40, y: 60, w: 170, h: 52, label: 'Kubernetes', sublabel: 'Cluster', fill: 'rgba(0,166,153,0.35)' },
        { x: 280, y: 60, w: 200, h: 52, label: 'Prometheus', sublabel: 'Metrics', fill: 'rgba(0,0,0,0.45)' },
        { x: 520, y: 60, w: 200, h: 52, label: 'Event stream', sublabel: 'K8s API', fill: 'rgba(0,0,0,0.35)' },
        { x: 160, y: 180, w: 200, h: 52, label: 'Anomaly engine', sublabel: 'Detection', fill: 'rgba(255,90,95,0.35)' },
        { x: 400, y: 180, w: 200, h: 52, label: 'AI analysis', sublabel: 'Root cause', fill: 'rgba(255,90,95,0.25)' },
        { x: 280, y: 300, w: 200, h: 52, label: 'Alerts', sublabel: 'Dashboard', fill: 'rgba(0,166,153,0.25)' },
      ],
      arrows: [
        { x1: 210, y1: 86, x2: 278, y2: 86 },
        { x1: 480, y1: 86, x2: 518, y2: 86 },
        { x1: 380, y1: 112, x2: 260, y2: 178 },
        { x1: 620, y1: 112, x2: 500, y2: 178 },
        { x1: 360, y1: 206, x2: 398, y2: 206 },
        { x1: 500, y1: 232, x2: 380, y2: 298 },
      ],
      footer: 'Work in progress — planned K8s observability with AI-assisted incident analysis',
      workInProgress: true,
    },
    toolsUsed: [
      { category: 'Platform', tools: ['Kubernetes', 'Prometheus', 'Helm'] },
      { category: 'AI', tools: ['LLM', 'Anomaly detection', 'Event correlation'] },
      { category: 'Backend', tools: ['Go', 'Python', 'gRPC', 'Webhooks'] },
    ],
    progressUpdates: [
      {
        date: 'Jun 2026',
        title: 'Project page',
        detail: 'Added showcase documentation with architecture overview and planned tooling.',
      },
      {
        date: 'Planned',
        title: 'Metrics collector',
        detail: 'Integrate Prometheus and Kubernetes event watchers for cluster telemetry.',
      },
      {
        date: 'Planned',
        title: 'AI alert summaries',
        detail: 'Generate human-readable incident summaries from correlated cluster signals.',
      },
    ],
  },

  'shopping-4-chow': {
    title: 'Shopping 4 Chow',
    tagline:
      'Grocery lists, meal planning, and smarter food shopping — built for everyday use.',
    githubUrl: 'https://github.com/TheTraille18/Shopping4ChowApi-Go',
    githubLabel: 'Backend repo',
    githubSecondaryUrl: 'https://github.com/TheTraille18/Shopping4Chow',
    githubSecondaryLabel: 'Frontend repo',
    summary: [
      'Shopping 4 Chow helps users plan meals, build grocery lists, and shop more efficiently. Lists can be organized by store aisle or recipe, reducing repeat trips and food waste.',
      'The planned app will sync lists across devices and optionally suggest items based on meal plans and pantry inventory.',
    ],
    architectureCaption:
      'The React frontend talks to a serverless API for list and recipe management. User data is stored in a managed database with auth for multi-device sync. Optional AI features can suggest meals based on preferences and past purchases.',
    diagram: {
      viewBox: '0 0 760 380',
      boxes: [
        { x: 290, y: 30, w: 180, h: 52, label: 'React app', sublabel: 'Lists + meals', fill: 'rgba(0,166,153,0.35)' },
        { x: 290, y: 130, w: 180, h: 52, label: 'API Gateway', sublabel: 'REST / GraphQL', fill: 'rgba(255,90,95,0.35)' },
        { x: 290, y: 230, w: 180, h: 52, label: 'Lambda', sublabel: 'Business logic', fill: 'rgba(0,0,0,0.45)' },
        { x: 290, y: 310, w: 180, h: 52, label: 'Database', sublabel: 'Lists + recipes', fill: 'rgba(0,166,153,0.25)' },
        { x: 520, y: 130, w: 180, h: 52, label: 'Auth', sublabel: 'User accounts', fill: 'rgba(0,0,0,0.35)' },
      ],
      arrows: [
        { x1: 380, y1: 82, x2: 380, y2: 128 },
        { x1: 380, y1: 182, x2: 380, y2: 228 },
        { x1: 380, y1: 282, x2: 380, y2: 308 },
        { x1: 470, y1: 156, x2: 518, y2: 156 },
      ],
      footer: 'Planned serverless grocery and meal-planning app',
      workInProgress: true,
      workInProgressLabel: 'Rework',
    },
    toolsUsed: [
      { category: 'Frontend', tools: ['React', 'TypeScript', 'Material-UI'] },
      { category: 'Backend', tools: ['Go'] },
      { category: 'Platform', tools: ['Docker', 'Kubernetes', 'AWS EKS'] },
      { category: 'AWS', tools: ['API Gateway', 'Lambda', 'DynamoDB', 'Cognito'] },
      { category: 'Features', tools: ['Grocery lists', 'Meal planning', 'Recipe tags'] },
    ],
    progressUpdates: [
      {
        date: 'Jun 2026',
        title: 'Project page',
        detail: 'Created showcase page with summary, architecture plan, and progress timeline.',
      },
      {
        date: 'Planned',
        title: 'List management',
        detail: 'Build create, edit, and check-off flows for grocery lists.',
      },
      {
        date: 'Planned',
        title: 'Meal planner',
        detail: 'Add weekly meal planning with automatic ingredient list generation.',
      },
    ],
  },

  'house-detector': {
    title: 'House Detector',
    tagline:
      'Point your phone at any house and instantly see property details, estimates, and neighborhood info.',
    githubUrl: GITHUB_URL,
    workInProgress: true,
    summary: [
      'House Detector is a mobile app that uses your phone camera and GPS to identify a property and overlay useful information in augmented reality. Aim at a house to see address, estimated value, year built, and other public record data.',
      'Computer vision matches the building and location against property databases, then renders an AR card on screen so you can explore homes while walking or driving through a neighborhood.',
    ],
    architectureCaption:
      'The mobile app captures camera frames and GPS coordinates, sends them to a backend matching service, and queries property data APIs. Results are returned to the device and rendered as an AR overlay on the live camera view.',
    diagram: {
      viewBox: '0 0 760 400',
      boxes: [
        { x: 40, y: 80, w: 170, h: 52, label: 'Mobile app', sublabel: 'Camera + GPS', fill: 'rgba(0,166,153,0.35)' },
        { x: 280, y: 80, w: 200, h: 52, label: 'Vision API', sublabel: 'House detection', fill: 'rgba(255,90,95,0.35)' },
        { x: 520, y: 80, w: 200, h: 52, label: 'Geolocation', sublabel: 'Lat / long', fill: 'rgba(0,0,0,0.45)' },
        { x: 160, y: 200, w: 200, h: 52, label: 'Matching service', sublabel: 'Property lookup', fill: 'rgba(255,90,95,0.25)' },
        { x: 400, y: 200, w: 200, h: 52, label: 'Property APIs', sublabel: 'Records + estimates', fill: 'rgba(0,166,153,0.25)' },
        { x: 280, y: 320, w: 200, h: 52, label: 'AR overlay', sublabel: 'On-screen info', fill: 'rgba(0,0,0,0.45)' },
      ],
      arrows: [
        { x1: 210, y1: 106, x2: 278, y2: 106 },
        { x1: 210, y1: 120, x2: 520, y2: 120 },
        { x1: 380, y1: 132, x2: 260, y2: 198 },
        { x1: 620, y1: 132, x2: 500, y2: 198 },
        { x1: 360, y1: 226, x2: 398, y2: 226 },
        { x1: 500, y1: 252, x2: 380, y2: 318 },
      ],
      footer: 'Work in progress — planned mobile AR app to point, detect, and learn about any house',
      workInProgress: true,
    },
    toolsUsed: [
      { category: 'Mobile', tools: ['React Native', 'ARKit', 'ARCore', 'Camera API'] },
      { category: 'AI', tools: ['Computer vision', 'Object detection', 'Geocoding'] },
      { category: 'Backend', tools: ['AWS Lambda', 'API Gateway', 'Property data APIs'] },
    ],
    progressUpdates: [
      {
        date: 'Jun 2026',
        title: 'Project page',
        detail: 'Added showcase documentation with planned AR architecture and mobile tooling.',
      },
      {
        date: 'Planned',
        title: 'Camera + GPS capture',
        detail: 'Build live camera view with location tagging for property identification.',
      },
      {
        date: 'Planned',
        title: 'AR property overlay',
        detail: 'Render address, estimates, and key facts as an augmented reality card on screen.',
      },
    ],
  },
};

export function getAppShowcase(slug: string): AppShowcaseContent {
  return appShowcases[slug];
}
