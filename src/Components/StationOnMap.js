import React from 'react';
// import BigMap from './BigMap.js';

const StationOnMap = (props) => {
    const trainData = props.trains || [];
    const trains = trainData.map( (train, idx) => {
        return (
            <p key={idx}>{train}</p>
        )
    })
    return (
        <div>
            <h3 className='little-station'>{props.station}</h3>
            {trains}
        </div>
    )
}

export default StationOnMap;