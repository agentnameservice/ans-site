export type Kind = 'Press release' | 'Blog post';
export type Project = 'ANS' | 'Trust Index';
export type Topic = 'Interoperability';
export type Tag = Kind | Project | Topic;

export interface NewsItem {
  title: string;
  url: string;
  date: string;
  source: string;
  kind: Kind;
  projects: [Project, ...Project[]];
  topics?: Topic[];
  summary: string;
}

export interface NewsTag {
  name: Tag;
  group: 'kind' | 'project' | 'topic';
  slug: string;
  items: NewsItem[];
}

const items: NewsItem[] = [
  {
    title:
      'Building Trust at Internet Scale: GoDaddy’s Agent Name Service Registry for the Agentic AI Marketplace',
    url: 'https://www.godaddy.com/resources/news/building-trust-at-internet-scale-godaddys-agent-name-service-registry-for-the-agentic-ai-marketplace',
    date: '2025-10-02',
    source: 'GoDaddy',
    kind: 'Blog post',
    projects: ['ANS'],
    summary:
      'Engineers present a proof of concept for an ANS Registry overseen by a Registration Authority that links customer verification, domain validation, paired certificates, DNSSEC-signed records, and transparency logs into one verifiable trust chain. The post walks through the ANS naming format, the registration workflow, and how DNS-based discovery and attestation badges fit together.',
  },
  {
    title: 'Why the Agent Economy Needs a Digital Passport',
    url: 'https://www.godaddy.com/resources/news/why-the-agent-economy-needs-a-digital-passport',
    date: '2025-11-05',
    source: 'GoDaddy',
    kind: 'Blog post',
    projects: ['ANS'],
    summary:
      'Engineers argue that standard HTTPS certificates cannot provide the version-specific identity and fast revocation that multi-agent systems need. The post introduces the ANS identity certificate bound to each agent version, event-driven revocation, and the public Transparency Log that records lifecycle events.',
  },
  {
    title:
      'Building the Open Agentic Web: Why Identity and Discovery Must Work Together',
    url: 'https://www.godaddy.com/resources/news/building-the-open-agentic-web-why-identity-and-discovery-must-work-together',
    date: '2026-06-17',
    source: 'GoDaddy',
    kind: 'Blog post',
    projects: ['ANS'],
    topics: ['Interoperability'],
    summary:
      'The post argues that agents need both verifiable identity and dynamic discovery, and introduces the Agentic Resource Discovery (ARD) specification developed with ten industry collaborators. ANS catalogs are exposed through an ARD-compliant search interface, so an agent can discover a capability through ARD and verify the provider’s identity through ANS.',
  },
  {
    title:
      'Linux Foundation Announces Intent to Launch Agent Name Service to Establish Trusted Identity Infrastructure for AI Agents',
    url: 'https://www.linuxfoundation.org/press/linux-foundation-announces-intent-to-launch-agent-name-service-to-establish-trusted-identity-infrastructure-for-ai-agents',
    date: '2026-06-23',
    source: 'Linux Foundation',
    kind: 'Press release',
    projects: ['ANS'],
    summary:
      'The Linux Foundation announced plans to launch ANS as an open standard for verifying and locating AI agents, built on DNS rather than a separate registry. Jim Zemlin and Jared Sine are quoted alongside supporters from Cloudflare, Cisco, Infoblox, Salesforce, OWASP, DistributedApps.ai, and Hashgraph Online.',
  },
  {
    title:
      'Don’t Trust. Verify. Offline, Sub-Millisecond Agent Verification with ANS',
    url: 'https://www.godaddy.com/resources/news/dont-trust-verify-offline-sub-millisecond-agent-verification-with-ans',
    date: '2026-09-15',
    source: 'GoDaddy',
    kind: 'Blog post',
    projects: ['ANS'],
    summary:
      'Engineers describe how ANS clients and servers verify each other from a registration receipt, a short-lived status token, and the TLS certificate, offline against published root keys. Benchmarks in the post show a full verification completing in well under a millisecond on a single core.',
  },
  {
    title:
      'Linux Foundation Welcomes Agent Name Service to Bring Verifiable Identity and Discovery to AI Agents',
    url: 'https://www.linuxfoundation.org/press/linux-foundation-welcomes-agent-name-service-to-bring-verifiable-identity-and-discovery-to-ai-agents',
    date: '2026-11-10',
    source: 'Linux Foundation',
    kind: 'Press release',
    projects: ['ANS'],
    topics: ['Interoperability'],
    summary:
      'The Linux Foundation announced at KubeCon + CloudNativeCon North America that ANS has launched as a Linux Foundation project with eleven supporting organizations and a seven-document specification governed by its Technical Steering Committee. Early adoption includes ANS identity verification in AGNTCY’s Agent Directory Service, another Linux Foundation project, and ANS Finder’s interoperability with the Agentic Resource Discovery specification.',
  },
  {
    title: 'Verify an Agent, Then Decide How Far to Trust It',
    url: 'https://www.godaddy.com/resources/news/verify-an-agent-then-decide-how-far-to-trust-it',
    date: '2026-11-18',
    source: 'GoDaddy',
    kind: 'Blog post',
    projects: ['ANS', 'Trust Index'],
    topics: ['Interoperability'],
    summary:
      'Engineers describe how the Trust Index specification and Agent Trust Discovery, its open source implementation, build on ANS verification to answer how much to trust an agent and for which actions. Agent Trust Discovery imports the ANS Transparency Log, combines it with signals such as certificate type and drift from a sealed DNS baseline, and returns five dimension scores, a recommended trust profile, and risk codes that must be read together.',
  },
];

export const news = items.toSorted((a, b) => b.date.localeCompare(a.date));

const tagNames = (item: NewsItem): Tag[] => [
  item.kind,
  ...item.projects,
  ...(item.topics ?? []),
];

const inUse = (names: Tag[], group: NewsTag['group']): NewsTag[] =>
  [...new Set(names)].toSorted().map((name) => ({
    name,
    group,
    slug: name.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-'),
    items: news.filter((item) => tagNames(item).includes(name)),
  }));

export const tags = [
  ...inUse(
    news.map((item) => item.kind),
    'kind',
  ),
  ...inUse(
    news.flatMap((item) => item.projects),
    'project',
  ),
  ...inUse(
    news.flatMap((item) => item.topics ?? []),
    'topic',
  ),
];

if (new Set(tags.map((tag) => tag.slug)).size !== tags.length) {
  throw new Error('News tags must have unique slugs.');
}

export const tagsFor = (item: NewsItem) =>
  tags.filter((tag) => tagNames(item).includes(tag.name));

export const tagPath = (tag: NewsTag) => `news/tag/${tag.slug}/`;
