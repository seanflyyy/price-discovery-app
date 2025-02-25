"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface WebsiteInputProps {
  onWebsitesSubmit: (websites: string[]) => void;
}

export const WebsiteInput = ({ onWebsitesSubmit }: WebsiteInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [websites, setWebsites] = useState<string[]>([]);

  const handleAddWebsite = () => {
    if (inputValue && isValidUrl(inputValue)) {
      setWebsites([...websites, inputValue]);
      setInputValue('');
    }
  };

  const handleSubmit = () => {
    if (websites.length > 0) {
      onWebsitesSubmit(websites);
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter website URL"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleAddWebsite}>Add</Button>
      </div>
      <div className="flex flex-col gap-2">
        {websites.map((website, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="flex-1 truncate">{website}</span>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setWebsites(websites.filter((_, i) => i !== index))}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
      {websites.length > 0 && (
        <Button onClick={handleSubmit} className="mt-4">
          Collect Pricing Data
        </Button>
      )}
    </div>
  );
};