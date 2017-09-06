import React, { Component } from 'react';
import StationOnMap from './StationOnMap.js';
import axios from 'axios';

const MARTA_URL = 'http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=2c514350-0c26-47dd-b872-7936af81c8e1';

const getMartaData = () => {
    return axios.get(MARTA_URL)
        .then( (res) => {
            // console.log(res);
            return res.data;
        })
    }

class BigMap extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='row'>
                <div className='style-me'>
                    I'LL BE THE BIG MAP
                </div>
            </div>
        )
    }

}

export default BigMap;