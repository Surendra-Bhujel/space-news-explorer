export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ENDPOINTS = {
  articles: `${API_BASE_URL}/articles/`,
  blogs: `${API_BASE_URL}/blogs/`,
  reports: `${API_BASE_URL}/reports/`,
} as const;

export type NewsType = keyof typeof ENDPOINTS;

export const PAGE_SIZE = 10;