import './App.css';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './config/router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SnackbarConfig } from './config/snackbar.config';

function App() {
  return (
    <React.Fragment>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <SnackbarConfig>
          <RouterProvider router={router} />
        </SnackbarConfig>
      </GoogleOAuthProvider>
    </React.Fragment>
  );
}

export default App;
