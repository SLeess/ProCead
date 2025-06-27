import React from 'react';
import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">

      <div className={styles.spinner}></div>
      
    </div>
  );
}