'use client';

import React, { useState, useEffect } from 'react';
import { Play, Cpu, Clock, Zap, BarChart3, Server } from 'lucide-react';
import { benchmarks } from '@/lib/benchmarks';

// Helper function to format numbers
const formatNumber = (num) => new Intl.NumberFormat().format(num);

// Results Component
const BenchmarkResults = ({ title, results, systemInfo, icon }) => {
  if (Object.keys(results).length === 0) return null;

  const getPerformanceScore = () => {
    const scores = Object.values(results).map(r => r.opsPerSecond || 0);
    if (scores.length === 0) return 0;
    const totalScore = scores.reduce((sum, score) => sum + (Math.log10(score || 1) * 10000), 0)
    return Math.round(totalScore);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        {icon}
        {title}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-6 bg-gray-50 p-4 rounded-lg">
        {Object.entries(systemInfo).map(([key, value]) => (
            <div key={key}>
              <span className="font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
              <span className="ml-2 text-gray-600">{value}</span>
            </div>
        ))}
         <div>
              <span className="font-medium text-gray-700">Performance Score:</span>
              <span className="ml-2 text-indigo-600 font-semibold">{formatNumber(getPerformanceScore())}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(results).map(([name, result]) => (
          <div key={name} className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white">
            <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
            <p className="text-xs text-gray-500 mb-3 h-8">{result.description}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-600">Duration:</span> <span className="font-medium">{result.duration.toFixed(2)}ms</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Ops/Second:</span> <span className="font-medium text-indigo-600">{formatNumber(result.opsPerSecond)}</span></div>
              {result.error && <div className="text-red-600 text-xs">Error: {result.error}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Page Component
export default function HomePage() {
  const [clientIsRunning, setClientIsRunning] = useState(false);
  const [serverIsRunning, setServerIsRunning] = useState(false);
  const [clientResults, setClientResults] = useState({});
  const [serverResults, setServerResults] = useState({});
  const [clientSystemInfo, setClientSystemInfo] = useState({});
  const [serverSystemInfo, setServerSystemInfo] = useState({});
  
  useEffect(() => {
    setClientSystemInfo({
      userAgent: navigator.userAgent.substring(0, 40) + '...',
      platform: navigator.platform,
      cores: navigator.hardwareConcurrency || 'N/A',
      memory: navigator.deviceMemory ? `${navigator.deviceMemory}GB` : 'N/A',
    });
  }, []);

  const runClientBenchmarks = async () => {
    setClientIsRunning(true);
    setClientResults({});
    const newResults = {};

    // Use a short timeout to allow UI to update
    for (const benchmark of benchmarks) {
        await new Promise(resolve => setTimeout(resolve, 50));
        const result = benchmark.test(true); // Always lite mode for quick client test
        newResults[benchmark.name] = result;
        setClientResults({ ...newResults });
    }
    
    setClientIsRunning(false);
  };
  
  const runServerBenchmarks = async () => {
    setServerIsRunning(true);
    setServerResults({});
    setServerSystemInfo({});
    try {
      const response = await fetch('/api/benchmark');
      if (!response.ok) throw new Error(`Server responded with ${response.status}`);
      const data = await response.json();
      setServerResults(data.results);
      setServerSystemInfo(data.systemInfo);
    } catch (error) {
      console.error("Server benchmark failed:", error);
      setServerSystemInfo({ error: "Failed to fetch results from server." });
    }
    setServerIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Cpu className="w-12 h-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">CPU Benchmark</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Compare your machine's performance against a Vercel Serverless Function.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Client-Side Benchmark */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
              Client-Side (Your CPU)
            </h2>
            <p className="text-gray-600 mb-6">This test runs in your browser and measures your local machine's performance.</p>
            <button
              onClick={runClientBenchmarks}
              disabled={clientIsRunning || serverIsRunning}
              className="w-full px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {clientIsRunning ? <><Clock className="w-5 h-5 animate-spin" /><span>Running...</span></> : <><Play className="w-5 h-5" /><span>Run Your CPU Benchmark</span></>}
            </button>
          </div>
          
          {/* Server-Side Benchmark */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Server className="w-6 h-6 mr-3 text-purple-600" />
              Server-Side (Vercel CPU)
            </h2>
            <p className="text-gray-600 mb-6">This test runs on a Vercel server and measures its vCPU performance.</p>
            <button
              onClick={runServerBenchmarks}
              disabled={clientIsRunning || serverIsRunning}
              className="w-full px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all bg-purple-600 text-white hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {serverIsRunning ? <><Clock className="w-5 h-5 animate-spin" /><span>Running...</span></> : <><Zap className="w-5 h-5" /><span>Run Vercel CPU Benchmark</span></>}
            </button>
          </div>
        </div>
        
        {/* Results Sections */}
        <BenchmarkResults title="Your CPU Results" results={clientResults} systemInfo={clientSystemInfo} icon={<BarChart3 className="w-6 h-6 mr-3 text-blue-600" />} />
        <BenchmarkResults title="Vercel CPU Results" results={serverResults} systemInfo={serverSystemInfo} icon={<Server className="w-6 h-6 mr-3 text-purple-600" />} />

      </div>
    </div>
  );
}
