import React, { Component } from 'react';
// import Card from './Card.js';
import StationOnMap from './StationOnMap.js';
import axios from 'axios';

const MARTA_URL = 'http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=2c514350-0c26-47dd-b872-7936af81c8e1';
const STATIONS = {
                    'AIRPORT STATION': [],
                    'ART CENTER STATION': [],
                    'ASHBY STATION': [],
                    'AVONDALE STATION': [],
                    'BANKHEAD STATION': [],
                    'BROOKHAVEN STATION': [],
                    'BUCKHEAD STATION': [],
                    'CHAMBLEE STATION': [],
                    'CIVIC CENTER STATION': [],
                    'COLLEGE PARK STATION': [],
                    'DECATUR STATION': [],
                    'PEACHTREE CENTER STATION': [],
                    'DORAVILLE STATION': [],
                    'DUNWOODY STATION': [],
                    'EAST LAKE STATION': [],
                    'EDGEWOOD STATION': [],
                    'FIVE POINTS STATION': [],
                    'GARNETT STATION': [],
                    'H. E. HOLMES STATION': [],
                    'INDIAN CREEK STATION': [],
                    'KENSINGTON STATION': [],
                    'KING MEMORIAL STATION': [],
                    'LENOX STATION': [],
                    'LINDBERGH CENTER STATION': [],
                    'MEDICAL CENTER STATION': [],
                    'MIDTOWN STATION': [],
                    'NORTH AVENUE STATION': [],
                    'NORTH SPRINGS STATION': [],
                    'OAKLAND CITY STATION': [],
                    'SANDY SPRINGS STATION': [],
                    'WEST END STATION': [],
                    'WEST LAKE STATION': []
                    }


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
            emptyArray: 0
        };
    }

    componentWillMount() {
        this.martaDataGrabber = setInterval( () => {
            getMartaData().then((jsonData) => {
                let trainObjectArray = []
                let emptySignal = [{DESTINATION: 'No trains available at this time.', NEXT_ARR: ' '}]
                jsonData.map((trainObject) => {
                    if (trainObject.DIRECTION === this.props.direction && trainObject.STATION === this.props.station) {
                        trainObjectArray.push(trainObject)
                    }
                    // console.log(trainObject);
                    return trainObject;
                })
                if (trainObjectArray.length > 0) {
                    if (trainObjectArray.length >= this.state.martaData.length || trainObjectArray[0].DIRECTION !== this.state.martaData[0].DIRECTION) {
                        this.setState({
                            martaData: trainObjectArray,
                            emptyArray: 0
                        });
                        // console.log('************************ HELLO HELLO', this.state.martaData)
                    }
                } else if (trainObjectArray.length === 0) {
                    let size = this.state.emptyArray + 1;
                    this.setState({
                        emptyArray: size
                    })
                    if (this.state.emptyArray >= 3) {
                        this.setState({
                            martaData: emptySignal
                        })
                    }
                }
            })
            this.setState({
                localTime: new Date()
            })
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.martaDataGrabber);
    }

    // renderStation = () => {
    //     console.log('station')
    //     STATION_LIST.map( (station, idx) => {
    //         console.log(station)
    //         return (
    //             <div key={idx}>
    //                 <StationOnMap station={station}/>
    //             </div>
    //         )
    //     }
    // )
    // }

    render() {
        return (
            <div className='row'>
                <div className='style-me'>
                    {/*
                    right now this is mapping through the static
                    station list-- but the part that actually needs
                    to be live/checking-- is if received trainObjects
                    have the same station ID as the current station.
                    if trainObject.station === STATIONS[trainObject.station]:
                        STATIONS[trainObject.station].push(trainObject.train_id)
                    if trainObject.station === STATION_LIST[i] {
                       then append that trainObject's TRAIN_ID
                       to the STATION_ON_MAP div.
                       can you make headings values in a dictionary?
                    
                    }
                    hm this is making me think that each station on map
                    should be a dictionary with all of the train_ids.
                    */}
                    {Object.keys(STATIONS).map( (station, idx) => {
                        return (
                            <div key={idx}>
                                <StationOnMap station={station}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

}

export default BigMap;