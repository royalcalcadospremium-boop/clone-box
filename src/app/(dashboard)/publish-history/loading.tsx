export default function PublishHistoryLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-8 w-56 skeleton rounded-lg" />
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-20 skeleton rounded-2xl" />
        ))}
      </div>
    </div>
  )
}
