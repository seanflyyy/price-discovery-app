export interface ApiResponse {
  data?: any;
  error?: string;
  status: 'success' | 'error';
  timestamp: string;
}