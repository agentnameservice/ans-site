---
layout: ../layouts/ContentPage.astro
title: Get started with ANS
eyebrow: Get started
heading: Get started with ANS.
description: Explore the protocol locally, manage agents with the CLI, or integrate verification into your application.
---

## Choose a starting point

- **Explore the protocol:** run the [local quickstart](#local-quickstart) to
  register an agent and verify its receipt on your machine.
- **Use an existing registry:** follow the [CLI quickstart](https://github.com/agentnameservice/ans-sdk-go#cli-quickstart)
  to install `ans-cli`, configure access, and manage agents from a terminal.
- **Build an integration:** [choose an SDK](#choose-your-tools) or use a
  [gateway verifier](https://github.com/agentnameservice/ans-gateway-auth) to
  authenticate agents in your application’s request path.

## Local quickstart

The Go reference implementation includes a Registration Authority, Transparency
Log, offline verifier, and development DNS server. The demo registers an agent and
verifies a SCITT receipt locally.

**Prerequisites:** Git, Make, Go 1.26+, OpenSSL, curl, and jq. Check the
[reference quickstart](https://github.com/agentnameservice/ans#quickstart-60-seconds)
for current requirements.

```sh
git clone https://github.com/agentnameservice/ans
cd ans
make build
scripts/demo/start.sh
scripts/demo/run-lifecycle.sh
```

Look for `VERIFIED` in the offline-verification stage. While the services are
running, you can browse their API explorers:

- Registration Authority: [localhost:18080/docs](http://localhost:18080/docs)
- Transparency Log: [localhost:18081/docs](http://localhost:18081/docs)

Stop the demo afterward:

```sh
scripts/demo/stop.sh
```

**Local development only:** the default demo uses development keys and a `noop`
DNS verifier. A passing receipt check does not test public DNS, production
certificate issuance, or a live deployment. Follow the
[local DNS testing guide](https://github.com/agentnameservice/ans#local-dns-testing-with-ans-dns)
to exercise DNS validation.

## Use the CLI

`ans-cli` provides registration, discovery, certificate management, and
Transparency Log queries without writing application code. It is available for
macOS, Linux, and Windows.

Start with the [CLI quickstart in the Go SDK README](https://github.com/agentnameservice/ans-sdk-go#cli-quickstart).
For installation alternatives, configuration, and command flags, see the
[full CLI guide](https://github.com/agentnameservice/ans-sdk-go/blob/main/cmd/ans-cli/README.md).

Before registering an agent with a hosted registry, have:

- An agent domain and access to publish its required DNS records.
- The registry API URL and a credential accepted by that operator.
- Your agent's endpoint details and any protocol metadata it publishes.
- The separate Transparency Log URL when using commands such as `badge`.

Configure `ANS_BASE_URL` and `ANS_TRANSPARENCY_URL` for the selected environment.
Use the CLI's documented environment-variable, token-file, or stdin support for
credentials. Follow the registry's returned DNS requirements and confirm that the
registration becomes `ACTIVE`.

## Choose your tools

- [Go SDK and CLI](https://github.com/agentnameservice/ans-sdk-go): registry and
  transparency clients, verification, and command-line tools.
- [Rust libraries](https://github.com/agentnameservice/ans-sdk-rust): API clients,
  shared types, and verification libraries with rustls support.
- [Java SDK](https://github.com/agentnameservice/ans-sdk-java): registration,
  discovery, cryptography, and agent client modules.

Use each project's installation guide and release notes for its supported features
and versions. The SDKs have different APIs and coverage.

## Integrate verification

1. **Choose your authority and trust roots.** Configure Registration Authority
   and Transparency Log endpoints explicitly. Decide which log keys and identities
   your application trusts.
2. **Register and publish.** Prove control of your domain, complete the certificate
   workflow, publish the DNS records returned by your RA, and wait for activation.
3. **Verify peers and authenticate callers.** Follow the ANS-6 procedures for
   certificates, identity, status, and possession. Select mTLS or DPoP for your
   topology and your implementation's capabilities.
4. **Apply authorization.** Map the authenticated identity to permitted actions.
   Test expiration, revocation, replay rejection, certificate rotation, and
   unavailable verification evidence.

## Follow a working example

- [Java protocol examples](https://github.com/agentnameservice/ans-sdk-java/tree/main/ans-sdk-agent-client/examples)
  cover A2A, MCP, and HTTP clients and services.
- [Go DPoP example](https://github.com/agentnameservice/ans-sdk-go/tree/main/examples/a2a-no-mtls)
  demonstrates application-layer proof of possession.
- [Rust MCP client](https://github.com/agentnameservice/ans-sdk-rust/blob/main/crates/ans-verify/examples/mcp_mtls_client.rs)
  demonstrates MCP over mTLS.
- [Gateway authentication](https://github.com/agentnameservice/ans-gateway-auth)
  includes recipes for agentgateway and Agent Router.

Review each example's configuration and coverage before deployment. For wire-level
contracts, use the [OpenAPI definitions and schemas](https://github.com/agentnameservice/ans-registry/tree/main/api).

## Get help

Report reproducible problems in the relevant repository:
[reference implementation](https://github.com/agentnameservice/ans/issues),
[CLI and Go SDK](https://github.com/agentnameservice/ans-sdk-go/issues), or the
[SDK or integration you are using](../ecosystem/). Include the version, operating
system, command or minimal example, and error message. Remove credentials and
private keys before sharing logs.
