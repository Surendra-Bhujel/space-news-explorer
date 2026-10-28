import type { NewsType } from '../constants/api';

interface TabsProps {
  active: NewsType;
  onChange: (type: NewsType) => void;
}

const tabs: { id: NewsType; label: string }[] = [
  { id: 'articles', label: 'Articles' },
  { id: 'blogs', label: 'Blogs' },
  { id: 'reports', label: 'Reports' },
];

export function Tabs({ active, onChange }: TabsProps) {
  return (
    <div className="flex justify-center gap-2 mt-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            active === tab.id
              ? 'bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/25'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}