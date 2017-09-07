import React, { Component } from 'react';
// import Card from './Card.js';
import StationOnMap from './StationOnMap.js';
import axios from 'axios';

const MARTA_URL = 'http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=2c514350-0c26-47dd-b872-7936af81c8e1';
// const STATION_DICT = {
//                     'AIRPORT STATION': [],
//                     'ART CENTER STATION': [],
//                     'ASHBY STATION': [],
//                     'AVONDALE STATION': [],
//                     'BANKHEAD STATION': [],
//                     'BROOKHAVEN STATION': [],
//                     'BUCKHEAD STATION': [],
//                     'CHAMBLEE STATION': [],
//                     'CIVIC CENTER STATION': [],
//                     'COLLEGE PARK STATION': [],
//                     'DECATUR STATION': [],
//                     'PEACHTREE CENTER STATION': [],
//                     'DORAVILLE STATION': [],
//                     'DUNWOODY STATION': [],
//                     'EAST LAKE STATION': [],
//                     'EDGEWOOD STATION': [],
//                     'FIVE POINTS STATION': [],
//                     'GARNETT STATION': [],
//                     'H. E. HOLMES STATION': [],
//                     'INDIAN CREEK STATION': [],
//                     'KENSINGTON STATION': [],
//                     'KING MEMORIAL STATION': [],
//                     'LENOX STATION': [],
//                     'LINDBERGH CENTER STATION': [],
//                     'MEDICAL CENTER STATION': [],
//                     'MIDTOWN STATION': [],
//                     'NORTH AVENUE STATION': [],
//                     'NORTH SPRINGS STATION': [],
//                     'OAKLAND CITY STATION': [],
//                     'SANDY SPRINGS STATION': [],
//                     'WEST END STATION': [],
//                     'WEST LAKE STATION': []
//                     }

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
        this.state = {
            martaData: [],
            localTime: new Date(),
            emptyArray: 0,
            stations: {}
        };
    }

    componentWillMount() {
        this.intervalSetter = setInterval( () => {
            getMartaData().then((jsonData) => {
                let trainIdArray = [];
                let latestStations = {};
                jsonData.forEach((trainObject) => {
                    // debugger;
                    if (Object.keys(latestStations).includes(trainObject.STATION)) {
                        latestStations[trainObject.STATION].push(trainObject.TRAIN_ID);
                    } else {
                        latestStations[trainObject.STATION] = [trainObject.TRAIN_ID];
                    }
                });
                // console.log(STATION_DICT);
                this.setState({
                    localTime: new Date(),
                    stations: latestStations
                })
            }, 1000);
        });
    }

    componentWillUnmount() {
        clearInterval(this.intervalSetter);
    }

    render() {
        return (
                <div>
                    {Object.keys(this.state.stations).map( (station, idx) => {
                        return (
                            <div key={idx}>
                                <StationOnMap station={station} trains={this.state.stations[station]} />
                            </div>
                        )
                    })}
                </div>
        )
    }
}

export default BigMap;