"use client";

import { useCallback, useState } from "react";

interface ErrorToast {
  id: number;
  type: "exception" | "console" | "network";
  message: string;
}

let toastId = 0;

export function ErrorPanel() {
  const [toasts, setToasts] = useState<ErrorToast[]>([]);

  const addToast = useCallback((type: ErrorToast["type"], message: string) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  function throwUncaughtError() {
    addToast("exception", "Account ledger failed to render");
    // Use window.onerror path instead of throw to avoid Next.js dev overlay
    const err = new Error(
      "Cannot read properties of undefined (reading 'balance') in account ledger"
    );
    window.dispatchEvent(new ErrorEvent("error", { error: err, message: err.message }));
  }

  function triggerConsoleError() {
    console.error("Failed to load invoice projection", {
      code: "E_INVOICE_PROJECTION",
      ts: Date.now(),
    });
    addToast("console", "Invoice projection failed");
  }

  function triggerConsoleWarn() {
    console.warn("Stale plan cache, falling back to network", {
      code: "W_STALE_CACHE",
      ts: Date.now(),
    });
    addToast("console", "Plan cache stale");
  }

  function fetchUnreachable() {
    fetch("http://localhost:9999/unreachable").catch(() => {});
    addToast("network", "GET localhost:9999 → connection refused");
  }

  return (
    <div className="card">
      <h2>Diagnostics</h2>
      <p className="text-muted" style={{ marginBottom: "0.75rem" }}>
        Surface a known failure mode for support handoff. Each action reproduces a real customer
        report — exception, console error, console warning, or unreachable network call.
      </p>
      <div className="btn-grid">
        <div className="btn-row">
          <button type="button" className="btn-danger" onClick={throwUncaughtError}>
            Open account ledger
          </button>
        </div>
        <div className="btn-row">
          <button type="button" className="btn-danger" onClick={triggerConsoleError}>
            Reload invoices
          </button>
        </div>
        <div className="btn-row">
          <button type="button" className="btn-warning" onClick={triggerConsoleWarn}>
            Refresh plan status
          </button>
        </div>
        <div className="btn-row">
          <button type="button" className="btn-danger" onClick={fetchUnreachable}>
            Sync billing service
          </button>
        </div>
      </div>

      {toasts.length > 0 && (
        <div className="toast-stack">
          {toasts.map((toast) => (
            <div key={toast.id} className={`toast toast-${toast.type}`}>
              {toast.type === "exception" && "💥 "}
              {toast.type === "console" && "⚠ "}
              {toast.type === "network" && "🔌 "}
              {toast.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
