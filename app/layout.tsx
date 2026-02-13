import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KnowledgeSync - Automated knowledge base maintenance for customer support teams',
  description: 'Value Proposition: Automatically creates and updates knowledge base articles by analyzing support tickets, product changes, and user feedback to keep documentation current and comprehensive

Target Customer: SaaS companies, e-commerce businesses, and enterprises with customer support teams struggling with outdated documentation

---
Category: B2B SaaS
Target Market: SaaS companies, e-commerce businesses, and enterprises with customer support teams struggling with outdated documentation
Source Hypothesis ID: 1f0d7a37-464c-47da-92d5-608ae5163ef0
Promotion Type: automatic',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <nav className="border-b">
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
              <a href="/" className="font-bold text-lg">KnowledgeSync - Automated knowledge base maintenance for customer support teams</a>
              <div className="flex items-center gap-4">
                <a href="/dashboard" className="text-sm hover:text-blue-600">Dashboard</a>
                <a href="/pricing" className="text-sm hover:text-blue-600">Pricing</a>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
