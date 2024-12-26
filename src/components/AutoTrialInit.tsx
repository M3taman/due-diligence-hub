import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Icons } from "./ui/icons"
import { useToast } from "./ui/use-toast"
import { startTrial } from "@/lib/supabase/auth"
import { AUTH_CONFIG } from "@/lib/auth/constants"

export function AutoTrialInit() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initTrial = async () => {
      try {
        await startTrial()
        navigate(AUTH_CONFIG.ROUTES.TRIAL[0])
      } catch (error) {
        console.error('Trial init error:', error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to start trial. Please refresh the page."
        })
      } finally {
        setIsLoading(false)
      }
    }

    initTrial()
  }, [navigate, toast])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return null
}