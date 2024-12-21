import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { ArrowRight } from "lucide-react"

export function Login() {
  const { startTrial, signInWithGoogle, signInWithGithub } = useAuth()
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Welcome to DuDil</CardTitle>
          <CardDescription>Start analyzing with a free trial</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button 
            variant="default" 
            className="w-full"
            onClick={() => startTrial()}
          >
            Start 7-Day Free Trial
            <ArrowRight className="ml-2 h-4 w-4" />
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
            <Button variant="outline" onClick={() => signInWithGoogle()}>
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline" onClick={() => signInWithGithub()}>
              <Icons.gitHub className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}