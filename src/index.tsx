import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { getCLS, getFID, getLCP } from 'web-vitals'

function sendToAnalytics(metric: any) {
  const body = JSON.stringify(metric)
  // Use `navigator.sendBeacon()` or fetch
  navigator.sendBeacon('/analytics', body)
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getLCP(sendToAnalytics)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);