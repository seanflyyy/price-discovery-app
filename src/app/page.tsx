"use client";

import {useState} from "react";
import {UrlForm} from "@/components/UrlForm";
import {ResponseDisplay} from "@/components/ResponseDisplay";
import {Alert, AlertDescription} from "@/components/ui/alert";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [response, setResponse] = useState<any | null>(null);

  const handleSubmit = async (url: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/query-data", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({url}),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch data");
      }

      setResponse(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 gap-8 max-w-7xl mx-auto w-full">
      <div className="w-full space-y-4">
        <h1 className="text-4xl font-bold text-center">
          Product Price Explorer
        </h1>
        <p className="text-gray-500 text-center max-w-2xl mx-auto">
          Enter a website URL to extract and analyze product pricing data
        </p>
      </div>

      <div className="w-full max-w-xl mx-auto">
        <UrlForm onSubmit={handleSubmit} isLoading={loading} />
      </div>

      {error && (
        <Alert variant="destructive" className="max-w-xl w-full">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {response && (
        <div className="w-full">
          <ResponseDisplay response={response} />
        </div>
      )}
    </main>
  );
}
