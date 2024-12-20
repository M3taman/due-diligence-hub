import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "./alert"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed bottom-0 right-0 z-50 m-8 flex flex-col gap-2">
      {toasts.map(({ id, title, description, type }) => (
        <Alert key={id} variant={type}>
          {title && <AlertTitle>{title}</AlertTitle>}
          {description && <AlertDescription>{description}</AlertDescription>}
        </Alert>
      ))}
    </div>
  )
}
