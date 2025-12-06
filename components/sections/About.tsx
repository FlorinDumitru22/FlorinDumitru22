export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">About Our Project</h2>
        <p className="section-subtitle">Building a sustainable future in the Carpathian Mountains</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {[
            { icon: '🏗️', title: 'Timber Construction', desc: 'Traditional timber frame using sustainable Carpathian wood' },
            { icon: '⚡', title: 'Off-Grid Living', desc: 'Completely self-sufficient with solar, rainwater, and natural heating' },
            { icon: '👥', title: 'Community Funded', desc: 'Built by and for the community to inspire sustainable living' },
            { icon: '🌿', title: 'Eco Design', desc: 'Minimal environmental impact with natural materials and renewable energy' },
          ].map((feature, idx) => (
            <div key={idx} className="card text-center">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-primary-700">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
