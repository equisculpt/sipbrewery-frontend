export type Scheme = {
  scheme_code: string;
  name: string;
  category?: string;
  amc?: string;
};

export type Period = '1M'|'3M'|'6M'|'1Y'|'2Y'|'3Y'|'5Y'|'MAX';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

function authHeaders(): Record<string, string> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export async function getSchemes(): Promise<{ schemes: Scheme[]; total_count: number; categories: string[] }>{
  const res = await fetch(`${BASE_URL}/api/mutual-funds/schemes`);
  if (!res.ok) throw new Error('Failed to fetch schemes');
  const json = await res.json();
  return json.data || json; // backend wraps in { data: { ... } }
}

export async function getChart(schemeCode: string, period: Period = '1Y') {
  const res = await fetch(`${BASE_URL}/api/mutual-funds/chart/${encodeURIComponent(schemeCode)}?period=${period}` , { headers: authHeaders() as HeadersInit });
  if (!res.ok) throw new Error('Failed to fetch chart');
  const json = await res.json();
  return json.data || json;
}

export async function compareSchemes(schemes: string[], period: Period = '1Y') {
  const res = await fetch(`${BASE_URL}/api/mutual-funds/compare`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() } as HeadersInit,
    body: JSON.stringify({ schemes, period })
  });
  if (!res.ok) throw new Error('Failed to compare schemes');
  const json = await res.json();
  return json.data || json;
}

export async function getTopPerformers(category = 'ALL', period: Period = '1Y', limit = 10) {
  const q = new URLSearchParams({ category, period, limit: String(limit) });
  const res = await fetch(`${BASE_URL}/api/mutual-funds/top-performers?${q.toString()}`, { headers: authHeaders() as HeadersInit });
  if (!res.ok) throw new Error('Failed to fetch top performers');
  const json = await res.json();
  return json.data || json;
}

export async function getTechnicalAnalysis(schemeCode: string, period: Period = '1Y') {
  const res = await fetch(`${BASE_URL}/api/mutual-funds/technical-analysis/${encodeURIComponent(schemeCode)}?period=${period}`, { headers: authHeaders() as HeadersInit });
  if (!res.ok) throw new Error('Failed to fetch technical analysis');
  const json = await res.json();
  return json.data || json;
}

export async function analyzePortfolio(portfolio: { scheme_code: string; allocation: number }[], period: Period = '1Y') {
  const res = await fetch(`${BASE_URL}/api/mutual-funds/portfolio-analysis`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() } as HeadersInit,
    body: JSON.stringify({ portfolio, period })
  });
  if (!res.ok) throw new Error('Failed to analyze portfolio');
  const json = await res.json();
  return json.data || json;
}
