// app/customers/[slug]/loading.tsx
export default function CustomerDetailLoading() {
  return (
    <div>
      <div className="w-full h-[40vh] md:h-[55vh] bg-stripe-divider animate-pulse" />
      <div className="max-w-[680px] mx-auto px-6 -mt-16 relative">
        <div className="bg-white rounded-lg shadow-[0_2px_5px_-1px_rgba(50,50,93,0.25),0_1px_3px_-1px_rgba(0,0,0,0.3)] p-8 md:p-12 space-y-4">
          <div className="h-10 w-3/4 bg-stripe-divider rounded animate-pulse" />
          <div className="h-6 w-full bg-stripe-divider rounded animate-pulse" />
          <div className="h-6 w-5/6 bg-stripe-divider rounded animate-pulse" />
        </div>
      </div>
      <div className="max-w-[680px] mx-auto px-6 py-16 space-y-4">
        <div className="h-4 w-full bg-stripe-divider rounded animate-pulse" />
        <div className="h-4 w-full bg-stripe-divider rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-stripe-divider rounded animate-pulse" />
      </div>
    </div>
  )
}