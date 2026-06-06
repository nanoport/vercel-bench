import os from 'node:os';

export const dynamic = 'force-dynamic';

export function GET() {
  return Response.json({
    limitMB: process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE ?? 'n/a',
    totalmemMB: Math.round(os.totalmem() / 1e6),
    freememMB: Math.round(os.freemem() / 1e6),
    usage: process.memoryUsage(),
    region: process.env.VERCEL_REGION ?? 'n/a',
  });
}
