import React from 'react';
import { Loading } from './loading';

interface LoadingOverlayProps {
  text?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <Loading text={text} variant="spinner" />
    </div>
  );
};

export default LoadingOverlay;
