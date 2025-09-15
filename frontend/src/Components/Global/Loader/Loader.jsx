import React from 'react';
import styles from './Loader.module.css';

export default function Loader({ containerClassName, w = 56, h = 56 }) {
  return (
    <div className={containerClassName}>
      <div 
        className={`${styles.spinner}`} 
        style={{
          width: `${w}px`,
          height: `${h}px`,
        }}
      >

      </div>
    </div>
  );
}