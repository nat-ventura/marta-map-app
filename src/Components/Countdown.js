import React from 'react';

const Countdown = ({time, localTime}) => {
    if (time.length === 1) {
        return <div></div>
    }
    // debugger;
    let localTimeString = localTime.toLocaleTimeString() // !!!!!!! ??!?!
    if (localTimeString.length === 10) {
        localTimeString = '0' + localTimeString
    }
    let localHour = parseInt(localTimeString.slice(0, 2), 10);
    let localMin = parseInt(localTimeString.slice(3, 5), 10);
    let localSec = parseInt(localTimeString.slice(6, 8), 10);
    let martaTime = time;
    let martaHour = parseInt(martaTime.slice(0, 2), 10);
    let martaMin = parseInt(martaTime.slice(3, 5), 10);
    let martaSec = 0;
    let secDiff = martaSec - localSec;
    let minDiff = martaMin - localMin;
    let hourDiff = martaHour - localHour;
        if (hourDiff > 0) {
            minDiff = (martaMin + (60 * hourDiff)) - localMin;
        }
        if (secDiff <= 0 && minDiff <= 0) {
            return <h1 className='card-title'>Boarding Now</h1>
        } else if (secDiff < 0) {
            secDiff += 60
        } else if (minDiff < 0) {
            minDiff += 60
        }
        if (secDiff < 10) {
            secDiff = '0' + secDiff
        }
    let countdown = (minDiff) + ':' + (secDiff);
    return <h1 className='card-title'>{countdown}</h1>
}

export default Countdown;