import { LinkCard } from "./link-card"
import { Github, Twitter, Linkedin, BookOpen, Code, Palette, Zap, Globe, Video } from "lucide-react"

const linkCategories = [
  {
    title: "Social",
    links: [
      {
        name: "GitHub",
        description: "My open source projects and contributions",
        url: "https://github.com",
        icon: Github,
      },
      {
        name: "Twitter",
        description: "Thoughts and updates",
        url: "https://twitter.com",
        icon: Twitter,
      },
      {
        name: "LinkedIn",
        description: "Professional network",
        url: "https://linkedin.com",
        icon: Linkedin,
      },
    ],
  },
  {
    title: "Development",
    links: [
      {
        name: "Vercel",
        description: "Deploy and host web applications",
        url: "https://vercel.com",
        icon: Zap,
      },
      {
        name: "MDN Web Docs",
        description: "Web development documentation",
        url: "https://developer.mozilla.org",
        icon: BookOpen,
      },
      {
        name: "Stack Overflow",
        description: "Developer Q&A community",
        url: "https://stackoverflow.com",
        icon: Code,
      },
    ],
  },
  {
    title: "Design",
    links: [
      {
        name: "Dribbble",
        description: "Design inspiration and showcase",
        url: "https://dribbble.com",
        icon: Palette,
      },
      {
        name: "Figma",
        description: "Collaborative design tool",
        url: "https://figma.com",
        icon: Palette,
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        name: "My Blog",
        description: "Articles and tutorials",
        url: "#",
        icon: Globe,
      },
      {
        name: "YouTube",
        description: "Video tutorials and content",
        url: "https://youtube.com",
        icon: Video,
      },
    ],
  },
]

export function LinkSection() {
  return (
    <section id="links" className="space-y-12">
      {linkCategories.map((category) => (
        <div key={category.title}>
          <h3 className="text-2xl font-medium mb-6">{category.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.links.map((link) => (
              <LinkCard key={link.name} {...link} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
