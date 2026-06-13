import { statfs } from 'node:fs/promises';

export const dynamic = 'force-dynamic';

async function diskFor(path) {
  try {
    const s = await statfs(path);
    const totalMB = Math.round((s.blocks * s.bsize) / 1e6);
    const freeMB = Math.round((s.bfree * s.bsize) / 1e6);
    const availMB = Math.round((s.bavail * s.bsize) / 1e6);
    return { path, totalMB, freeMB, availMB, usedMB: totalMB - freeMB };
  } catch (error) {
    return { path, error: error.message };
  }
}

export async function GET() {
  const [tmp, task] = await Promise.all([diskFor('/tmp'), diskFor('/var/task')]);
  return Response.json({
    tmp,
    task,
    region: process.env.VERCEL_REGION ?? 'n/a',
  });
}
