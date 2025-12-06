import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Funding from '@/components/sections/Funding'
import Gallery from '@/components/sections/Gallery'
import Updates from '@/components/sections/Updates'
import Progress from '@/components/sections/Progress'
import Volunteer from '@/components/sections/Volunteer'
import Materials from '@/components/sections/Materials'
import Contact from '@/components/sections/Contact'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Funding />
      <Gallery />
      <Updates />
      <Progress />
      <Volunteer />
      <Materials />
      <Contact />
      <Footer />
    </main>
  )
}
