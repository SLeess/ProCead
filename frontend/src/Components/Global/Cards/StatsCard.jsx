import React, { useContext } from 'react'

const StatsCard = ({title, quant, children}) => {
    return (
        <div id='card-container'>
            <p id='card-title'>{title}</p>
            <p id='card-quant'>{quant}</p>
            { children }
        </div>
    );
}

export default StatsCard;