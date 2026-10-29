---
layout: ../layouts/ContentPage.astro
title: About ANS
eyebrow: About the project
heading: An open foundation for agent identity.
description: Agent Name Service defines how agents register a domain-anchored identity, publish discovery information, and present evidence that peers can verify.
---

## What ANS provides

ANS combines domain control, certificates, and transparency records to help an
application verify an agent's registered identity. Authentication checks identity,
current registration status, and possession of the associated private key.

The [published specifications](../docs/) are drafts under active development.
The project includes a reference implementation, SDKs, and integrations with
different levels of maturity. See [implementations](../ecosystem/) for their scope
and public source, and [how ANS works](../how-it-works/) for the protocol overview.

## Use cases

- **Partner and supplier APIs:** verify that a peer is bound to the expected
  agent registration before exchanging business information.
- **Agent gateways and tool services:** authenticate a caller and apply existing
  permissions to its identity before forwarding a request.
- **Lifecycle operations:** detect expired or revoked registrations and manage
  changes to the certificates used by registered agents.

These are integration patterns. A platform must explicitly implement ANS verification
and enforce the result. Registration does not automatically connect an agent to
every assistant, marketplace, or directory.

## Identity and application policy

ANS authentication identifies the peer. Your application decides what that peer
may do. Authorization, user delegation, business reputation, and safe behavior
remain separate concerns.

Sealed metadata digests can bind published metadata to a registration; they do not
attest the code executing on a remote machine. Optional Verified Identities can
add separately proven identity relationships where an implementation supports them.
Trust evaluation is maintained as a separate project.

## Project history

ANS builds on _Agent Name Service for Secure AI Agent Discovery_, contributed as
an IETF Internet-Draft. The [specification repository](https://github.com/agentnameservice/ans-registry#origin)
records that work and its authors.

On June 23, 2026, the Linux Foundation
[announced its intent to launch ANS](https://www.linuxfoundation.org/press/linux-foundation-announces-intent-to-launch-agent-name-service-to-establish-trusted-identity-infrastructure-for-ai-agents).

## Get involved

[Try the reference implementation](../for-developers/),
[read the specification](../docs/), or [make a contribution](../community/).
Project development takes place in the public
[agentnameservice GitHub organization](https://github.com/agentnameservice).
