export async function GET() {
  return Response.json({
    plan: "Pro",
    status: "active",
    renewalDate: "2026-06-01",
    billing: {
      priceCents: 9999, // Added priceCents to the response
      currency: "USD"
    }
  });
}