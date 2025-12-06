export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">Join our community or ask questions</p>
        
        <div className="max-w-2xl mx-auto mt-12">
          <form className="card">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-semibold mb-2">Message</label>
              <textarea 
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Tell us how you'd like to get involved..."
              />
            </div>
            <button type="submit" className="btn-primary w-full mt-6">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
