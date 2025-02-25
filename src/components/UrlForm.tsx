"use client";

import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface UrlFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export function UrlForm({ onSubmit, isLoading }: UrlFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      onSubmit(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 w-full max-w-xl">
      <Input
        type="url"
        placeholder="Enter website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1"
        required
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Query'}
      </Button>
    </form>
  );
}