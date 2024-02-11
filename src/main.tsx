import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeConfig } from './config/theme.config.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import './index.css';
import 'dayjs/locale/en';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // El strict mode ayuda a detectar problemas en la aplicacion en modo desarrollo
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
