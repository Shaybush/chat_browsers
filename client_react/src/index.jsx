import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppRoutes from './AppRoutes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="147486987874-arr7g0b2u38drkrjrg5ri67gm731vr8r.apps.googleusercontent.com">
    <AppRoutes>
      <App />
    </AppRoutes>
  </GoogleOAuthProvider>
);
reportWebVitals();
