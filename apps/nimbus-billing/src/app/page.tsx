"use client";

import { AccountStatusPanel } from "@/components/account-status-panel";
import { ErrorPanel } from "@/components/error-panel";
import { IdentityBar } from "@/components/identity-bar";
import { LoginForm } from "@/components/login-form";
import Link from "next/link";
import { useState } from "react";

interface UserInfo {
  id: string;
  name: string;
  email: string;
}

export default function HomePage() {
  const [user, setUser] = useState<UserInfo | null>(null);

  return (
    <>
      <h1>Nimbus Billing</h1>
      <p className="text-muted" style={{ marginBottom: "1rem" }}>
        Account, billing, and renewal management for your team.
      </p>

      {user ? (
        <IdentityBar
          name={user.name}
          email={user.email}
          userId={user.id}
          onLogout={() => setUser(null)}
        />
      ) : (
        <LoginForm onLogin={setUser} />
      )}

      <AccountStatusPanel />
      <ErrorPanel />

      <div className="card">
        <h2>Workspace</h2>
        <p className="text-muted" style={{ marginBottom: "0.5rem" }}>
          Open the dashboard to view active subscriptions and recent invoices.
        </p>
        <Link href="/dashboard">Go to Dashboard &rarr;</Link>
      </div>
    </>
  );
}
