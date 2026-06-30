import { AppShowcaseContent } from '../types/appShowcase';
import { kubesentryDiagram } from './kubesentryDiagram';

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
      'RAG System ingests PDF documents, embeds them with Amazon Titan on AWS Bedrock, and stores chunks in a Chroma vector database. Users ask natural-language questions and receive answers grounded in retrieved transcript context via Claude on Bedrock.',
      'A LangGraph agent judges whether the RAG answer is sufficient. If the document cannot answer the question — for example, events after the report — the agent falls back to Tavily web search and synthesizes a final response from live results.',
    ],
    architectureCaption:
      'At ingest time, PDFs are chunked and embedded into Chroma. At query time, the question is embedded, relevant chunks are retrieved, and Claude generates a transcript-grounded RAG answer. A LangGraph agent then routes the flow: if the answer is sufficient, it is returned; otherwise Tavily searches the web and Claude produces a final answer from those results.',
    diagram: {
      viewBox: '0 0 760 400',
      boxes: [
        { x: 40, y: 30, w: 150, h: 52, label: 'PDF document', sublabel: 'Earnings transcript', fill: 'rgba(0,0,0,0.45)' },
        { x: 240, y: 30, w: 180, h: 52, label: 'Ingest pipeline', sublabel: 'Chunk + Titan embed', fill: 'rgba(255,90,95,0.35)' },
        { x: 470, y: 30, w: 160, h: 52, label: 'ChromaDB', sublabel: 'Vector store', fill: 'rgba(0,166,153,0.35)' },
        { x: 40, y: 130, w: 150, h: 52, label: 'User query', sublabel: 'Natural language', fill: 'rgba(0,0,0,0.45)' },
        { x: 240, y: 130, w: 180, h: 52, label: 'Retrieval', sublabel: 'Similarity search', fill: 'rgba(255,90,95,0.25)' },
        { x: 470, y: 130, w: 160, h: 52, label: 'Claude', sublabel: 'RAG answer', fill: 'rgba(0,166,153,0.25)' },
        { x: 280, y: 240, w: 200, h: 52, label: 'LangGraph agent', sublabel: 'Judge RAG answer', fill: 'rgba(255,90,95,0.35)' },
        { x: 40, y: 330, w: 180, h: 52, label: 'Transcript answer', sublabel: 'Return RAG result', fill: 'rgba(0,166,153,0.25)' },
        { x: 300, y: 330, w: 160, h: 52, label: 'Tavily', sublabel: 'Web search', fill: 'rgba(0,0,0,0.45)' },
        { x: 520, y: 330, w: 180, h: 52, label: 'Claude', sublabel: 'Final answer', fill: 'rgba(0,166,153,0.25)' },
      ],
      arrows: [
        { x1: 190, y1: 56, x2: 238, y2: 56 },
        { x1: 420, y1: 56, x2: 468, y2: 56 },
        { x1: 190, y1: 156, x2: 238, y2: 156 },
        { x1: 420, y1: 156, x2: 468, y2: 156 },
        { x1: 550, y1: 82, x2: 550, y2: 128 },
        { x1: 380, y1: 182, x2: 380, y2: 238 },
        { x1: 320, y1: 292, x2: 130, y2: 328 },
        { x1: 440, y1: 292, x2: 378, y2: 328 },
        { x1: 460, y1: 356, x2: 518, y2: 356 },
      ],
      footer: 'Hybrid RAG + agent — transcript grounding with web search fallback',
    },
    toolsUsed: [
      { category: 'AI', tools: ['RAG', 'LangChain', 'LangGraph', 'Claude', 'Titan Embeddings'] },
      { category: 'Backend', tools: ['Python', 'AWS Bedrock', 'Tavily'] },
      { category: 'Data', tools: ['ChromaDB', 'PyPDF', 'Chunking pipeline'] },
    ],
    progressUpdates: [
      {
        date: 'Jun 26, 2026',
        title: 'LangGraph agent + web fallback',
        detail:
          'Added a LangGraph agent that judges RAG answers and falls back to Tavily web search when the transcript cannot answer. Updated README, architecture diagram, and tools to reflect the hybrid pipeline.',
      },
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
      'AI-driven Kubernetes incident response — observability, agents, and chaos engineering in one platform.',
    githubUrl: GITHUB_URL,
    summary: [
      'KubeSentry is an AI-driven Kubernetes incident response platform that combines observability, AI agents, and chaos engineering to detect, investigate, and validate issues in Kubernetes environments.',
      'The goal is to reduce the time engineers spend diagnosing production incidents by automating root cause analysis and providing actionable recommendations.',
    ],
    architectureCaption:
      'Kubernetes API data and Prometheus, CloudWatch, and log streams feed a data collector that normalizes pods, events, metrics, and deployments. A LangGraph AI agent orchestrates multi-step investigation using Kubernetes tools and optional web search, with Claude on Amazon Bedrock driving root cause analysis, confidence scoring, and remediation recommendations delivered to Slack, Jira, ServiceNow, dashboards, or email. A separate chaos engineering pipeline uses LitmusChaos, Chaos Mesh, or AWS FIS to inject failures and validate that KubeSentry detects and diagnoses incidents correctly.',
    diagram: kubesentryDiagram,
    toolsUsed: [
      { category: 'Platform', tools: ['Kubernetes', 'EKS', 'Prometheus', 'CloudWatch', 'Helm'] },
      { category: 'AI', tools: ['LangGraph', 'Claude', 'Amazon Bedrock', 'Titan Embeddings'] },
      { category: 'Integrations', tools: ['Slack', 'Jira', 'ServiceNow', 'kubectl'] },
      { category: 'Chaos', tools: ['LitmusChaos', 'Chaos Mesh', 'AWS FIS'] },
      { category: 'Backend', tools: ['Go', 'Web search', 'Event correlation'] },
    ],
    progressUpdates: [
      {
        date: 'Jun 29, 2026',
        title: 'Go backend + Kubernetes data collection',
        detail:
          'Scaffolded the production Go layout with server and worker entrypoints, detector, and in-memory alert store. Integrated client-go to list pods and events, built a pod-failure detector, and wired a worker that polls the online-boutique namespace every 30s. Added an HTTP API for health checks and listing alerts, moved the Online Boutique Helm chart to deployments/helm/online-boutique, stood up a local kind cluster for testing, and added Makefile targets for build, run-server, run-worker, helm-install, and port-forward.',
      },
      {
        date: 'Jun 2026',
        title: 'Architecture design',
        detail:
          'Documented the full incident response pipeline — data collector, LangGraph agent, Bedrock analysis, notification channels, and chaos validation flow.',
      },
      {
        date: 'Jun 2026',
        title: 'Project page',
        detail: 'Added showcase documentation with architecture overview and planned tooling.',
      },
      {
        date: 'Planned',
        title: 'Data collector',
        detail: 'Integrate Kubernetes API, Prometheus, CloudWatch, and log streams into a unified collector.',
      },
      {
        date: 'Planned',
        title: 'LangGraph investigation agent',
        detail: 'Build multi-step incident workflows with Kubernetes tools and optional web search fallback.',
      },
      {
        date: 'Planned',
        title: 'Chaos validation',
        detail: 'Run LitmusChaos, Chaos Mesh, or AWS FIS experiments to verify detection and diagnosis.',
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
