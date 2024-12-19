import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ChartErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: undefined,
    errorInfo: undefined
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    // Log to error tracking service
    console.error('Chart error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined
    });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Card className="p-4 my-4 bg-red-50 border-red-200">
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <AlertCircle className="w-5 h-5" />
            <h3 className="font-semibold">Chart Failed to Load</h3>
          </div>
          <p className="text-red-600 text-sm mb-4">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={this.handleRetry}
          >
            Try Again
          </Button>
        </Card>
      );
    }

    return this.props.children;
  }
}