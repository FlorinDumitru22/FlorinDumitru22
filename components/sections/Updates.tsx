export default function Updates() {
  return (
    <section id="updates" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Project Updates</h2>
        <p className="section-subtitle">Latest news from the build site</p>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {[
            { date: 'Dec 1, 2024', title: 'Foundation Complete!', excerpt: 'We\'ve finished laying the foundation for our timber frame house.' },
            { date: 'Nov 25, 2024', title: 'Solar Panels Ordered', excerpt: 'Thanks to supporters, we\'ve ordered a 10kW solar panel system.' },
            { date: 'Nov 18, 2024', title: 'Community Build Weekend', excerpt: 'Over 30 volunteers joined us for the foundation prep.' },
          ].map((update, idx) => (
            <div key={idx} className="card">
              <div className="text-sm text-gray-500 mb-2">{update.date}</div>
              <h3 className="text-xl font-bold mb-3 text-primary-700">{update.title}</h3>
              <p className="text-gray-600">{update.excerpt}</p>
              <button className="mt-4 text-primary-600 hover:text-primary-800 font-semibold">Read More →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
