import React, { ReactNode } from 'react';
import { toast } from 'react-toastify';
import ErrorPage from './errorPage';

interface ErrorBoundaryProps {
  children: ReactNode; // Define the children prop type
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    toast.error('An unexpected error occurred!');
  }

  handleRetry = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) return <ErrorPage />;
    return this.props.children; // Render children if no error
  }
}

export default ErrorBoundary;
