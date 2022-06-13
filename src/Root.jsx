import React from 'react';
import { CookiesProvider } from 'react-cookie';
import App from './App';

export default Root = () => {
  return (
    <CookiesProvider>
      <App />
    </CookiesProvider>
  );
}
