import React from 'react';
import styles from './Loader.module.css';

export default function Loader({ containerClassName }) {
  return (
    <div className={containerClassName}>
      <div className={styles.spinner}></div>
    </div>
  );
}