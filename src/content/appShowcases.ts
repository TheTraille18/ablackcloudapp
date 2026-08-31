import { AppShowcaseContent } from '../types/appShowcase';
import { kubesentryDiagram } from './kubesentryDiagram';
import { kubesentryPhases } from './kubesentryPhases';

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
        date: 'Aug 31, 2026',
        title: 'MCP Platform + grocery-mcp + gmail-mcp',
        detail:
          'Added three AI catalog entries for the shared MCP ECS Fargate platform and two live Streamable HTTP servers (Kroger grocery tools and Gmail tools), with showcase pages, routes, and hero images. Added github-mcp as Planned for GitHub Issues + Project board tools.',
      },
      {
        date: 'Aug 20, 2026',
        title: 'CareerPilot AI + KubeSentry updates',
        detail:
          'Added CareerPilot AI to the app catalog and showcase (live at careerpilotai.ablackcloudapp.com). Updated KubeSentry AI docs for LangGraph-style graph nodes, MCP tool integration, S3 alert persistence, and PendingTooLong detection.',
      },
      {
        date: 'Jul 6, 2026',
        title: 'KubeSentry roadmap layout + showcase polish',
        detail:
          'Added a left-column Roadmap section on the KubeSentry showcase with an 8-phase plan (Phase 1 marked complete). Widened the 3-column layout, made the Roadmap heading larger, and added matching thin scrollbars on the roadmap, progress updates, and summary when content overflows. Updated the KubeSentry summary to reflect the shipped agent baseline. Removed the green highlight box on completed roadmap phases. Also shipped expandable progress updates — long entries show a "..." preview and expand inline on click.',
      },
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
    githubUrl: 'https://github.com/TheTraille18/kubeSentryAI',
    summary: [
      'KubeSentry AI is an alert-driven Kubernetes incident response platform. A Go worker polls the cluster, a rule-based detector flags unhealthy pods (CrashLoopBackOff, ImagePullBackOff, PodFailed, PendingTooLong, and more), and a Go agent gathers evidence before calling Claude on Amazon Bedrock once per incident.',
      'The agent now runs as a LangGraph-style graph in Go — nodes, edges, and conditional routing — instead of a flat step list. Kubernetes tools can be exposed through an MCP server so the agent calls describe/logs/events via MCP. Alerts and RCA JSON persist to S3 so the API and worker share durable state.',
      'The left-column roadmap tracks Phases 2–8: smarter planning (in progress), RAG runbooks, structured diagnosis, GitHub source tracing, incident memory, an investigation timeline UI, and advanced features like Prometheus metrics, Slack notifications, and chaos validation.',
    ],
    architectureCaption:
      'The worker polls the Kubernetes API via client-go, and the detector turns unhealthy pod states into alerts. A Go agent graph — planner/route nodes, MCP-backed tools (describe pod, logs, events), and a single Claude call on Amazon Bedrock — produces root cause analysis stored on each alert in S3. An HTTP API serves alerts and pod summaries. Prometheus, CloudWatch, notification channels (Slack, Jira), and a chaos validation pipeline are planned next.',
    diagram: kubesentryDiagram,
    roadmapPhases: kubesentryPhases,
    toolsUsed: [
      { category: 'Platform', tools: ['Kubernetes', 'kind', 'EKS', 'Helm', 'Online Boutique'] },
      {
        category: 'AI',
        tools: ['Go Agent Graph', 'MCP Tools', 'Claude', 'Amazon Bedrock'],
      },
      { category: 'Backend', tools: ['Go', 'client-go', 'Worker + Server', 'MCP server'] },
      { category: 'Kubernetes Tools', tools: ['DescribePod', 'GetPodLogs', 'ListEvents'] },
      { category: 'Storage', tools: ['S3 alert + RCA JSON'] },
      { category: 'Planned', tools: ['Alert dedup', 'RAG runbooks', 'Slack / Jira', 'LitmusChaos', 'Chaos Mesh'] },
    ],
    progressUpdates: [
      {
        date: 'Aug 7, 2026',
        title: 'S3 alert persistence + PendingTooLong',
        detail:
          'Replaced the in-memory-only alert path with an S3 repository so alerts and RCA JSON survive restarts (s3://kubesentry-ai/alerts/<ns>/<pod>/<id>.json). Extended the detector to flag pods stuck Pending too long, and updated the README with bucket env vars and API examples.',
      },
      {
        date: 'Jul 20, 2026',
        title: 'MCP tool integration',
        detail:
          'Added an MCP server/client so Kubernetes investigation tools (describe, logs, events) can be invoked through the Model Context Protocol. Wired MCP into the agent tool runner and added a cmd/mcp entrypoint for local use alongside the worker and API.',
      },
      {
        date: 'Jul 11, 2026',
        title: 'LangGraph-style agent graph',
        detail:
          'Refactored the orchestrator from a linear steps/plan flow into an explicit graph: nodes, edges, conditional routing, and shared state — matching a LangGraph-style layout in Go. Updated architecture docs to describe the new control flow.',
      },
      {
        date: 'Jul 6, 2026',
        title: 'Roadmap phases reorganized',
        detail:
          'Restructured the project roadmap so Phase 1 reflects the current shipped baseline: alert-driven worker, detector, Go agent orchestrator, client-go tools, and Bedrock RCA. Moved smarter planning, RAG, structured diagnosis, GitHub analysis, incident memory, UI timeline, and advanced features into Phases 2–8. Added a Roadmap section to the showcase page.',
      },
      {
        date: 'Jul 5, 2026',
        title: 'Go agent orchestrator + Bedrock RCA',
        detail:
          'Built the full investigation agent in internal/agent/: a rule-based planner selects tools by failure type (CrashLoopBackOff → describe + logs, ImagePullBackOff → describe + events), a ToolRunner gathers evidence from client-go without calling the LLM, and the orchestrator makes one Bedrock call per incident with a combined prompt. Wired Orchestrator.Investigate into pollPods so each alert gets an RCA saved on the alert model. Added DescribePod, GetPodLogs with --previous fallback, and ListEvents tools.',
      },
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
          'Documented the incident response pipeline — worker, detector, Go agent orchestrator, Bedrock analysis, notification channels, and chaos validation flow.',
      },
      {
        date: 'Jun 2026',
        title: 'Project page',
        detail: 'Added showcase documentation with architecture overview and planned tooling.',
      },
    ],
  },

  'careerpilot-ai': {
    title: 'CareerPilot AI',
    tagline:
      'Job alert tracking and resume tailoring — Gmail import, RAG, and Amazon Bedrock in one workflow.',
    githubUrl: 'https://github.com/TheTraille18/careerPilotAI',
    githubLabel: 'App repo',
    githubSecondaryUrl: 'https://careerpilotai.ablackcloudapp.com',
    githubSecondaryLabel: 'Live app',
    summary: [
      'CareerPilot AI helps manage a job search end to end: import roles from Gmail job alerts (LinkedIn, Dice, Indeed, CareerBuilder, Remote Rocketship), track them in a React dashboard, and tailor resumes to each posting with RAG + Claude on Amazon Bedrock.',
      'Job metadata lives in DynamoDB; job posts and tailored .docx resumes are stored in S3. A FastAPI backend serves the UI, runs AI evaluation (including remote vs on-site fit), and supports admin/demo modes for safer demos.',
    ],
    architectureCaption:
      'Gmail label import writes job metadata to DynamoDB. The React UI talks to FastAPI for listing, filtering, applied tracking, and resume actions. Job descriptions and tailored resumes are stored in S3. ChromaDB holds resume knowledge for RAG; Amazon Bedrock (Titan embeddings + Claude) generates tailored resume content.',
    diagram: {
      viewBox: '0 0 760 420',
      boxes: [
        { x: 40, y: 30, w: 180, h: 52, label: 'Gmail alerts', sublabel: 'Job labels', fill: 'rgba(0,0,0,0.45)' },
        { x: 280, y: 30, w: 200, h: 52, label: 'Import / parse', sublabel: 'gmail.py', fill: 'rgba(255,90,95,0.35)' },
        { x: 540, y: 30, w: 180, h: 52, label: 'DynamoDB', sublabel: 'Job metadata', fill: 'rgba(0,166,153,0.35)' },
        { x: 40, y: 150, w: 180, h: 52, label: 'React UI', sublabel: 'Jobs dashboard', fill: 'rgba(0,166,153,0.35)' },
        { x: 280, y: 150, w: 200, h: 52, label: 'FastAPI', sublabel: 'API + eval', fill: 'rgba(255,90,95,0.35)' },
        { x: 540, y: 150, w: 180, h: 52, label: 'S3', sublabel: 'Posts + resumes', fill: 'rgba(0,166,153,0.25)' },
        { x: 160, y: 280, w: 200, h: 52, label: 'ChromaDB', sublabel: 'Resume RAG', fill: 'rgba(0,0,0,0.45)' },
        { x: 420, y: 280, w: 220, h: 52, label: 'Amazon Bedrock', sublabel: 'Titan + Claude', fill: 'rgba(255,90,95,0.25)' },
        { x: 280, y: 360, w: 200, h: 40, label: 'Tailored .docx', sublabel: '', fill: 'rgba(0,166,153,0.25)' },
      ],
      arrows: [
        { x1: 220, y1: 56, x2: 278, y2: 56 },
        { x1: 480, y1: 56, x2: 538, y2: 56 },
        { x1: 220, y1: 176, x2: 278, y2: 176 },
        { x1: 480, y1: 176, x2: 538, y2: 176 },
        { x1: 380, y1: 56, x2: 380, y2: 148 },
        { x1: 380, y1: 202, x2: 260, y2: 278 },
        { x1: 420, y1: 202, x2: 500, y2: 278 },
        { x1: 360, y1: 306, x2: 420, y2: 306 },
        { x1: 530, y1: 332, x2: 420, y2: 358 },
      ],
      footer: 'Gmail → DynamoDB/S3 → RAG + Bedrock resume tailoring',
    },
    toolsUsed: [
      { category: 'Frontend', tools: ['React', 'TypeScript', 'Vite'] },
      { category: 'Backend', tools: ['Python', 'FastAPI'] },
      { category: 'AWS', tools: ['DynamoDB', 'S3', 'Bedrock', 'CloudFront'] },
      { category: 'AI', tools: ['RAG', 'ChromaDB', 'Claude', 'Titan Embeddings'] },
      { category: 'Integrations', tools: ['Gmail API', 'LinkedIn / Dice / Indeed alerts'] },
    ],
    progressUpdates: [
      {
        date: 'Aug 18, 2026',
        title: 'Remote vs on-site AI evaluation',
        detail:
          'Updated Gmail import args and Bedrock prompts so job fit evaluation accounts for remote versus on-site requirements when scoring roles.',
      },
      {
        date: 'Aug 14, 2026',
        title: 'Filter retention',
        detail:
          'Dashboard filters now retain across sessions so recurring job-search workflows stay intact.',
      },
      {
        date: 'Aug 14, 2026',
        title: 'S3 base resume + CORS downloads',
        detail:
          'Load the base resume from S3 and expose download filenames with CORS so the UI can fetch tailored resumes reliably from the browser.',
      },
      {
        date: 'Aug 13, 2026',
        title: 'Admin + demo modes',
        detail:
          'Added admin and demo modes for safer live demos, plus deployment updates for the hosted CareerPilot frontend.',
      },
      {
        date: 'Aug 7, 2026',
        title: 'AI eval + applied tracking',
        detail:
          'Expanded the job workflow with cover-letter support, URL fetch for job posts, applied-status tracking, and AI evaluation of role fit (merged Aug 9).',
      },
      {
        date: 'Jul 15, 2026',
        title: 'MVP: Gmail import + RAG resume tailoring',
        detail:
          'Shipped the core loop: parse Gmail job alerts into DynamoDB, manage jobs in a React UI, store posts in S3, and tailor resumes with ChromaDB RAG + Claude on Bedrock.',
      },
    ],
  },

  'mcp-platform': {
    title: 'MCP Platform',
    tagline:
      'Shared ECS Fargate + ALB for Model Context Protocol servers — path routing, secrets, and Cursor Streamable HTTP.',
    githubUrl: 'https://github.com/TheTraille18/mcp-infa',
    githubLabel: 'Infrastructure repo',
    githubSecondaryUrl: 'http://mcp-prod-alb-1828811810.us-east-1.elb.amazonaws.com/mcp',
    githubSecondaryLabel: 'Live ALB (/mcp)',
    summary: [
      'MCP Platform is a shared AWS runtime for multiple MCP HTTP servers. One ECS Fargate cluster and Application Load Balancer host path-routed services (grocery default /mcp, Gmail /gmail/mcp) so Cursor and other clients can call tools over Streamable HTTP with Bearer auth.',
      'Each service has its own target group, security group, task definition, ECR image, and Secrets Manager secret. Infrastructure is managed with Terraform (HCP Terraform workspace); containers roll out via new task definition revisions and ECR pushes.',
    ],
    architectureCaption:
      'Cursor (or any MCP client) hits the shared ALB. Listener rules route by path to grocery-mcp or gmail-mcp target groups. Fargate tasks pull images from ECR, inject runtime secrets from Secrets Manager, and expose Streamable HTTP MCP endpoints. CloudWatch Logs capture container output; IAM execution roles limit AWS access.',
    diagram: {
      viewBox: '0 0 760 400',
      boxes: [
        { x: 290, y: 20, w: 180, h: 52, label: 'Cursor', sublabel: 'MCP client', fill: 'rgba(0,0,0,0.45)' },
        { x: 280, y: 110, w: 200, h: 52, label: 'ALB', sublabel: 'Path routing', fill: 'rgba(255,90,95,0.35)' },
        { x: 40, y: 230, w: 200, h: 52, label: 'grocery-mcp', sublabel: '/mcp', fill: 'rgba(0,166,153,0.35)' },
        { x: 280, y: 230, w: 200, h: 52, label: 'gmail-mcp', sublabel: '/gmail/mcp', fill: 'rgba(0,166,153,0.35)' },
        { x: 520, y: 230, w: 200, h: 52, label: 'ECS Fargate', sublabel: 'cluster: mcp', fill: 'rgba(0,0,0,0.45)' },
        { x: 40, y: 330, w: 200, h: 48, label: 'ECR', sublabel: 'Images', fill: 'rgba(0,0,0,0.35)' },
        { x: 280, y: 330, w: 200, h: 48, label: 'Secrets Manager', sublabel: 'Runtime secrets', fill: 'rgba(255,90,95,0.25)' },
        { x: 520, y: 330, w: 200, h: 48, label: 'CloudWatch', sublabel: 'Logs', fill: 'rgba(0,166,153,0.25)' },
      ],
      arrows: [
        { x1: 380, y1: 72, x2: 380, y2: 108 },
        { x1: 320, y1: 162, x2: 160, y2: 228 },
        { x1: 380, y1: 162, x2: 380, y2: 228 },
        { x1: 440, y1: 162, x2: 580, y2: 228 },
        { x1: 140, y1: 282, x2: 140, y2: 328 },
        { x1: 380, y1: 282, x2: 380, y2: 328 },
        { x1: 580, y1: 282, x2: 580, y2: 328 },
      ],
      footer: 'Shared ALB → path rules → per-service Fargate tasks (ECR + Secrets + Logs)',
    },
    toolsUsed: [
      { category: 'Compute', tools: ['ECS Fargate', 'Application Load Balancer', 'Target groups'] },
      { category: 'AWS', tools: ['ECR', 'Secrets Manager', 'CloudWatch Logs', 'IAM'] },
      { category: 'IaC', tools: ['Terraform', 'HCP Terraform'] },
      { category: 'Protocol', tools: ['MCP', 'Streamable HTTP', 'Bearer auth'] },
    ],
    progressUpdates: [
      {
        date: 'Aug 2026',
        title: 'gmail-mcp on shared ALB',
        detail:
          'Added a Gmail Fargate service with path rule /gmail/*, dedicated target group and security group, and Secrets Manager runtime config for OAuth + API token.',
      },
      {
        date: 'Aug 2026',
        title: 'grocery-mcp default /mcp',
        detail:
          'Deployed grocery-mcp as the default MCP path on the shared ALB with Streamable HTTP GET/DELETE 405 handling for Cursor clients.',
      },
      {
        date: 'Aug 2026',
        title: 'Platform foundation',
        detail:
          'Stood up the mcp ECS cluster, shared ALB, ECR repos, IAM roles, and Terraform workspace for multi-service MCP hosting.',
      },
    ],
  },

  'grocery-mcp': {
    title: 'grocery-mcp',
    tagline:
      'Kroger store and product MCP tools — TypeScript Streamable HTTP on Fargate for Cursor.',
    githubUrl: 'https://github.com/TheTraille18/grocery-mcp',
    githubLabel: 'App repo',
    githubSecondaryUrl: 'http://mcp-prod-alb-1828811810.us-east-1.elb.amazonaws.com/mcp',
    githubSecondaryLabel: 'Live MCP (/mcp)',
    summary: [
      'grocery-mcp is a TypeScript Model Context Protocol server that wraps the Kroger Public API so agents in Cursor can find nearby stores and search products by location.',
      'It runs locally over stdio and in AWS as a Streamable HTTP container on the shared MCP Fargate platform. Runtime secrets (MCP Bearer token, Kroger client credentials) come from Secrets Manager; GitHub Actions OIDC pushes images to ECR and rolls the ECS service.',
    ],
    architectureCaption:
      'Cursor calls the MCP endpoint on the shared ALB (/mcp). The grocery-mcp Fargate task authenticates the Bearer token, talks to Kroger OAuth + Products/Locations APIs, and returns tool results. Deployments rebuild the Docker image, push to ECR, and update the ECS task definition.',
    diagram: {
      viewBox: '0 0 760 380',
      boxes: [
        { x: 40, y: 40, w: 180, h: 52, label: 'Cursor', sublabel: 'MCP client', fill: 'rgba(0,0,0,0.45)' },
        { x: 280, y: 40, w: 200, h: 52, label: 'ALB /mcp', sublabel: 'Streamable HTTP', fill: 'rgba(255,90,95,0.35)' },
        { x: 540, y: 40, w: 180, h: 52, label: 'grocery-mcp', sublabel: 'Fargate task', fill: 'rgba(0,166,153,0.35)' },
        { x: 280, y: 170, w: 200, h: 52, label: 'Secrets Manager', sublabel: 'Token + Kroger', fill: 'rgba(0,0,0,0.45)' },
        { x: 540, y: 170, w: 180, h: 52, label: 'Kroger API', sublabel: 'OAuth + products', fill: 'rgba(255,90,95,0.25)' },
        { x: 40, y: 300, w: 200, h: 52, label: 'GitHub Actions', sublabel: 'OIDC deploy', fill: 'rgba(0,0,0,0.35)' },
        { x: 280, y: 300, w: 200, h: 52, label: 'ECR', sublabel: 'grocery-mcp', fill: 'rgba(0,166,153,0.25)' },
        { x: 540, y: 300, w: 180, h: 52, label: 'ECS service', sublabel: 'Rollout', fill: 'rgba(0,166,153,0.25)' },
      ],
      arrows: [
        { x1: 220, y1: 66, x2: 278, y2: 66 },
        { x1: 480, y1: 66, x2: 538, y2: 66 },
        { x1: 630, y1: 92, x2: 630, y2: 168 },
        { x1: 540, y1: 196, x2: 480, y2: 196 },
        { x1: 240, y1: 326, x2: 278, y2: 326 },
        { x1: 480, y1: 326, x2: 538, y2: 326 },
        { x1: 630, y1: 300, x2: 630, y2: 92 },
      ],
      footer: 'Cursor → ALB /mcp → grocery-mcp → Kroger · CI: Actions → ECR → ECS',
    },
    toolsUsed: [
      { category: 'MCP', tools: ['@modelcontextprotocol/sdk', 'Streamable HTTP', 'stdio', 'find_stores', 'set_store', 'search_products'] },
      { category: 'Language', tools: ['TypeScript', 'Node.js', 'Zod'] },
      { category: 'Integrations', tools: ['Kroger Public API', 'OAuth client credentials'] },
      { category: 'AWS', tools: ['ECS Fargate', 'ECR', 'Secrets Manager', 'ALB'] },
      { category: 'DevOps', tools: ['Docker', 'GitHub Actions OIDC'] },
    ],
    progressUpdates: [
      {
        date: 'Aug 2026',
        title: 'Fargate + Cursor HTTP',
        detail:
          'Containerized Streamable HTTP with host binding for Fargate, ALB path routing, and GET/DELETE 405 responses required by Cursor’s MCP transport.',
      },
      {
        date: 'Aug 2026',
        title: 'OIDC deploy pipeline',
        detail:
          'GitHub Actions assumes an IAM role via OIDC, builds/pushes ECR, and updates the ECS service for grocery-mcp.',
      },
      {
        date: 'Aug 2026',
        title: 'Kroger MCP tools',
        detail:
          'Shipped TypeScript MCP tools for nearby store lookup and product search against the Kroger Public API.',
      },
    ],
  },

  'gmail-mcp': {
    title: 'gmail-mcp',
    tagline:
      'Gmail search, read, and label tools over MCP — Go stdio locally, Streamable HTTP on Fargate.',
    githubUrl: 'https://github.com/TheTraille18/gmail-mcp',
    githubLabel: 'App repo',
    githubSecondaryUrl: 'http://mcp-prod-alb-1828811810.us-east-1.elb.amazonaws.com/gmail/mcp',
    githubSecondaryLabel: 'Live MCP (/gmail/mcp)',
    summary: [
      'gmail-mcp is a Go MCP server that exposes Gmail tools to agents: ping, search_gmail, get_gmail, list_labels, and apply_label. Local Cursor uses the stdio binary; AWS serves the same tools over Streamable HTTP behind the shared MCP ALB at /gmail/mcp.',
      'OAuth client credentials and refresh token are injected from Secrets Manager as JSON env vars and written to /tmp at startup for the Gmail client. Multi-stage Docker builds produce a small Alpine image pushed to ECR.',
    ],
    architectureCaption:
      'Cursor authenticates with a Bearer token on the ALB path /gmail/mcp. The gmail-mcp Fargate task runs the HTTP MCP server, uses Secrets Manager-backed Google credentials, and calls the Gmail API. A separate stdio entrypoint supports the same tools without HTTP for local development.',
    diagram: {
      viewBox: '0 0 760 400',
      boxes: [
        { x: 40, y: 30, w: 180, h: 52, label: 'Cursor', sublabel: 'MCP client', fill: 'rgba(0,0,0,0.45)' },
        { x: 280, y: 30, w: 220, h: 52, label: 'ALB /gmail/mcp', sublabel: 'Streamable HTTP', fill: 'rgba(255,90,95,0.35)' },
        { x: 560, y: 30, w: 160, h: 52, label: 'gmail-mcp', sublabel: 'Go · Fargate', fill: 'rgba(0,166,153,0.35)' },
        { x: 280, y: 150, w: 220, h: 52, label: 'Secrets Manager', sublabel: 'OAuth + API token', fill: 'rgba(0,0,0,0.45)' },
        { x: 560, y: 150, w: 160, h: 52, label: 'Gmail API', sublabel: 'Search / labels', fill: 'rgba(255,90,95,0.25)' },
        { x: 40, y: 270, w: 180, h: 52, label: 'cmd/server', sublabel: 'Local stdio', fill: 'rgba(0,166,153,0.25)' },
        { x: 280, y: 270, w: 220, h: 52, label: 'cmd/http', sublabel: 'Bearer + /mcp', fill: 'rgba(0,166,153,0.35)' },
        { x: 560, y: 270, w: 160, h: 52, label: 'ECR', sublabel: 'Alpine image', fill: 'rgba(0,0,0,0.35)' },
        { x: 280, y: 350, w: 220, h: 40, label: 'Tools', sublabel: 'search · get · labels', fill: 'rgba(0,0,0,0.35)' },
      ],
      arrows: [
        { x1: 220, y1: 56, x2: 278, y2: 56 },
        { x1: 500, y1: 56, x2: 558, y2: 56 },
        { x1: 640, y1: 82, x2: 640, y2: 148 },
        { x1: 560, y1: 176, x2: 500, y2: 176 },
        { x1: 390, y1: 82, x2: 390, y2: 148 },
        { x1: 130, y1: 270, x2: 130, y2: 82 },
        { x1: 390, y1: 270, x2: 390, y2: 202 },
        { x1: 640, y1: 270, x2: 640, y2: 82 },
        { x1: 390, y1: 322, x2: 390, y2: 348 },
      ],
      footer: 'stdio or ALB /gmail/mcp → gmail-mcp → Gmail API (Secrets Manager credentials)',
    },
    toolsUsed: [
      { category: 'MCP', tools: ['mcp-go', 'Streamable HTTP', 'stdio', 'ping', 'search_gmail', 'get_gmail', 'list_labels', 'apply_label'] },
      { category: 'Language', tools: ['Go'] },
      { category: 'Integrations', tools: ['Gmail API', 'OAuth 2.0'] },
      { category: 'AWS', tools: ['ECS Fargate', 'ECR', 'Secrets Manager', 'ALB'] },
      { category: 'DevOps', tools: ['Docker multi-stage', 'AWS CLI deploy'] },
    ],
    progressUpdates: [
      {
        date: 'Aug 2026',
        title: 'HTTP on Fargate',
        detail:
          'Added cmd/http with Bearer auth, /mcp and /gmail/mcp routes, Secrets Manager JSON → /tmp credential files, and ECS service behind ALB /gmail/*.',
      },
      {
        date: 'Aug 2026',
        title: 'Split from ai-assistant',
        detail:
          'Carved Gmail MCP tools into a dedicated gmail-mcp Go module with stdio and HTTP entrypoints for Cursor and AWS.',
      },
      {
        date: 'Aug 2026',
        title: 'Gmail tool set',
        detail:
          'Implemented search, message fetch, label list, and apply_label tools against the Gmail API.',
      },
    ],
  },

  'github-mcp': {
    title: 'github-mcp',
    tagline:
      'Manage GitHub Issues and Project boards from AI tools — create tickets and move cards via MCP.',
    githubUrl: 'https://github.com/TheTraille18/github-mcp',
    githubLabel: 'App repo (planned)',
    workInProgress: true,
    summary: [
      'github-mcp will expose Model Context Protocol tools so AI assistants and other MCP-compatible clients can work your GitHub Project board: list items by column, open issues, add them to the board, and update Status (Todo → In Progress → Done).',
      'First slice targets GitHub Issues + Projects (v2) with a fine-grained token or GitHub App. Same deploy path as other MCP servers later: stdio locally, Streamable HTTP on the shared ECS Fargate platform.',
    ],
    architectureCaption:
      'Any MCP-compatible AI client calls github-mcp tools. The server uses the GitHub GraphQL/REST APIs to create issues, attach them to a Project, and set the Status field. Planned runtime secrets: GitHub token, owner, repo, and project number.',
    diagram: {
      viewBox: '0 0 760 360',
      boxes: [
        { x: 40, y: 40, w: 180, h: 52, label: 'AI tools', sublabel: 'MCP clients', fill: 'rgba(0,0,0,0.45)' },
        { x: 280, y: 40, w: 200, h: 52, label: 'github-mcp', sublabel: 'Tools', fill: 'rgba(0,166,153,0.35)' },
        { x: 540, y: 40, w: 180, h: 52, label: 'GitHub API', sublabel: 'Issues + Projects', fill: 'rgba(255,90,95,0.35)' },
        { x: 160, y: 180, w: 200, h: 52, label: 'create_issue', sublabel: 'New ticket', fill: 'rgba(0,0,0,0.35)' },
        { x: 400, y: 180, w: 200, h: 52, label: 'set_status', sublabel: 'Board column', fill: 'rgba(0,166,153,0.25)' },
        { x: 280, y: 290, w: 200, h: 48, label: 'Project board', sublabel: 'Todo · Doing · Done', fill: 'rgba(255,90,95,0.25)' },
      ],
      arrows: [
        { x1: 220, y1: 66, x2: 278, y2: 66 },
        { x1: 480, y1: 66, x2: 538, y2: 66 },
        { x1: 350, y1: 92, x2: 260, y2: 178 },
        { x1: 410, y1: 92, x2: 480, y2: 178 },
        { x1: 360, y1: 232, x2: 360, y2: 288 },
        { x1: 500, y1: 232, x2: 400, y2: 288 },
      ],
      footer: 'Planned — AI tools → github-mcp → GitHub Issues + Project board',
      workInProgress: true,
    },
    toolsUsed: [
      { category: 'MCP (planned)', tools: ['list_project_items', 'create_issue', 'add_to_project', 'set_status'] },
      { category: 'Integrations', tools: ['GitHub Issues', 'GitHub Projects v2', 'GraphQL / REST'] },
      { category: 'Auth', tools: ['Fine-grained PAT or GitHub App'] },
      { category: 'Platform (later)', tools: ['stdio', 'Streamable HTTP', 'ECS Fargate'] },
    ],
    progressUpdates: [
      {
        date: 'Aug 31, 2026',
        title: 'Catalog entry',
        detail:
          'Added github-mcp to the app catalog as Planned: GitHub Issues + Project board management for MCP-compatible AI clients.',
      },
      {
        date: 'Planned',
        title: 'MVP board loop',
        detail:
          'Implement create_issue, add_to_project, list_project_items, and set_status against a real GitHub Project.',
      },
      {
        date: 'Planned',
        title: 'Deploy on MCP Platform',
        detail:
          'Containerize Streamable HTTP and route /github/mcp on the shared ALB once the stdio tools are solid.',
      },
    ],
  },

  'knowledge-mcp': {
    title: 'knowledge-mcp',
    tagline:
      'Study-topic MCP — store topics in DynamoDB, list them from AI tools, and get quizzed on what you need to learn.',
    githubUrl: 'https://github.com/TheTraille18/knowledge-mcp',
    githubLabel: 'App repo (planned)',
    workInProgress: true,
    summary: [
      'knowledge-mcp will keep a list of study topics (most likely in DynamoDB) and expose MCP tools so AI assistants and other MCP-compatible clients can list topics, add new ones, and quiz you on selected material.',
      'The AI tool uses those results to run the study conversation; the server owns persistence and quiz prompts. Same later path as other MCP apps: stdio locally, Streamable HTTP on the shared Fargate platform.',
    ],
    architectureCaption:
      'Any MCP-compatible AI client calls knowledge-mcp tools. Topics are read and written in DynamoDB. quiz_me returns questions or study prompts for one or more topics so the AI can test you in chat.',
    diagram: {
      viewBox: '0 0 760 360',
      boxes: [
        { x: 40, y: 40, w: 180, h: 52, label: 'AI tools', sublabel: 'MCP clients', fill: 'rgba(0,0,0,0.45)' },
        { x: 280, y: 40, w: 200, h: 52, label: 'knowledge-mcp', sublabel: 'Tools', fill: 'rgba(0,166,153,0.35)' },
        { x: 540, y: 40, w: 180, h: 52, label: 'DynamoDB', sublabel: 'Topics', fill: 'rgba(255,90,95,0.35)' },
        { x: 100, y: 180, w: 160, h: 52, label: 'list_topics', sublabel: '', fill: 'rgba(0,0,0,0.35)' },
        { x: 300, y: 180, w: 160, h: 52, label: 'add_topic', sublabel: '', fill: 'rgba(0,166,153,0.25)' },
        { x: 500, y: 180, w: 160, h: 52, label: 'quiz_me', sublabel: 'Test prompts', fill: 'rgba(255,90,95,0.25)' },
        { x: 280, y: 290, w: 200, h: 48, label: 'Study session', sublabel: 'AI quizzes you', fill: 'rgba(0,0,0,0.35)' },
      ],
      arrows: [
        { x1: 220, y1: 66, x2: 278, y2: 66 },
        { x1: 480, y1: 66, x2: 538, y2: 66 },
        { x1: 340, y1: 92, x2: 180, y2: 178 },
        { x1: 380, y1: 92, x2: 380, y2: 178 },
        { x1: 420, y1: 92, x2: 560, y2: 178 },
        { x1: 580, y1: 232, x2: 420, y2: 288 },
      ],
      footer: 'Planned — AI tools → knowledge-mcp → DynamoDB topics + quiz prompts',
      workInProgress: true,
    },
    toolsUsed: [
      { category: 'MCP (planned)', tools: ['list_topics', 'add_topic', 'get_topic', 'quiz_me'] },
      { category: 'Data', tools: ['DynamoDB'] },
      { category: 'AI workflow', tools: ['Topic list', 'Quiz prompts', 'MCP-compatible AI clients'] },
      { category: 'Platform (later)', tools: ['stdio', 'Streamable HTTP', 'ECS Fargate'] },
    ],
    progressUpdates: [
      {
        date: 'Aug 31, 2026',
        title: 'Catalog entry',
        detail:
          'Added knowledge-mcp to the app catalog as Planned: DynamoDB-backed study topics with list, add, and quiz tools for MCP-compatible AI clients.',
      },
      {
        date: 'Planned',
        title: 'Topic CRUD + quiz_me',
        detail:
          'Implement DynamoDB topic store and MCP tools to list, add, fetch, and generate quiz prompts.',
      },
      {
        date: 'Planned',
        title: 'Deploy on MCP Platform',
        detail:
          'Containerize Streamable HTTP and route /knowledge/mcp on the shared ALB once the stdio tools are solid.',
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
