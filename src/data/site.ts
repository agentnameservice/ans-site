export const organization = 'https://github.com/agentnameservice';
export const specification = `${organization}/ans-registry`;

export const url = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

export const navigation = [
  { label: 'Overview', path: '' },
  { label: 'Get started', path: 'for-developers/' },
  { label: 'Documentation', path: 'docs/' },
  { label: 'Implementations', path: 'ecosystem/' },
  { label: 'Community', path: 'community/' },
];

export const specs = [
  {
    id: 'ANS-0',
    title: 'Identity',
    description:
      'Domain control, proof of key possession, and optional Verified Identities.',
    file: 'ans-0-identity-anchor.md',
  },
  {
    id: 'ANS-1',
    title: 'Registration',
    description:
      'Registration, activation, renewal, deprecation, and revocation.',
    file: 'ans-1-registration.md',
  },
  {
    id: 'ANS-2',
    title: 'Versioned naming',
    description:
      'ANS names and the certificates that bind an identity to a version.',
    file: 'ans-2-versioned-naming.md',
  },
  {
    id: 'ANS-3',
    title: 'DNS publication',
    description:
      'Discovery profiles, badge records, and optional DANE bindings.',
    file: 'ans-3-dns-publication.md',
  },
  {
    id: 'ANS-4',
    title: 'Transparency',
    description:
      'Signed lifecycle events, SCITT receipts, and verifiable log history.',
    file: 'ans-4-transparency.md',
  },
  {
    id: 'ANS-5',
    title: 'Integrity monitoring',
    description:
      'Periodic verification and reports about changes to registered artifacts.',
    file: 'ans-5-integrity-monitoring.md',
  },
  {
    id: 'ANS-6',
    title: 'Agent authentication',
    description:
      'Peer identity, current status, and possession through mTLS or DPoP.',
    file: 'ans-6-agent-authentication.md',
  },
];

export const sdks = [
  {
    name: 'Go',
    repo: 'ans-sdk-go',
    detail: 'Registry and transparency clients, verification, and the ANS CLI.',
    label: 'SDK + CLI',
  },
  {
    name: 'Rust',
    repo: 'ans-sdk-rust',
    detail:
      'API clients, shared types, and verification libraries with rustls support.',
    label: 'SDK',
  },
  {
    name: 'Java',
    repo: 'ans-sdk-java',
    detail: 'Registration, discovery, cryptography, and agent client modules.',
    label: 'SDK',
  },
];
