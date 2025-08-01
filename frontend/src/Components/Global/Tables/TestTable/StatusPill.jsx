// src/StatusPill.jsx
import React from 'react';

const StatusPill = ({ quantity }) => {
  let bgColor, textColor;

  if (quantity > 20) {
    bgColor = 'bg-green-100 dark:bg-green-900';
    textColor = 'text-green-800 dark:text-green-200';
  } else if (quantity > 10) {
    bgColor = 'bg-yellow-100 dark:bg-yellow-900';
    textColor = 'text-yellow-800 dark:text-yellow-200';
  } else {
    bgColor = 'bg-red-100 dark:bg-red-900';
    textColor = 'text-red-800 dark:text-red-200';
  }

  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full ${bgColor} ${textColor}`}>
      {quantity} PCS
    </span>
  );
};

export default StatusPill;