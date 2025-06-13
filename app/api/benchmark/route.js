import { NextResponse } from 'next/server';
import { primeTest, fibonacciTest, mathTest, sortTest, matrixTest } from '@/lib/benchmarks';

// This ensures the function is executed dynamically on every request.
export const dynamic = 'force-dynamic';

export async function GET(request) {
  // Always run in "lite mode" for serverless environment to avoid timeouts.
  const isLiteMode = true;

  // We run a custom, even "lighter" set of tests here to avoid timeouts on the Hobby tier.
  const results = {
    'Prime Numbers': primeTest(isLiteMode),
    'Fibonacci': fibonacciTest(isLiteMode),
    'Math Operations': mathTest(isLiteMode, 100000), // Reduced from 200k for safety
    'Array Sorting': sortTest(isLiteMode),
    'Matrix Multiplication': matrixTest(isLiteMode, 60), // Significantly reduced from 80
  };

  const systemInfo = {
    platform: 'Vercel Serverless Function',
    region: process.env.VERCEL_REGION || 'Unknown',
    nodeVersion: process.version,
    arch: process.arch,
    memory: process.env.VERCEL_MEMORY ? `${process.env.VERCEL_MEMORY}MB` : 'Default',
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json({ results, systemInfo });
}
