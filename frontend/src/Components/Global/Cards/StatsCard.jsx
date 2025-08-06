import React, { useContext } from 'react'

const StatsCard = ({title, quant, children}) => {
    return (
        <div className="bg-[var(--stats-card)] shadow-md rounded-md p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-[var(--stats-card-text)] mb-1">{title}</p>
            <p className="text-[var(--stats-card-text)] text-2xl font-bold mb-1">{quant}</p>
            { children }
        </div>
    );
}

export default StatsCard;