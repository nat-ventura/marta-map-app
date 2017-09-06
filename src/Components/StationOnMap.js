import React, { Component } from 'react';
import Countdown from './Countdown.js';
import Time from './Time.js';
import Destination from './Destination.js';
import axios from 'axios';

const MARTA_URL = 'http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=2c514350-0c26-47dd-b872-7936af81c8e1';

const getMartaData = () => {
    return axios.get(MARTA_URL)
        .then( (res) => {
            // console.log(res);
            return res.data;
        })
    }

class StationOnMap extends Component {
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
                    console.log(trainObject);
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

    render() {
        let trainArrivals = this.state.martaData.map( (trainObject) => {
            return (
                <div className="card">
                    <div className="card-block">
                        <Destination destination={this.props.station} />
                        <Time time={this.props.time}/>
                        <Countdown time={this.props.time} localTime={this.props.localTime}/>
                    </div>
                </div>            )
        });

        return (
            <div className='row'>
                <div className='style-me'>
                    {trainArrivals}
                </div>
            </div>
        )
    }

}

export default StationOnMap;