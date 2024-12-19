import { render, screen, fireEvent } from '@testing-library/react';
import { ChartControls } from './ChartControls';
import { ChartProvider } from './ChartContext';

describe('ChartControls', () => {
  it('renders theme selector', () => {
    render(
      <ChartProvider>
        <ChartControls />
      </ChartProvider>
    );
    
    expect(screen.getByText('Theme')).toBeInTheDocument();
  });

  it('toggles animation', () => {
    render(
      <ChartProvider>
        <ChartControls />
      </ChartProvider>
    );
    
    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-checked', 'false');
  });
});