import type { NewsItem } from '../types/news';

interface FeaturedSliderProps {
  items: NewsItem[];
}

export function FeaturedSlider({ items }: FeaturedSliderProps) {
  if (items.length === 0) return null;

  const featured = items.slice(0, 6); // show first 6

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold text-white mb-4 px-1">Featured</h2>

      <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
        {featured.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="snap-start shrink-0 w-[85%] sm:w-[320px] group"
          >
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-800">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-xs font-medium text-cyan-400">{item.news_site}</span>
                <h3 className="text-white font-semibold line-clamp-2 mt-1 group-hover:text-cyan-300 transition">
                  {item.title}
                </h3>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}