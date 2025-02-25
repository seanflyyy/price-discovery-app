import { UsageData } from '@/types';

export class UsageTracker {
  async getUsageData(): Promise<UsageData> {
    try {
      const response = await fetch('/api/usage');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching usage data:', error);
      throw new Error('Failed to fetch usage data');
    }
  }
}