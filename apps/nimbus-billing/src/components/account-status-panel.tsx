import React, { useState, useCallback } from 'react';

interface AccountStatusResponse {
  plan: string;
  status: string;
  renewalDate: string;
  billing: {
    priceCents?: number;
    currency: string;
  };
}

export function AccountStatusPanel() {
  const [message, setMessage] = useState<string | null>(null);

  const loadAccountStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/accounts/status");
      if (!response.ok) {
        setMessage(`Account status failed to load (HTTP ${response.status})`);
        return;
      }
      const data = (await response.json()) as AccountStatusResponse;
      if (data.billing.priceCents !== undefined) {
        const priceDollars = (data.billing.priceCents / 100).toFixed(2);
        const renewalLabel = new Date(data.renewalDate).toLocaleDateString();
        setMessage(
          `Plan: ${data.plan} (${data.status}) — $${priceDollars} ${data.billing.currency}/mo — renews ${renewalLabel}`
        );
      } else {
        setMessage("Price information is unavailable.");
      }
    } catch (error) {
      console.error("Failed to load account status", error);
      setMessage(error instanceof Error ? error.message : "Account status failed to load");
    }
  }, []);

  return (
    <div className="card">
      <h2>Account Status</h2>
      <p className="text-muted" style={{ marginBottom: "0.75rem" }}>
        Load the customer's current plan and renewal details.
      </p>
      <div className="btn-row">
        <button type="button" className="btn-danger" onClick={loadAccountStatus}>
          Load Account Status
        </button>
        {message && <span className="flash">{message}</span>}
      </div>
    </div>
  );
}