import { SDKProvider } from "@/components/sdk-provider";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Nimbus Billing",
  description: "Account, billing, and renewal management for your team.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SDKProvider>
          <main style={{ maxWidth: 640, margin: "0 auto", padding: "2rem" }}>{children}</main>
        </SDKProvider>
      </body>
    </html>
  );
}
