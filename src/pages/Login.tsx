import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          setIsLoading(true);
          try {
            // Create or update user profile
            const { error } = await supabase
              .from('user_profiles')
              .upsert({
                id: session?.user.id,
                email: session?.user.email,
                last_sign_in: new Date().toISOString()
              });

            if (error) throw error;

            toast({
              title: "Welcome back!",
              description: "You have successfully signed in."
            });
            navigate("/dashboard");
          } catch (error) {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Failed to update profile."
            });
          } finally {
            setIsLoading(false);
          }
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been signed out successfully."
          });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/50">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Welcome to dudil</h1>
          <p className="text-muted-foreground">
            Sign in to access your due diligence workspace
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'rgb(var(--primary))',
                    brandAccent: 'rgb(var(--primary-foreground))'
                  }
                }
              }
            }}
            providers={["google", "github"]}
            redirectTo={`${window.location.origin}/auth/callback`}
            onlyThirdPartyProviders={false}
            localization={{
              variables: {
                sign_in: {
                  email_label: "Email address",
                  password_label: "Password"
                }
              }
            }}
          />
        )}

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            By signing in, you agree to our{" "}
            <a href="/terms" className="underline hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline hover:text-primary">
              Privacy Policy
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;