import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeConfig } from './config/theme.config.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/en';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // El strict mode puede causar que useState se ejecute dos veces
  <React.StrictMode>
    <Provider store={store}>
      <ThemeConfig>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
          <App />
        </LocalizationProvider>
      </ThemeConfig>
    </Provider>
  </React.StrictMode>
);
