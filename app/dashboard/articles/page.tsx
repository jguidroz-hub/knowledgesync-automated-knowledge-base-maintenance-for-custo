'use client';
import { useState } from 'react';
import Link from 'next/link';

type Article = { id: string; title: string; category: string; lastUpdated: string; views: number; helpfulness: number; status: 'current' | 'stale' | 'outdated' | 'draft'; staleDays?: number; suggestions?: string[]; };

const DEMO: Article[] = [
  { id: '1', title: 'How to Reset Your Password', category: 'Account', lastUpdated: '3 days ago', views: 2340, helpfulness: 94, status: 'current' },
  { id: '2', title: 'API Rate Limits & Quotas', category: 'Developer', lastUpdated: '45 days ago', views: 1890, helpfulness: 72, status: 'stale', staleDays: 45, suggestions: ['Rate limits changed in v3.2', 'New enterprise tier not documented'] },
  { id: '3', title: 'Billing & Subscription FAQ', category: 'Billing', lastUpdated: '2 days ago', views: 3210, helpfulness: 88, status: 'current' },
  { id: '4', title: 'Setting Up SSO with Okta', category: 'Security', lastUpdated: '90 days ago', views: 560, helpfulness: 45, status: 'outdated', staleDays: 90, suggestions: ['Okta deprecated v1 API', 'Screenshots show old UI', 'Missing SCIM provisioning steps'] },
  { id: '5', title: 'Webhook Configuration Guide', category: 'Developer', lastUpdated: '12 days ago', views: 1120, helpfulness: 81, status: 'stale', staleDays: 12, suggestions: ['New event types added in Feb release'] },
  { id: '6', title: 'Data Export & GDPR Compliance', category: 'Security', lastUpdated: '1 day ago', views: 890, helpfulness: 91, status: 'current' },
  { id: '7', title: 'Getting Started with Integrations', category: 'Getting Started', lastUpdated: '60 days ago', views: 4500, helpfulness: 67, status: 'outdated', staleDays: 60, suggestions: ['Zapier integration deprecated', 'New native integrations not listed'] },
];

const statusColors: Record<string,string> = { current:'bg-green-100 text-green-700', stale:'bg-yellow-100 text-yellow-700', outdated:'bg-red-100 text-red-700', draft:'bg-gray-100 text-gray-500' };

export default function ArticlesPage() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? DEMO : DEMO.filter(a => a.status === filter);
  const staleCount = DEMO.filter(a => a.status === 'stale' || a.status === 'outdated').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">← Dashboard</Link>
          <h1 className="font-bold text-lg">📚 Knowledge Base Health</h1>
          {staleCount > 0 && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">{staleCount} need attention</span>}
        </div>
        <button className="px-4 py-2 bg-black text-white text-sm rounded-lg">🔄 Run Sync Check</button>
      </header>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border p-4"><p className="text-xs text-gray-400 uppercase">Total Articles</p><p className="text-2xl font-bold">{DEMO.length}</p></div>
          <div className="bg-white rounded-xl border p-4"><p className="text-xs text-green-500 uppercase">Current</p><p className="text-2xl font-bold text-green-600">{DEMO.filter(a=>a.status==='current').length}</p></div>
          <div className="bg-white rounded-xl border p-4"><p className="text-xs text-yellow-500 uppercase">Stale</p><p className="text-2xl font-bold text-yellow-600">{DEMO.filter(a=>a.status==='stale').length}</p></div>
          <div className="bg-white rounded-xl border p-4"><p className="text-xs text-red-500 uppercase">Outdated</p><p className="text-2xl font-bold text-red-600">{DEMO.filter(a=>a.status==='outdated').length}</p></div>
        </div>
        <div className="flex gap-2 mb-4">
          {['all','current','stale','outdated'].map(s=>(
            <button key={s} onClick={()=>setFilter(s)} className={`px-3 py-1.5 text-xs rounded-lg font-medium capitalize ${filter===s?'bg-black text-white':'bg-white border text-gray-600'}`}>{s==='all'?'All Articles':s}</button>
          ))}
        </div>
        <div className="space-y-3">
          {filtered.map(article=>(
            <div key={article.id} className="bg-white rounded-xl border p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{article.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[article.status]}`}>{article.status}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                    <span>📁 {article.category}</span>
                    <span>✏️ {article.lastUpdated}</span>
                    <span>👁 {article.views.toLocaleString()} views</span>
                    <span>👍 {article.helpfulness}% helpful</span>
                  </div>
                </div>
              </div>
              {article.suggestions && article.suggestions.length > 0 && (
                <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5">
                  <p className="text-xs font-medium text-amber-800 mb-1">🤖 AI Suggestions:</p>
                  <ul className="text-xs text-amber-700 space-y-0.5">
                    {article.suggestions.map((s,i)=><li key={i}>• {s}</li>)}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
