export default function IntegrationsLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-8 w-48 skeleton rounded-lg" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 skeleton rounded-2xl" />
        ))}
      </div>
    </div>
  )
}
