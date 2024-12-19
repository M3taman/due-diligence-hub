import React, { createContext, useContext, useState } from 'react';

interface ChartOptions {
  theme: 'light' | 'dark';
  colors: {
    primary: string;
    secondary: string;
    grid: string;
  };
  animation: boolean;
}

const defaultOptions: ChartOptions = {
  theme: 'light',
  colors: {
    primary: '#8884d8',
    secondary: '#82ca9d',
    grid: '#f0f0f0'
  },
  animation: true
};

const ChartContext = createContext<{
  options: ChartOptions;
  setOptions: (options: Partial<ChartOptions>) => void;
}>({
  options: defaultOptions,
  setOptions: () => {}
});

export const ChartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [options, setOptionsState] = useState(defaultOptions);

  const setOptions = (newOptions: Partial<ChartOptions>) => {
    setOptionsState({ ...options, ...newOptions });
  };

  return (
    <ChartContext.Provider value={{ options, setOptions }}>
      {children}
    </ChartContext.Provider>
  );
};

export const useChartOptions = () => useContext(ChartContext);