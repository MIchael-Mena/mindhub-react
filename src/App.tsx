import './App.css';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './config/router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SnackbarConfig } from './config/snackbar.config';

function App() {
  return (
    <React.Fragment>
      <GoogleOAuthProvider clientId="671153607848-ptnqdj96rr20jjvhrtissgq5tog4j0je.apps.googleusercontent.com">
        <SnackbarConfig>
          <RouterProvider router={router} />
        </SnackbarConfig>
      </GoogleOAuthProvider>
    </React.Fragment>
  );
}

export default App;
