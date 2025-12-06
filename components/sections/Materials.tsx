export default function Materials() {
  return (
    <section id="materials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Materials & Costs</h2>
        <p className="section-subtitle">Transparent breakdown of project expenses</p>
        
        <div className="max-w-4xl mx-auto mt-12">
          <div className="card">
            <h3 className="text-xl font-bold mb-6">Budget Allocation</h3>
            <div className="space-y-4">
              {[
                { category: 'Timber & Materials', budgeted: 28000, spent: 25500 },
                { category: 'Solar System', budgeted: 15000, spent: 14800 },
                { category: 'Foundation', budgeted: 12000, spent: 12000 },
                { category: 'Tools & Equipment', budgeted: 8000, spent: 6200 },
                { category: 'Labor & Professional Services', budgeted: 22000, spent: 8500 },
              ].map((item, idx) => {
                const percentage = (item.spent / item.budgeted) * 100
                return (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{item.category}</span>
                      <span className="text-gray-600">€{item.spent.toLocaleString()} / €{item.budgeted.toLocaleString()}</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${percentage >= 100 ? 'bg-red-500' : percentage >= 80 ? 'bg-yellow-500' : 'bg-green-500'}`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
