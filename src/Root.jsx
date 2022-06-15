import React from 'react';
import { CookiesProvider } from 'react-cookie';
import App from './App';

export default Root = function () {
  return (
    <CookiesProvider>
      <App />
    </CookiesProvider>
  );
};
