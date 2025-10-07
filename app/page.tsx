import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { LinkSection } from "@/components/link-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <Hero />
        <LinkSection />
      </main>
      <Footer />
    </div>
  )
}
