import { useState } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { Tabs } from './components/Tabs';
import { NewsCard } from './components/NewsCard';
import { FeaturedSlider } from './components/FeaturedSlider';
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
    <div className="min-h-screen bg-[#020617] text-slate-100">
      {/* Sticky header */}
      <div className="sticky top-0 z-40 bg-[#020617]/85 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <Header />
          <div className="mt-5">
            <SearchBar value={searchInput} onChange={setSearchInput} />
          </div>
          <div className="mt-5">
            <Tabs active={activeTab} onChange={setActiveTab} />
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Featured Slider - only show when not searching and not loading */}
        {!loading && !error && !debouncedSearch && items.length > 0 && (
          <FeaturedSlider items={items} />
        )}

        {/* Count */}
        {!loading && !error && items.length > 0 && (
          <p className="text-sm text-slate-500 mb-6">
            Showing <span className="text-slate-300">{items.length}</span> of{' '}
            <span className="text-slate-300">{totalCount.toLocaleString()}</span>
          </p>
        )}

        {error && <ErrorState message={error} onRetry={refetch} />}

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!loading && !error && items.length === 0 && <EmptyState />}

        {!loading && !error && items.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>

            {nextUrl && (
              <div className="mt-12 text-center">
                {loadingMore ? (
                  <LoadingSpinner />
                ) : (
                  <button
                    onClick={loadMore}
                    className="px-8 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl font-medium transition-all hover:border-cyan-500/50"
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