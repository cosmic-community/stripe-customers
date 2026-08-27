export default function CustomersLoading() {
  return (
    <div className="bg-stripe-bg min-h-screen">
      <div className="max-w-[1080px] mx-auto px-6 py-20">
        <div className="h-12 w-64 bg-stripe-divider rounded animate-pulse mb-4" />
        <div className="h-6 w-96 bg-stripe-divider rounded animate-pulse mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg overflow-hidden border border-stripe-divider"
            >
              <div className="aspect-[16/9] bg-stripe-divider animate-pulse" />
              <div className="p-6 space-y-3">
                <div className="h-5 w-3/4 bg-stripe-divider rounded animate-pulse" />
                <div className="h-4 w-full bg-stripe-divider rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-stripe-divider rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}