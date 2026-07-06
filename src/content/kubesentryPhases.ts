import { RoadmapPhase } from '../types/appShowcase';

export const kubesentryPhases: RoadmapPhase[] = [
  {
    number: 1,
    title: 'Alert-driven investigation agent',
    status: 'complete',
    summary:
      'Go worker detects unhealthy pods, gathers cluster evidence with client-go, and returns Bedrock-powered root cause analysis. This is the current production baseline.',
    flow: `Worker poll (30s)
  -> ListPods
  -> Detector (pod status)
  -> Alert
  -> Planner (rule-based)
  -> DescribePod / GetLogs / GetEvents
  -> Bedrock (one call)
  -> RCA saved on alert`,
    items: [
      'Go server + worker binaries',
      'client-go: ListPods, DescribePod, GetPodLogs (--previous), ListEvents',
      'Detector for CrashLoopBackOff, ImagePullBackOff, PodFailed, and related states',
      'Agent: State, Planner, ToolRunner, Orchestrator',
      'Rule-based plans (CrashLoopBackOff -> describe + logs; ImagePullBackOff -> describe + events)',
      'Amazon Bedrock / Claude RCA per incident',
      'HTTP API: health, alerts, pods',
      'In-memory alert store with RCA + InvestigatedAt',
      'kind cluster + Online Boutique demo workload',
    ],
  },
  {
    number: 2,
    title: 'Smarter planner & agent nodes',
    status: 'planned',
    summary:
      'Structure the agent like a lightweight LangGraph in Go — formal nodes, describe-first planning, and richer failure-specific workflows.',
    flow: `Alert
  -> Planner inspects reason + describe output
  -> Run only needed nodes
  -> Diagnosis`,
    items: [
      'Formal node registry (each step = one node function)',
      'Describe-first planning — skip logs when describe already shows OOMKilled or image pull errors',
      'CrashLoopBackOff -> describe -> logs only if needed -> diagnosis',
      'Pending -> describe -> events -> node/resource checks',
      'ImagePullBackOff -> describe -> events -> image/registry checks',
      'Alert dedup — avoid re-investigating the same pod + reason every 30s',
      'Investigation step log on State (feeds Phase 7 UI)',
      'User-initiated investigate API (optional entry point besides worker)',
    ],
  },
  {
    number: 3,
    title: 'RAG knowledge base',
    status: 'planned',
    summary:
      'Add Kubernetes troubleshooting docs and runbooks so the agent can ground diagnoses in retrieved context, not just live cluster data.',
    flow: `Evidence collected
  + retrieved docs
  -> Bedrock
  -> Diagnosis`,
    items: [
      'Ingest Kubernetes docs and common issue guides',
      'Internal incident notes and runbooks',
      'Vector store + similarity search',
      'Inject top-k docs into the investigation prompt',
      'Later: Stack Overflow / Stack Exchange data with attribution',
    ],
  },
  {
    number: 4,
    title: 'Structured AI diagnosis',
    status: 'planned',
    summary:
      'Upgrade Bedrock output from free text to structured fields — confidence, evidence, and remediation — stored on each alert.',
    flow: `Pod status + describe + logs + events + docs
  -> Bedrock
  -> Root cause + fix + confidence score`,
    items: [
      'Structured JSON response from Bedrock',
      'Parse and store root cause, confidence, evidence used, and suggested fix',
      'Separate high / medium / low confidence handling',
      'kubectl and YAML remediation recommendations',
    ],
  },
  {
    number: 5,
    title: 'GitHub / source code analysis',
    status: 'planned',
    summary:
      'For application-level crashes, trace stack traces from pod logs back to source code and suggest targeted fixes.',
    flow: `Stack trace in logs
  -> container image
  -> repo / commit from labels
  -> fetch GitHub source
  -> map trace to code
  -> suggest fix`,
    items: [
      'Read image labels for repository and commit',
      'Fetch relevant source files from GitHub',
      'Map stack trace lines to code locations',
      'Include code context in Bedrock prompt',
    ],
  },
  {
    number: 6,
    title: 'Incident memory',
    status: 'planned',
    summary:
      'Persist past incidents and resolutions so similar problems can recommend proven fixes.',
    flow: `New issue
  -> search similar past incidents
  -> recommend previous fix if relevant`,
    items: [
      'Durable storage (replace in-memory store)',
      'Shared state between worker and API server',
      'Embedding or keyword similarity over past RCAs',
      'Surface "similar incident" matches in diagnosis',
    ],
  },
  {
    number: 7,
    title: 'UI + investigation timeline',
    status: 'planned',
    summary:
      'Show what the agent did step by step so operators can trust and audit each diagnosis.',
    flow: `[x] Found pod CrashLoopBackOff
[x] Described pod
[x] Retrieved previous logs
[x] Retrieved matching docs
[x] Generated diagnosis`,
    items: [
      'Investigation timeline on each alert',
      'Step-by-step agent action log in the API',
      'Dashboard or web UI for alerts and RCA',
      'Expandable evidence view (describe, logs, events)',
    ],
  },
  {
    number: 8,
    title: 'Advanced features',
    status: 'planned',
    summary:
      'Observability integrations, chaos validation, and operator workflows for production use.',
    items: [
      'Prometheus / CloudWatch metrics in evidence gathering',
      'Root-cause correlation graph',
      'Chaos simulation with LitmusChaos, Chaos Mesh, or AWS FIS',
      'Slack / Jira / ServiceNow notifications',
      'One-click safe validation commands',
    ],
  },
];
