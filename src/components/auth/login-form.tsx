import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { ArrowRight } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { startTrial, signInWithProvider } = useAuth()
  const navigate = useNavigate()

  const handleTrial = async () => {
    try {
      setIsLoading(true)
      await startTrial()
      toast({
        title: "Trial started",
        description: "Welcome to your 7-day free trial!"
      })
      navigate("/dashboard")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to start trial. Please try again."
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    try {
      setIsLoading(true)
      await signInWithProvider(provider)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Authentication error",
        description: `Failed to sign in with ${provider}`
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Welcome to DuDil</CardTitle>
        <CardDescription>Start analyzing with a free trial</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button 
          variant="default" 
          className="w-full"
          onClick={handleTrial}
          disabled={isLoading}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              Start 7-Day Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            onClick={() => handleOAuthSignIn('google')}
            disabled={isLoading}
          >
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleOAuthSignIn('github')}
            disabled={isLoading}
          >
            <Icons.gitHub className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}