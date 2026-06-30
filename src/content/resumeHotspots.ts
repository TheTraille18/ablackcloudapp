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
          { name: '*JavaScript', level: 4 },
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
    match: 'Blackstone |',
    title: 'Blackstone',
    detail:
      "As a member of Blackstone's Platform Engineering team, I supported Infrastructure as Code modernization initiatives focused on HCP Terraform. My responsibilities included onboarding existing AWS infrastructure and HCP Terraform platform configurations into Infrastructure as Code by leveraging Terraform imports and developing reusable Terraform configurations for ongoing management. This included importing HCP Terraform users, teams, and platform resources into Terraform so they could be managed through Git-based workflows instead of manual configuration through the HCP Terraform UI.\n\nThe Platform Engineering team supported multiple internal accounts, each with its own HCP Terraform configuration and infrastructure requirements. To streamline onboarding, I contributed to a React-based self-service platform that allowed users to request new HCP Terraform workspaces and account configurations. Users submitted information such as workspace names, Git repository details, and account-specific configuration requirements through the portal.\n\nTo support this workflow, I developed Python-based AWS Lambda functions that integrated with the HCP Terraform API to automate workspace lifecycle management. These services provided capabilities including creating workspaces, listing available workspaces, retrieving workspace details, and deleting workspaces through automated workflows exposed by the internal platform.\n\nOnce a workspace was provisioned, I utilized standardized Terraform module templates and account-specific configuration values to deploy and manage AWS infrastructure across development, test, and production environments in a consistent and repeatable manner.\n\nI also extended Python-based integrations with Terraform and Git platforms, resolved production issues, and improved the performance of automation workflows, including reducing the execution time of a legacy process from approximately 15 minutes to 1 minute.",
    expandThroughBullets: true,
  },
  {
    id: 'occ',
    match: 'The Options Clearing Corporation |',
    title: 'The Options Clearing Corporation (OCC)',
    detail:
      'As a Software Engineer Consultant supporting The Options Clearing Corporation (OCC), I contributed to applications and infrastructure supporting critical financial market operations. My engagement evolved through two distinct phases, providing experience across software testing, application deployments, Kubernetes operations, and platform engineering.\n\nDuring the first phase, I worked closely with the testing team, where I was responsible for developing and maintaining automated test coverage for enterprise applications. This included creating and rewriting Java-based Cucumber test scenarios and supporting monthly application releases. I was also responsible for deploying application updates across multiple environments using Rancher, providing hands-on experience with Kubernetes-based release management.\n\nDuring the second phase, my responsibilities shifted toward DevOps and platform engineering activities. In addition to managing application deployments, I investigated and resolved production issues, analyzed application and container failures, supported Kubernetes cluster migrations, and assisted with infrastructure modernization efforts. As part of this work, I provisioned Kubernetes clusters and gained practical experience with cluster administration, application troubleshooting, Helm deployments, Rancher operations, and containerized workloads running in enterprise environments.\n\nThis engagement provided valuable experience supporting highly available systems within a regulated financial services environment while strengthening my expertise in Kubernetes operations, deployment automation, troubleshooting, and platform support.',
    expandThroughBullets: true,
  },
  {
    id: 'capital-one',
    match: 'Capital One |',
    title: 'Capital One',
    detail:
      'As a Software Engineer Consultant supporting Capital One, I contributed to enterprise cloud modernization initiatives focused on AWS Aurora PostgreSQL and Infrastructure as Code. My primary responsibility was migrating multiple application platforms from a legacy internal Infrastructure as Code framework to a newer company-standard platform designed to support Aurora PostgreSQL deployments. The migration effort spanned six to seven application platforms, each consisting of development, test, and production environments supporting business-critical workloads.\n\nThe migration process involved significantly more than simply converting Infrastructure as Code. Existing environments utilized AWS Aurora PostgreSQL Global Clusters deployed across multiple AWS regions, and many environments operated on different PostgreSQL major versions. Because the new Infrastructure as Code platform only supported specific PostgreSQL versions, I was responsible for planning and executing database version upgrades while accounting for AWS Aurora PostgreSQL upgrade path restrictions. Development environments often required multiple sequential major version upgrades before reaching the target version, while production and test environments required careful coordination to maintain availability and minimize operational risk.\n\nFor Aurora Global Database environments, I helped execute controlled upgrade procedures that included upgrading secondary regions, performing database switchovers, upgrading former primary regions, and restoring the original topology. These activities required extensive validation, coordination with application owners, and careful execution to ensure business continuity. Because these databases supported live production workloads, every migration required formal change management processes, deployment approvals, and close collaboration with the teams responsible for the applications relying on the databases.\n\nAs the first engineer on the team to successfully complete a full migration across development, test, and production environments, I helped establish the migration approach, validation procedures, deployment sequencing, and operational practices that were later adopted by the broader team. While automated conversion tools were available, many database parameters and environment-specific configurations required manual validation and updates. I frequently compared generated Infrastructure as Code configurations against existing AWS environments to ensure accuracy and prevent unintended infrastructure changes.\n\nOnce database versions and configurations were aligned with platform requirements, I deployed the new Infrastructure as Code framework and validated that the generated infrastructure matched the existing Aurora configuration. This approach allowed resources to transition to the new platform without unnecessary recreation while maintaining existing behavior and operational characteristics.\n\nIn addition to infrastructure modernization efforts, I participated in technical debt remediation initiatives, audited Go package dependencies, and developed unit tests for Go-based services. This engagement strengthened my experience with AWS Aurora PostgreSQL, Global Database architectures, Infrastructure as Code migrations, production change management, database upgrade planning, stakeholder coordination, Go development, and large-scale enterprise cloud modernization projects.',
    expandThroughBullets: true,
  },
  {
    id: 'mayo-clinic',
    match: 'Mayo Clinic |',
    title: 'Mayo Clinic',
    detail:
      'As a Software Engineer Consultant supporting Mayo Clinic, I contributed to the development and modernization of a healthcare-focused platform utilizing React, GCP services, and Azure identity integrations. My primary responsibilities included developing a new user interface, implementing application enhancements, and supporting backend integrations within a cloud-native environment.\n\nA significant portion of my work involved integrating Azure App Registration-based authentication to support secure user access and identity management. I also worked with GCP services including BigQuery, Pub/Sub, and Artifact Registry while supporting application development and deployment activities across multiple environments.\n\nIn addition to feature development, I investigated and resolved CI/CD pipeline issues within Azure DevOps and assisted with application security remediation efforts, including addressing vulnerabilities related to third-party React package dependencies. I leveraged AI-assisted development tools such as Cursor to accelerate development, troubleshoot issues, and improve delivery efficiency.\n\nThis engagement provided experience working across multiple cloud platforms, combining frontend development, cloud services, identity integration, DevOps processes, and application security within a healthcare environment.',
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
