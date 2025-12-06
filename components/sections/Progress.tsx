export default function Progress() {
  return (
    <section id="progress" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Build Progress</h2>
        <p className="section-subtitle">Watch our timber frame house come to life</p>
        
        <div className="max-w-3xl mx-auto mt-12">
          {[
            { phase: 'Site Preparation', status: 'complete' },
            { phase: 'Foundation', status: 'complete' },
            { phase: 'Timber Frame', status: 'active' },
            { phase: 'Roof & Walls', status: 'upcoming' },
            { phase: 'Off-Grid Systems', status: 'upcoming' },
          ].map((item, idx) => (
            <div key={idx} className={`flex items-center mb-6 ${item.status === 'active' ? 'scale-105' : ''}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                item.status === 'complete' ? 'bg-green-500 text-white' :
                item.status === 'active' ? 'bg-secondary-500 text-white animate-pulse' :
                'bg-gray-300 text-gray-600'
              }`}>
                {item.status === 'complete' ? '✓' : idx + 1}
              </div>
              <div className="ml-4 flex-1">
                <div className="font-bold text-lg">{item.phase}</div>
                <div className="text-gray-600 capitalize">{item.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
