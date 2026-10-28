export function LoadingSpinner() {
  return (
    <div className="flex justify-center py-8">
      <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}