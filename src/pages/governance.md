---
layout: ../layouts/ContentPage.astro
title: Governance
eyebrow: Governance
heading: Shared stewardship. Clear responsibilities.
description: The Technical Steering Committee guides the project. Maintainers and reviewers look after its repositories. Anyone can participate through public issues, proposals, and pull requests.
---

## How the project is governed

ANS separates project-wide governance from day-to-day technical maintenance.
The [Charter](https://github.com/agentnameservice/governance/blob/main/CHARTER.md)
defines the project's governance, and the
[Governance document](https://github.com/agentnameservice/governance/blob/main/GOVERNANCE.md)
defines how decisions, reviews, and releases work.

- **Technical Steering Committee (TSC):** sets project-wide technical direction,
  handles governance and project proposals, resolves escalated disputes, and
  appoints maintainers where a repository has none.
- **Maintainers:** are responsible for individual repositories. They review and
  merge changes, maintain releases and CI, handle security reports, and mentor
  contributors.
- **Reviewers:** provide technical review in their repository or area. Their
  approvals count toward review requirements; merge responsibility remains with
  the repository's maintainers.
- **Contributors:** open issues, submit changes, review work, improve documentation,
  and participate in discussions. You do not need a formal role to contribute.

TSC membership does not automatically make someone a maintainer or grant merge
authority across the project's code and specification repositories. The governance
repository has its own TSC review and merge responsibilities.

## Technical Steering Committee

The initial TSC has five voting members, listed alphabetically by surname.
Members serve as individuals; affiliations are listed for transparency.

<div class="table-wrap" role="region" aria-label="Initial TSC members" tabindex="0">

| Member                                                 | Affiliation            |
| ------------------------------------------------------ | ---------------------- |
| [Scott Courtney](https://github.com/scourtney-godaddy) | GoDaddy                |
| [Ken Huang](https://github.com/kenhuangus)             | DistributedApps.AI     |
| [Michael Kantor](https://github.com/kantorcodes)       | Hashgraph Online (HOL) |
| [Keith Perry](https://github.com/kperry-godaddy)       | GoDaddy                |
| [Connor Snitker](https://github.com/csnitker-godaddy)  | GoDaddy                |

</div>

The TSC elects its Chair and Vice Chair. Membership, appointments, and terms are
recorded in the
[TSC roster](https://github.com/agentnameservice/governance/blob/main/TSC.md).
The charter defines elections, eligibility, and organization-representation limits.

## Who maintains each repository

Use the relevant repository's issues and pull requests for technical work.
The [maintainer index](https://github.com/agentnameservice/governance/blob/main/MAINTAINERS.md)
identifies the responsible teams; repository ownership records and `CODEOWNERS`
provide local details and review routing.

<div class="table-wrap" role="region" aria-label="Repository maintenance responsibilities" tabindex="0">

| Area                                                   | Repository                                                                         | Responsible team                      |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------- | ------------------------------------- |
| ANS specifications and schemas                         | [ans-spec](https://github.com/agentnameservice/ans-spec)                           | Specification maintainers             |
| Registration Authority, Transparency Log, and verifier | [ans](https://github.com/agentnameservice/ans)                                     | Reference implementation maintainers  |
| Go SDK and CLI                                         | [ans-sdk-go](https://github.com/agentnameservice/ans-sdk-go)                       | Go SDK maintainers                    |
| Rust SDK                                               | [ans-sdk-rust](https://github.com/agentnameservice/ans-sdk-rust)                   | Rust SDK maintainers                  |
| Java SDK                                               | [ans-sdk-java](https://github.com/agentnameservice/ans-sdk-java)                   | Java SDK maintainers                  |
| Gateway authentication                                 | [ans-gateway-auth](https://github.com/agentnameservice/ans-gateway-auth)           | Gateway authentication maintainers    |
| OpenShell integration                                  | [ans-openshell](https://github.com/agentnameservice/ans-openshell)                 | OpenShell integration maintainers     |
| Trust evaluation specification                         | [trust-index-spec](https://github.com/agentnameservice/trust-index-spec)           | Trust Index specification maintainers |
| Trust discovery implementation                         | [agent-trust-discovery](https://github.com/agentnameservice/agent-trust-discovery) | Trust discovery maintainers           |

</div>

The maintainer index also covers CLI distribution repositories and project
administration. The [contributor ladder](https://github.com/agentnameservice/governance/blob/main/CONTRIBUTOR_LADDER.md)
explains how people become members, reviewers, and maintainers.

## How changes are reviewed

Changes go through pull requests with explicit review, required checks, and
Developer Certificate of Origin sign-offs. A repository maintainer merges ordinary
technical changes. Silence does not count as approval of code or specification text.

Changes to normative specification requirements, public interfaces, verification
logic, and release tooling have additional review requirements. Some project-wide
changes also require a proposal. The governance document defines the exact
[specification review rules](https://github.com/agentnameservice/governance/blob/main/GOVERNANCE.md#6-changing-the-specification)
and [code review rules](https://github.com/agentnameservice/governance/blob/main/GOVERNANCE.md#7-changing-code).

## Decisions and participation

Project decisions are discussed in public and recorded with their rationale and
outcome. Start a governance question or proposal in the
[governance issue tracker](https://github.com/agentnameservice/governance/issues).
Consult the [proposal process](https://github.com/agentnameservice/governance/blob/main/GOVERNANCE.md#5-proposals)
and [decision records](https://github.com/agentnameservice/governance/tree/main/decisions)
for the formal process and recorded outcomes.

There is no standing meeting schedule. When a TSC or maintainer meeting is called,
an issue announces it at least seven days ahead with an agenda. Meetings are open
by default, with recordings and notes linked afterward. The governance document
defines narrow exceptions for confidential matters.

[Find out how to contribute →](../community/)
