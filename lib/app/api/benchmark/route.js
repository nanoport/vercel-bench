import { NextResponse } from 'next/server';
import { benchmarks } from '@/lib/benchmarks';

// This ensures the function is executed dynamically on every request.
export const dynamic = 'force-dynamic';

export async function GET(request) {
  const results = {};
  
  // Always run in "lite mode" for serverless environment to avoid timeouts.
  // Vercel Hobby tier has a 10s timeout by default.
  const isLiteMode = true; 

  for (const benchmark of benchmarks) {
    try {
      const result = benchmark.test(isLiteMode);
      results[benchmark.name] = result;
    } catch (error) {
      results[benchmark.name] = {
        duration: 0,
        result: 'Error',
        opsPerSecond: 0,
        description: 'Test failed to run on the server.',
        error: error.message,
      };
    }
  }

  const systemInfo = {
    // Vercel provides these environment variables
    platform: 'Vercel Serverless Function',
    region: process.env.VERCEL_REGION || 'Unknown',
    nodeVersion: process.version,
    arch: process.arch,
    timestamp: new Date().toISOString()
  };

  return NextResponse.json({ results, systemInfo });
}
