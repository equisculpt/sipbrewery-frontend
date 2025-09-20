export type ReportFormat = 'PDF' | 'CSV';

export type ReportKey =
  | 'performance'
  | 'tax'
  | 'transactions'
  | 'risk'
  | 'allocation'
  | 'goals'
  | 'dividend'
  | 'expense'
  | 'cashflow'
  | 'sip_schedule'
  | 'holdings_snapshot'
  | 'sector_allocation'
  | 'xirr_statement';

export const REPORT_TYPES: { key: ReportKey; label: string; description: string }[] = [
  { key: 'performance', label: 'Performance', description: 'Time-weighted returns, CAGR, drawdowns.' },
  { key: 'tax', label: 'Capital Gains & Tax', description: 'Short/long-term gains with tax lots.' },
  { key: 'transactions', label: 'Transactions', description: 'All buys, sells, SIPs and corporate actions.' },
  { key: 'risk', label: 'Risk & Drawdown', description: 'Volatility, max DD, VaR and risk metrics.' },
  { key: 'allocation', label: 'Allocation & Drift', description: 'Current weights vs target, drift and rebalance.' },
  { key: 'goals', label: 'Goal Progress', description: 'Goal timelines, funding status, probability bands.' },
  { key: 'dividend', label: 'Dividend Ledger', description: 'Dividend credits and yields by instrument.' },
  { key: 'expense', label: 'Expense Ratio Drift', description: 'Expense impact across funds over time.' },
  { key: 'cashflow', label: 'Cashflow Calendar', description: 'Monthly inflows/outflows and SIP schedule.' },
  { key: 'sip_schedule', label: 'SIP Schedule', description: 'Upcoming SIPs, holidays and proration.' },
  { key: 'holdings_snapshot', label: 'Holdings Snapshot', description: 'Positions, quantities, average price, P&L.' },
  { key: 'sector_allocation', label: 'Sector Allocation', description: 'Sector and industry exposures with weights.' },
  { key: 'xirr_statement', label: 'XIRR Statement', description: 'Cashflow-based return statement.' },
];

export async function exportReport(
  key: ReportKey,
  format: ReportFormat = 'PDF',
  meta?: Record<string, unknown>
) {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : undefined;
    const response = await fetch('/api/reports/export', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ reportType: key, format, meta })
    });
    if (!response.ok) throw new Error('Export failed');
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${key}_report.${format.toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return { ok: true };
  } catch (error) {
    console.error('Export error:', error);
    return { ok: false, error } as const;
  }
}
