import { useState, useEffect, useCallback } from 'react';
import { ENDPOINTS, PAGE_SIZE, type NewsType } from '../constants/api';
import type { NewsItem, NewsResponse } from '../types/news';

interface UseNewsParams {
  type: NewsType;
  search: string;
}

export function useNews({ type, search }: UseNewsParams) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);

  const fetchNews = useCallback(
    async (isLoadMore = false) => {
      try {
        if (isLoadMore) {
          setLoadingMore(true);
        } else {
          setLoading(true);
          setError(null);
        }

        const params = new URLSearchParams({
          limit: String(PAGE_SIZE),
          offset: String(isLoadMore ? offset : 0),
        });

        if (search.trim()) {
          params.set('search', search.trim());
        }

        const url = `${ENDPOINTS[type]}?${params.toString()}`;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const data: NewsResponse = await res.json();

        if (isLoadMore) {
          setItems((prev) => [...prev, ...data.results]);
        } else {
          setItems(data.results);
        }

        setNextUrl(data.next);
        setTotalCount(data.count);
        setOffset(isLoadMore ? offset + PAGE_SIZE : PAGE_SIZE);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [type, search, offset]
  );

  // Reset and fetch when type or search changes
  useEffect(() => {
    setOffset(0);
    setItems([]);
    fetchNews(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, search]);

  const loadMore = () => {
    if (nextUrl && !loadingMore) {
      fetchNews(true);
    }
  };

  return {
    items,
    loading,
    loadingMore,
    error,
    nextUrl,
    totalCount,
    loadMore,
    refetch: () => fetchNews(false),
  };
}