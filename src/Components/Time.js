import React from 'react';

const Time = ({time}) => {
    let hourMin = time.slice(0, 5);
    let ampm = time.slice(8, 11);
    let newTime = hourMin + ampm;
    return <h3 className='card-subtitle'>{newTime}</h3>
}

export default Time;