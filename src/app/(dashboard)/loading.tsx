export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-8 w-48 skeleton rounded-lg" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 skeleton rounded-2xl" />
        ))}
      </div>
      <div className="h-64 skeleton rounded-2xl" />
    </div>
  )
}
