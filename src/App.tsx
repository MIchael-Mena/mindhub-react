import './App.css';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './config/router';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.Fragment>
  );
}

export default App;
