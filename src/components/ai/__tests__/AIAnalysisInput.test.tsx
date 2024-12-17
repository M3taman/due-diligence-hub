import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AIAnalysisInput } from '../AIAnalysisInput';

describe('AIAnalysisInput', () => {
  it('renders input and button', () => {
    render(<AIAnalysisInput onSubmit={() => {}} isLoading={false} />);
    
    expect(screen.getByPlaceholderText(/enter company name or topic/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /analyze/i })).toBeInTheDocument();
  });

  it('handles submit correctly', () => {
    const mockSubmit = vi.fn();
    render(<AIAnalysisInput onSubmit={mockSubmit} isLoading={false} />);
    
    const input = screen.getByPlaceholderText(/enter company name or topic/i);
    const button = screen.getByRole('button', { name: /analyze/i });
    
    fireEvent.change(input, { target: { value: 'Test Company' } });
    fireEvent.click(button);
    
    expect(mockSubmit).toHaveBeenCalledWith('Test Company');
  });

  it('disables input and shows loading state when isLoading is true', () => {
    render(<AIAnalysisInput onSubmit={() => {}} isLoading={true} />);
    
    expect(screen.getByPlaceholderText(/enter company name or topic/i)).toBeDisabled();
    expect(screen.getByText(/analyzing/i)).toBeInTheDocument();
  });
});