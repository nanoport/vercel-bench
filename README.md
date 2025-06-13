# Vercel CPU & Client-Side Benchmark Tool

This is a Next.js application designed to benchmark CPU performance. It provides two distinct tests:

1.  **Client-Side Benchmark:** Runs a series of computational tests directly in the user's browser to measure the performance of their local machine.
2.  **Server-Side Benchmark:** Executes the same tests within a Vercel Serverless Function to measure the performance of the Vercel vCPU environment.

This tool is an excellent starting point for understanding the performance characteristics of serverless environments compared to local machines.

## Features

-   **Dual Benchmarking:** Test both client and server environments side-by-side.
-   **Comprehensive Tests:** Includes tests for prime numbers, Fibonacci sequence, mathematical operations, array sorting, and matrix multiplication.
-   **Vercel Optimized:** Built with Next.js and serverless functions for easy, one-click deployment to Vercel.
-   **Clear UI:** Clean, responsive interface built with Tailwind CSS to display results and system information.
-   **Performance Score:** Calculates a simple, comparable score for both client and server results.

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/)
-   **UI Library:** [React](https://reactjs.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Deployment:** [Vercel](https://vercel.com/)

---

## How it Works

### Client-Side Benchmark

When you click "Run Your CPU Benchmark", the JavaScript code defined in `lib/benchmarks.js` is executed directly in your browser. The performance measured is that of your own computer's CPU, as managed by your web browser.

### Server-Side Benchmark

When you click "Run Vercel CPU Benchmark", the frontend makes a `GET` request to the `/api/benchmark` API route. This route is a Vercel Serverless Function. The function, running on Vercel's infrastructure, executes the same benchmark code from `lib/benchmarks.js`. The results and basic server environment details are then sent back to the client to be displayed.

**Note:** The server-side tests are designed to be lightweight to run within the Vercel Hobby tier's execution time limit (10 seconds by default).

---

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/vercel-cpu-benchmark.git
cd vercel-cpu-benchmark
```

### 2. Install Dependencies

Using npm, yarn, or pnpm:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Deployment

The easiest way to deploy this application is to use the Vercel Platform.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fvercel-cpu-benchmark&project-name=vercel-cpu-benchmark&repository-name=vercel-cpu-benchmark)

Simply click the button above, and Vercel will guide you through cloning the repository to your own GitHub/GitLab/Bitbucket account and deploying it. No configuration is needed.
