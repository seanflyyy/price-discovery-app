/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse {
  data?: any;
  error?: string;
  status: "success" | "error";
  timestamp: string;
}

export type PricingData = any;
