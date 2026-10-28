import type { NewsItem } from '../types/news';

interface NewsCardProps {
  item: NewsItem;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function NewsCard({ item }: NewsCardProps) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-slate-800/60 border border-slate-700/50 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
    >
      <div className="aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={item.image_url}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80';
          }}
        />
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-400">
            {item.news_site}
          </span>
          <span className="text-xs text-slate-500">{formatDate(item.published_at)}</span>
        </div>

        <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-cyan-300 transition-colors">
          {item.title}
        </h3>

        <p className="mt-2 text-sm text-slate-400 line-clamp-3">{item.summary}</p>
      </div>
    </a>
  );
}