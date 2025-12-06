export default function Volunteer() {
  return (
    <section id="volunteer" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Volunteer Schedule</h2>
        <p className="section-subtitle">Join us on the build site</p>
        
        <div className="max-w-4xl mx-auto mt-12 grid md:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Upcoming Build Days</h3>
            {[
              { date: 'Dec 7-8', activity: 'Timber Frame Raising', volunteers: '12/20' },
              { date: 'Dec 14-15', activity: 'Roof Panel Prep', volunteers: '8/15' },
            ].map((day, idx) => (
              <div key={idx} className="border-b border-gray-200 py-4 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-primary-700">{day.date}</div>
                    <div className="text-gray-600">{day.activity}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Volunteers</div>
                    <div className="font-bold">{day.volunteers}</div>
                  </div>
                </div>
                <button className="mt-3 btn-primary text-sm px-4 py-2">Sign Up</button>
              </div>
            ))}
          </div>
          
          <div className="card bg-primary-50">
            <h3 className="text-xl font-bold mb-4">What to Expect</h3>
            <ul className="space-y-3 text-gray-700">
              <li>✓ 8:00 AM - 5:00 PM build days</li>
              <li>✓ Lunch and refreshments provided</li>
              <li>✓ Safety equipment supplied</li>
              <li>✓ Expert instruction included</li>
              <li>✓ Accommodation available nearby</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
