interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-20">
      <div className="text-5xl mb-4">🛰️</div>
      <h3 className="text-xl font-semibold text-white mb-2">Something went wrong</h3>
      <p className="text-slate-400 mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2.5 bg-cyan-500 text-slate-900 font-medium rounded-lg hover:bg-cyan-400 transition"
      >
        Try again
      </button>
    </div>
  );
}