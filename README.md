# TrustLoop Demo

Standalone demo/test harness for the TrustLoop browser SDK.

## What is included

- `apps/nimbus-billing`: Next.js Nimbus Billing app (the customer-facing surface used as the demo product)
- `packages/sdk-browser`: local `@trustloop/sdk` package used by the demo

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

The demo app runs on [http://localhost:3001](http://localhost:3001).

Set `NEXT_PUBLIC_TRUSTLOOP_INGEST_URL` to the TrustLoop web/API service and
`NEXT_PUBLIC_TRUSTLOOP_API_KEY` to a workspace API key before testing ingest.

## Checks

```bash
npm run check
```
