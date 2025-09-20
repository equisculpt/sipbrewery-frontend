import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = (searchParams.get('type') || 'performance').toString();
    const format = (searchParams.get('format') || 'PDF').toString().toUpperCase() as 'PDF' | 'CSV';

    const filename = `${type}-${new Date().toISOString().slice(0, 10)}.${format.toLowerCase()}`;

    if (format === 'CSV') {
      const csv = `report_type,generated_on\n${type},${new Date().toISOString()}\n`;
      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    }

    // Minimal placeholder PDF bytes (NOT a real PDF; replace with actual generation)
    const pdfText = `%PDF-1.4\n%âãÏÓ\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>\nendobj\n4 0 obj\n<< /Length 55 >>\nstream\nBT /F1 24 Tf 72 700 Td (${type.toUpperCase()} REPORT) Tj ET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000010 00000 n \n0000000063 00000 n \n0000000124 00000 n \n0000000220 00000 n \ntrailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n320\n%%EOF`;
    const blob = new Blob([pdfText], { type: 'application/pdf' });

    return new NextResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}
