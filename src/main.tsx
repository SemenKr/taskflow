import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.scss';
import { App } from './App.tsx'; // 👈 подключаем глобальные стили

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
