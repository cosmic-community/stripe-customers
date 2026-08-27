const stats = [
  { value: '99+', label: 'Customer stories' },
  { value: '135+', label: 'Currencies supported' },
  { value: '50+', label: 'Countries served' },
  { value: 'Millions', label: 'Businesses powered' },
]

export default function StatsBand() {
  return (
    <section className="border-y border-stripe-divider bg-white">
      <div className="max-w-[1080px] mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl md:text-4xl font-bold text-stripe-navy tracking-tight">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-stripe-slate">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}