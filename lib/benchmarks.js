// This file contains the benchmark functions.
// They can be imported and used on both the client-side and server-side.

// Prime number calculation benchmark
export const primeTest = (isLiteMode = true) => {
    const testLimit = isLiteMode ? 10000 : 100000;
    const start = performance.now();
    let primes = [];
    
    for (let i = 2; i <= testLimit; i++) {
      let isPrime = true;
      for (let j = 2; j <= Math.sqrt(i); j++) {
        if (i % j === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) primes.push(i);
    }
    
    const end = performance.now();
    return {
      description: isLiteMode ? 'Finding primes up to 10,000' : 'Finding primes up to 100,000',
      duration: end - start,
      result: primes.length,
      opsPerSecond: Math.round(testLimit / (end - start) * 1000)
    };
  };
  
  // Fibonacci sequence benchmark (iterative is better for consistent measurement)
  export const fibonacciTest = (isLiteMode = true) => {
    const testN = isLiteMode ? 35 : 40;
    const start = performance.now();
  
    const fib = (num) => {
      if (num <= 1) return num;
      return fib(num - 1) + fib(num - 2);
    };
    
    const result = fib(testN);
    const end = performance.now();
    
    return {
      description: `Recursive Fibonacci(${testN})`,
      duration: end - start,
      result: result,
      // A single, heavy operation
      opsPerSecond: Math.round(1 / ((end - start) / 1000)),
    };
  };
  
  // Mathematical operations benchmark
  export const mathTest = (isLiteMode = true) => {
    const testIterations = isLiteMode ? 200000 : 1000000;
    const start = performance.now();
    let result = 0;
    
    for (let i = 0; i < testIterations; i++) {
      result += Math.sin(i) * Math.cos(i) + Math.sqrt(i) + Math.pow(i % 100, 2);
    }
    
    const end = performance.now();
    return {
      description: isLiteMode ? '200K math operations' : '1M math operations',
      duration: end - start,
      result: Math.round(result),
      opsPerSecond: Math.round(testIterations / (end - start) * 1000)
    };
  };
  
  // Array sorting benchmark
  export const sortTest = (isLiteMode = true) => {
    const testSize = isLiteMode ? 25000 : 100000;
    const start = performance.now();
    const arr = Array.from({ length: testSize }, () => Math.floor(Math.random() * 1000000));
    arr.sort((a, b) => a - b);
    
    const end = performance.now();
    return {
      description: isLiteMode ? 'Sorting 25K numbers' : 'Sorting 100K numbers',
      duration: end - start,
      result: arr.length,
      opsPerSecond: Math.round(testSize / (end - start) * 1000)
    };
  };
  
  // Matrix multiplication benchmark
  export const matrixTest = (isLiteMode = true) => {
      // NOTE: Reduced size slightly to better fit within Vercel's Hobby tier timeout.
      const testSize = isLiteMode ? 80 : 150; 
      const start = performance.now();
      
      // Create two random matrices
      const a = Array(testSize).fill().map(() => Array(testSize).fill().map(() => Math.random()));
      const b = Array(testSize).fill().map(() => Array(testSize).fill().map(() => Math.random()));
      const c = Array(testSize).fill().map(() => Array(testSize).fill(0));
      
      // Multiply matrices
      for (let i = 0; i < testSize; i++) {
        for (let j = 0; j < testSize; j++) {
          for (let k = 0; k < testSize; k++) {
            c[i][j] += a[i][k] * b[k][j];
          }
        }
      }
      
      const end = performance.now();
      return {
        description: `${testSize}x${testSize} matrix multiplication`,
        duration: end - start,
        result: `${testSize}x${testSize}`,
        opsPerSecond: Math.round((testSize * testSize * testSize) / (end - start) * 1000)
      };
    };
  
  export const benchmarks = [
      { name: 'Prime Numbers', test: primeTest },
      { name: 'Fibonacci', test: fibonacciTest },
      { name: 'Math Operations', test: mathTest },
      { name: 'Array Sorting', test: sortTest },
      { name: 'Matrix Multiplication', test: matrixTest },
  ];
  