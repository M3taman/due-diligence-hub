import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Icons } from "./ui/icons"
import { useToast } from "./ui/use-toast"
import { startTrial } from "@/lib/supabase/auth"
import { AUTH_CONFIG } from "@/lib/auth/constants"

// Removed AutoTrialInit related code
// export function AutoTrialInit() {
//   const navigate = useNavigate()
//   const { toast } = useToast()
//   const [isLoading, setIsLoading] = useState(true)
//   const [hasInitialized, setHasInitialized] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const initTrial = async () => {
//       setIsSubmitting(true);
//       try {
//         await startTrial()
//         navigate(AUTH_CONFIG.ROUTES.TRIAL[0])
//       } catch (error: any) {
//         setError(error.message || 'Trial initialization failed.');
//         console.error('Trial init error:', error)
//         toast({
//           variant: "destructive",
//           title: "Error",
//           description: "Failed to start trial. Please refresh the page."
//         })
//       } finally {
//         setIsSubmitting(false);
//         setIsLoading(false)
//       }
//     }

//     if (!hasInitialized) {
//       setHasInitialized(true);
//       initTrial();
//     }
//   }, [navigate, toast, hasInitialized])

//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <Icons.spinner className="h-8 w-8 animate-spin" />
//       </div>
//     )
//   }

//   return null
// }