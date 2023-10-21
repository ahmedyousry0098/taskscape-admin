import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './components/Redux/Store';
import { ToastContainer } from 'react-toastify';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ToastContainer/>
    <App />
    </Provider>
  </React.StrictMode>
);