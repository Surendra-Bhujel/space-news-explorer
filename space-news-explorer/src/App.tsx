import { useState } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { Tabs } from './components/Tabs';
import { NewsCard } from './components/NewsCard';
import { SkeletonCard } from './components/SkeletonCard';
import { ErrorState } from './components/ErrorState';
import { EmptyState } from './components/EmptyState';
import { LoadingSpinner } from './components/LoadingSpinner';
import { BackToTop } from './components/BackToTop';
import { useDebounce } from './hooks/useDebounce';
import { useNews } from './hooks/useNews';
import type { NewsType } from './constants/api';

function App() {
  const [activeTab, setActiveTab] = useState<NewsType>('articles');
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 400);

  const { items, loading, loadingMore, error, nextUrl, totalCount, loadMore, refetch } =
    useNews({ type: activeTab, search: debouncedSearch });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Sticky header area */}
      <div className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Header />
          <SearchBar value={searchInput} onChange={setSearchInput} />
          <Tabs active={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Showing count */}
        {!loading && !error && items.length > 0 && (
          <p className="text-sm text-slate-500 mb-6">
            Showing {items.length} of {totalCount.toLocaleString()}
          </p>
        )}

        {/* Error */}
        {error && <ErrorState message={error} onRetry={refetch} />}

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && items.length === 0 && <EmptyState />}

        {/* Cards */}
        {!loading && !error && items.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>

            {/* Load more */}
            {nextUrl && (
              <div className="mt-10 text-center">
                {loadingMore ? (
                  <LoadingSpinner />
                ) : (
                  <button
                    onClick={loadMore}
                    className="px-8 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl font-medium transition"
                  >
                    Load more
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </main>

      <BackToTop />
    </div>
  );
}

export default App;