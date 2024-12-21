import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingProps {
  size?: "sm" | "md" | "lg"
  className?: string
  text?: string
}

export function Loading({ 
  size = "md", 
  className,
  text 
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  }

  return (
    <div className="flex items-center gap-2">
      <Loader2 
        className={cn(
          `animate-spin ${sizeClasses[size]}`,
          className
        )} 
      />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  )
}