import { ExternalLink, type LucideIcon } from "lucide-react"

interface LinkCardProps {
  name: string
  description: string
  url: string
  icon: LucideIcon
}

export function LinkCard({ name, description, url, icon: Icon }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-6 rounded-lg border border-border bg-card hover:bg-accent transition-all duration-200 hover:shadow-lg"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-md bg-muted group-hover:bg-background transition-colors">
          <Icon className="h-5 w-5" />
        </div>
        <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <h4 className="font-medium mb-1 group-hover:text-primary transition-colors">{name}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </a>
  )
}
