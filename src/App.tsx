import React from 'react';
import './App.css';
import AppRoutes from './routes'
import styles from 'styles.module.css';

function App() {
  return (
    <div className={styles.main}>
      <AppRoutes />
    </div>
  );
}

export default App;
