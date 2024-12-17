import { toast } from "@/components/ui/use-toast";

export type ErrorWithMessage = {
  message: string;
  code?: string;
  details?: unknown;
};

export const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
};

export const toErrorWithMessage = (error: unknown): ErrorWithMessage => {
  if (isErrorWithMessage(error)) return error;
  
  try {
    if (error instanceof Error) {
      return { message: error.message };
    }

    return { message: JSON.stringify(error) };
  } catch {
    return { message: 'An unexpected error occurred' };
  }
};

export const handleError = (error: unknown) => {
  const errorWithMessage = toErrorWithMessage(error);
  
  // Log error to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error details:', errorWithMessage);
  }

  // Show user-friendly toast
  toast({
    variant: "destructive",
    title: "Error",
    description: errorWithMessage.message,
  });

  // Here you would typically also log to your error tracking service
  // Example: Sentry.captureException(error);
};