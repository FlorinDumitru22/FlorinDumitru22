export default function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Project Gallery</h2>
        <p className="section-subtitle">Visual journey of our build</p>
        
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-video bg-gradient-to-br from-primary-200 to-primary-400 rounded-lg shadow-md hover:shadow-xl transition flex items-center justify-center">
              <span className="text-6xl">🏗️</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
