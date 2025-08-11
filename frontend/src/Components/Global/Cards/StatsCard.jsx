import React, { useContext } from 'react'

const StatsCard = ({title, quant, children}) => {
    return (
        <div className="bg-[var(--admin-stats-card)] shadow-md rounded-md p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-[var(--admin-stats-card-text)] mb-1">{title}</p>
            <p className="text-[var(--admin-stats-card-text)] text-2xl font-bold mb-1">{quant}</p>
            { children }
        </div>
    );
}

export default StatsCard;