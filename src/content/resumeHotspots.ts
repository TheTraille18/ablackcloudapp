export interface ResumeHotspotItem {
  label: string;
  link?: string;
}

export interface ResumeSkill {
  name: string;
  /** Experience level from 0 to 10. */
  level: number;
}

export interface ResumeHotspotSection {
  title: string;
  skills?: ResumeSkill[];
  /** Plain list items (e.g. AI skills marked with *). */
  listItems?: string[];
}

export interface ResumeHotspot {
  id: string;
  /** Text to match in a resume line (case-insensitive). */
  match: string;
  title: string;
  /** Optional note shown next to the sidebar title. */
  titleNote?: string;
  detail: string;
  link?: string;
  linkLabel?: string;
  /** Optional list shown in the sidebar instead of a single detail paragraph. */
  items?: ResumeHotspotItem[];
  /** Optional grouped list with section headers (e.g. technical skills). */
  sections?: ResumeHotspotSection[];
  /** Expand the click area through lines below until the next section or role heading. */
  expandThroughBullets?: boolean;
  /** Keep expanding through lines that match other hotspots (e.g. cert names in summary text). */
  expandIgnoreNestedHotspots?: boolean;
}

export const resumeHotspots: ResumeHotspot[] = [
  {
    id: 'professional-summary',
    match: 'Professional Summary',
    title: 'Professional Summary',
    detail:
      "I'm a Cloud Software Engineer with experience delivering enterprise cloud and software engineering solutions for organizations including Blackstone, OCC, Capital One, and Mayo Clinic. My primary focus areas include AWS cloud engineering, Infrastructure as Code, Kubernetes, automation, and emerging AI technologies.\n\nThroughout my career I've worked on Terraform migrations, cloud modernization initiatives, database migrations, software testing frameworks, Kubernetes troubleshooting, CI/CD pipelines, and AI-powered automation solutions.\n\nI enjoy building systems that improve reliability, reduce operational overhead, and accelerate software delivery. Recently I've been focused on Generative AI, Retrieval Augmented Generation (RAG), AI Agents, Kubernetes, and platform engineering.",
    expandThroughBullets: true,
    expandIgnoreNestedHotspots: true,
  },
  {
    id: 'certifications',
    match: 'Certifications',
    title: 'Certifications',
    detail: '',
    items: [
      {
        label: 'AWS Solutions Architect Professional',
        link: 'https://www.credly.com/badges/c61e2d90-7176-4c24-98cd-0e52a31d67a8/linked_in_profile',
      },
      {
        label: 'AWS AI Practitioner',
        link: 'https://www.credly.com/badges/61c0b329-ee17-4d79-8702-cb21b426da7b',
      },
      {
        label: 'AWS CloudOps Engineer Associate',
        link: 'https://www.credly.com/badges/744ba0f3-a2b4-4e98-a030-e0edaa850994',
      },
      {
        label: 'AWS Developer Associate',
        link: 'https://www.credly.com/badges/aba9d3da-fe6b-4c6b-bc4c-528269ca9a89',
      },
      {
        label: 'Terraform Associate',
        link: 'https://www.credly.com/badges/d06148aa-1721-4fef-9f59-60a2ceb5fb5e',
      },
      {
        label: 'Azure Fundamentals',
        link: 'https://www.credly.com/badges/b54a6b81-67eb-4386-9a2d-a2b77f74d59a?source=linked_in_profile',
      },
      {
        label: 'AWS Cloud Practitioner',
        link: 'https://www.credly.com/badges/96f722e0-487a-4221-8f1f-e5946959e5b4',
      },
    ],
    expandThroughBullets: true,
    expandIgnoreNestedHotspots: true,
  },
  {
    id: 'technical-skills',
    match: 'Technical Skills',
    title: 'Technical Skills',
    titleNote: '* indicates Non-Professional Experience',
    detail: '',
    sections: [
      {
        title: 'Programming',
        skills: [
          { name: 'Python', level: 7 },
          { name: 'Go', level: 7 },
          { name: '*Java', level: 5 },
          { name: 'SQL', level: 4 },
          { name: '*TypeScript', level: 4 },
        ],
      },
      {
        title: 'Cloud',
        skills: [
          { name: 'AWS', level: 9 },
          { name: 'Microsoft Azure', level: 5 },
        ],
      },
      {
        title: 'Infrastructure',
        skills: [
          { name: 'Terraform', level: 7 },
          { name: 'Kubernetes', level: 6 },
          { name: 'Helm', level: 3 },
          { name: 'Docker', level: 6 },
          { name: 'Linux', level: 6 },
          { name: 'CI/CD Pipelines', level: 6 },
          { name: 'Git', level: 8 },
          { name: '*GitHub Actions', level: 6 },
        ],
      },
      {
        title: 'AWS',
        skills: [
          { name: 'Bedrock', level: 6 },
          { name: 'Lambda', level: 9 },
          { name: 'ECS/Fargate', level: 6 },
          { name: 'Aurora PostgreSQL', level: 7 },
          { name: 'PostgreSQL', level: 6 },
          { name: 'Step Functions', level: 6 },
          { name: 'DynamoDB', level: 5 },
          { name: 'CloudWatch', level: 8 },
          { name: 'EventBridge', level: 7 },
          { name: 'IAM', level: 8 },
          { name: 'VPC', level: 7 },
          { name: 'S3', level: 9 },
          { name: '*EC2', level: 7 },
          { name: 'RDS', level: 8 },
          { name: '*CDK', level: 3 },
        ],
      },
      {
        title: 'Generative AI',
        skills: [
          { name: '*RAG', level: 5 },
          { name: '*AI Agents', level: 5 },
          { name: '*LangChain', level: 6 },
          { name: '*LangGraph', level: 6 },
          { name: 'AWS Bedrock', level: 6 },
          { name: '*Amazon Titan Embeddings', level: 5 },
          { name: '*ChromaDB', level: 5 },
          { name: '*Vector Databases', level: 5 },
          { name: '*Prompt Engineering', level: 5 },
          { name: '*Semantic Search', level: 5 },
        ],
      },
    ],
    expandThroughBullets: true,
    expandIgnoreNestedHotspots: true,
  },
  {
    id: 'atos-cloudreach',
    match: 'Atos (Cloudreach)',
    title: 'Atos (Cloudreach)',
    detail:
      'Atos is a global information technology and consulting company providing cloud services, digital transformation, cybersecurity, infrastructure management, and software engineering solutions to enterprise and public-sector organizations. Through Atos and its cloud consulting division Cloudreach, clients leverage modern cloud platforms, automation, and software engineering practices to accelerate digital transformation initiatives.\n\nAs a Software Engineer Consultant, I delivered cloud-based solutions and software engineering services for enterprise clients including Blackstone, The Options Clearing Corporation (OCC), Capital One, and Mayo Clinic. My work spanned cloud modernization, Infrastructure as Code, Kubernetes support, database migrations, software development, testing automation, CI/CD troubleshooting, and AI-powered automation initiatives across AWS, Azure, and GCP environments.',
    expandThroughBullets: true,
  },
  {
    id: 'blackstone',
    match: 'Blackstone',
    title: 'Blackstone',
    detail:
      'As a Software Engineer Consultant on Blackstone’s Platform Engineering team (Atos Client: Blackstone, 01/2022 – 04/2023), I migrated Terraform Enterprise resources to HCP Terraform and imported AWS infrastructure, users, teams, and platform resources into Terraform-managed IaC.\n\nI built Jenkins CI/CD infrastructure as code with Terraform, and developed Python Lambda functions and API Gateway integrations with the HCP Terraform API to automate workspace lifecycle operations through a React self-service platform.\n\nI also optimized legacy automation workflows, reducing execution time from about 15 minutes to 1 minute.',
    expandThroughBullets: true,
  },
  {
    id: 'occ',
    match: 'The Options Clearing Corporation',
    title: 'The Options Clearing Corporation (OCC)',
    detail:
      'As a Software Engineer Consultant supporting The Options Clearing Corporation (Atos Client: OCC, 06/2023 – 06/2024), I developed Java customer test frameworks and Python integration and unit tests.\n\nI managed monthly Amazon EKS deployments using Harness and Helm, and investigated production issues with Rancher, kubectl, Docker, and application logs — strengthening hands-on Kubernetes operations experience in a regulated financial services environment.',
    expandThroughBullets: true,
  },
  {
    id: 'capital-one',
    match: 'Capital One',
    title: 'Capital One',
    detail:
      'As a Software Engineer Consultant supporting Capital One (Atos Client: Capital One, 11/2024 – 06/2025), I led the first successful migration of Aurora PostgreSQL Global Clusters from a legacy IaC platform, including required multi-stage major-version upgrades across development, test, and production.\n\nI validated Terraform configurations against existing AWS environments and coordinated production migrations through formal change management. I also audited Go dependencies, remediated technical debt, and developed Go unit tests.',
    expandThroughBullets: true,
  },
  {
    id: 'mayo-clinic',
    match: 'Mayo Clinic',
    title: 'Mayo Clinic',
    detail:
      'As a Software Engineer Consultant supporting Mayo Clinic (Atos Client: Mayo Clinic, 03/2026 – 05/2026), I developed React and TypeScript enhancements and implemented Azure App Registration authentication for a healthcare safety platform.\n\nI also resolved Azure DevOps CI/CD pipeline failures and remediated security vulnerabilities related to application dependencies.',
    expandThroughBullets: true,
  },
  {
    id: 'rag-project',
    match: 'AI Agent-Powered RAG Platform',
    title: 'AI Agent-Powered RAG Platform',
    detail:
      'As a personal cloud and AI engineering project, I developed a Retrieval-Augmented Generation (RAG) application designed to answer questions using Tesla earnings call transcripts. The project was created to explore modern AI engineering concepts including embeddings, vector databases, semantic search, and large language model integration.\n\nThe solution utilized AWS Bedrock as the large language model platform, Amazon Titan Embeddings for vector generation, and ChromaDB as the vector database. Transcript data was processed, chunked into searchable documents, converted into embeddings, and stored within ChromaDB to support semantic retrieval. When users submitted questions, the application retrieved the most relevant transcript content and supplied it to the language model to generate grounded responses.\n\nA key focus of the project was understanding how retrieval quality impacts overall response accuracy. I experimented with document chunking strategies, embedding generation, and retrieval workflows to improve the relevance of retrieved content while reducing hallucinations. The project successfully demonstrated an end-to-end RAG architecture and provided hands-on experience with vector databases, embeddings, retrieval pipelines, and AWS Bedrock integration.\n\nThis project strengthened my understanding of modern AI application development and established a foundation for future work involving AI agents, automated workflows, and enterprise knowledge management systems.',
    link: 'https://github.com/TheTraille18/jet_rag_ai_project',
    linkLabel: 'View on GitHub',
    expandThroughBullets: true,
  },
  {
    id: 'kubesentry-ai',
    match: 'KubeSentry AI',
    title: 'KubeSentry AI',
    detail:
      'KubeSentry AI is a personal project building an AI-powered Kubernetes incident response platform in Go. A worker polls the cluster, a rule-based detector flags unhealthy pods (CrashLoopBackOff, ImagePullBackOff, PodFailed, PendingTooLong, and related states), and a Go agent gathers evidence before calling Claude on Amazon Bedrock once per incident.\n\nThe agent runs as a LangGraph-style graph in Go — nodes, edges, and conditional routing — with Kubernetes tools exposed through MCP (DescribePod, GetPodLogs with --previous fallback, ListEvents). Alerts and RCA JSON persist to S3 and are served through an HTTP API. Development and testing use a local kind cluster with the Online Boutique demo workload.\n\nNext phases include describe-first planning and alert dedup, RAG-backed runbooks, structured diagnosis, GitHub source tracing, similar-incident memory, and an investigation timeline UI. Portfolio: ablackcloudapp.com/apps/kubesentry-ai',
    link: 'https://github.com/TheTraille18/kubeSentryAI',
    linkLabel: 'View on GitHub',
    expandThroughBullets: true,
  },
  {
    id: 'careerpilot-ai',
    match: 'CareerPilot',
    title: 'CareerPilot AI',
    detail:
      'Designed and developed CareerPilot AI, an AI-powered career optimization platform that tailors resumes and cover letters to specific job descriptions while preserving original DOCX formatting. Deployed on Amazon ECS Fargate with CI/CD via GitHub Actions.\n\nBuilt RAG workflows and FastAPI endpoints using Python, Amazon Bedrock, LangChain, ChromaDB, and Titan Embeddings for resume ingestion, retrieval, tailoring, and cover-letter generation. Built the React and TypeScript frontend with structured resume parsing, JSON knowledge schemas, and document-aware DOCX editing. Developed AI evaluations for factual consistency, ATS keyword coverage, response relevance, and tailoring quality.',
    link: 'https://careerpilotai.ablackcloudapp.com',
    linkLabel: 'Live app',
    expandThroughBullets: true,
  },
  {
    id: 'mcp-platform',
    match: 'MCP Platform',
    title: 'MCP Platform',
    detail:
      'Built a multi-service MCP platform on AWS using a shared ECS Fargate cluster and Application Load Balancer with path-based routing. Provisioned infrastructure through HCP Terraform and integrated ECR, Secrets Manager, CloudWatch, IAM, and GitHub Actions OIDC for secure container deployments.\n\nHosts multiple Streamable HTTP MCP servers (including Gmail and grocery tools) behind one ALB so Cursor and other agents can call tools over Bearer-authenticated endpoints.',
    link: 'https://ablackcloudapp.com/apps/mcp-platform',
    linkLabel: 'Portfolio page',
    expandThroughBullets: true,
  },
  {
    id: 'gmail-mcp',
    match: 'Gmail MCP',
    title: 'Gmail MCP',
    detail:
      'Developed a Go MCP server for searching and reading Gmail messages and managing labels through OAuth. Supports local stdio and remote Streamable HTTP access for AI assistants and other MCP-compatible clients. Deployed on the shared MCP Fargate platform at /gmail/mcp.',
    link: 'https://github.com/TheTraille18/gmail-mcp',
    linkLabel: 'View on GitHub',
    expandThroughBullets: true,
  },
  {
    id: 'grocery-mcp',
    match: 'Grocery MCP',
    title: 'Grocery MCP',
    detail:
      'Developed an extensible TypeScript MCP server for grocery store and product search, initially integrating Kroger APIs and designed to support additional retailers through a common MCP interface. Runs locally over stdio and remotely as Streamable HTTP on the shared MCP platform.',
    link: 'https://github.com/TheTraille18/grocery-mcp',
    linkLabel: 'View on GitHub',
    expandThroughBullets: true,
  },
  {
    id: 'bedrock-poc',
    match: 'Internal Innovation Initiative',
    title: 'Internal Innovation Initiative',
    detail:
      'As part of an internal innovation initiative at Atos, I collaborated within a three-person team to develop an AI-Driven Incident Response Automation Platform designed to reduce the time required to investigate and respond to operational incidents. The goal of the project was to automate repetitive incident management tasks and provide engineers with actionable insights during service disruptions.\n\nThe solution leveraged an event-driven AWS architecture utilizing CloudWatch, EventBridge, Step Functions, Lambda, DynamoDB, AWS Bedrock, ServiceNow, and Slack. Operational alerts generated by monitoring systems such as CloudWatch and New Relic triggered automated workflows that collected incident context, analyzed system state, and initiated investigation processes.\n\nA key component of the platform was the integration of AWS Bedrock and AWS DevOps Agent capabilities to assist with root cause analysis. The platform automatically gathered operational data, generated incident summaries, identified potential causes, proposed remediation actions, and produced validation and rollback procedures. This significantly reduced the amount of manual effort required during incident investigations.\n\nThe proof of concept focused on two operational scenarios. The first simulated an Amazon ECS Fargate service experiencing memory exhaustion, while the second modeled a database race condition scenario. In both cases, the platform automatically detected the issue, initiated investigation workflows, generated recommendations, and provided engineers with contextual information needed to accelerate resolution.\n\nThe platform also integrated with ServiceNow and Slack to automate incident creation, update workflows, and team notifications. In certain scenarios, automated remediation actions could be performed, including adjusting ECS Fargate memory and CPU allocations without requiring manual intervention.\n\nThe project successfully demonstrated the ability to reduce incident investigation activities that traditionally required over an hour of manual effort to approximately fifteen minutes, while establishing a foundation for future AI-powered operations and incident response capabilities.',
    expandThroughBullets: true,
  },
  {
    id: 'aws-sap',
    match: 'Solutions Architect – Professional',
    title: 'AWS Solutions Architect – Professional',
    detail:
      'Professional-level AWS certification covering multi-account architecture, cost optimization, security, and high availability design.',
  },
];

export function findResumeHotspot(lineText: string): ResumeHotspot | undefined {
  const normalized = lineText.toLowerCase();
  let bestMatch: ResumeHotspot | undefined;
  let bestLength = 0;

  resumeHotspots.forEach((hotspot) => {
    const matchText = hotspot.match.toLowerCase();
    if (normalized.includes(matchText) && matchText.length > bestLength) {
      bestMatch = hotspot;
      bestLength = matchText.length;
    }
  });

  return bestMatch;
}
