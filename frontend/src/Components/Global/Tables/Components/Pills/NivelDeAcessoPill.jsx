import React from 'react';

const NivelDeAcessoPill = ({ children }) => {
  let bgColor, textColor;

  if (children == 'Administrador') {
    bgColor = 'bg-blue-300 dark:bg-blue-900';
    textColor = 'text-blue-900 dark:text-blue-200';
  } else if (children == 'Moderador') {
    bgColor = 'bg-slate-300 dark:bg-slate-900';
    textColor = 'text-slate-900 dark:text-slate-200';
  } else {
    bgColor = 'bg-green-300 dark:bg-green-900';
    textColor = 'text-green-900 dark:text-green-200';
  }

  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full ${bgColor} ${textColor}`}>
      {children}
    </span>
  );
};

export default NivelDeAcessoPill;