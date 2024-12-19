import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Mail, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");

interface NewsletterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewsletterModal({ open, onOpenChange }: NewsletterModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate email
      emailSchema.parse(email);

      const { error } = await supabase.functions.invoke('subscribe-newsletter', {
        body: { 
          email,
          timestamp: new Date().toISOString(),
          source: 'website_modal'
        }
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Please check your email to confirm your subscription.",
      });

      onOpenChange(false);
      setEmail("");
    } catch (err) {
      setError(err instanceof z.ZodError ? err.errors[0].message : 'Failed to subscribe. Please try again.');
      toast({
        variant: "destructive",
        title: "Error",
        description: error,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Subscribe to Our Newsletter
          </DialogTitle>
          <DialogDescription>
            Get weekly insights on market analysis and investment opportunities.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className={error ? "border-destructive" : ""}
            />
            {error && <p className="text-sm text-destructive mt-1">{error}</p>}
          </div>
          <div className="text-sm text-muted-foreground">
            By subscribing, you agree to our privacy policy and terms of service.
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              'Subscribe'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}