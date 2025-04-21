import React from "react";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="bg-gradient-to-b from-slate-100 to-white min-h-screen text-gray-800">
      <header className="text-center py-6 shadow bg-white sticky top-0 z-10">
        <h1 className="text-3xl font-bold tracking-wide">
          📊 Real-Time Sentiment Dashboard
        </h1>
      </header>
      <main className="w-full px-4 space-y-6">
        <Dashboard />
      </main>
    </div>
  );
}
