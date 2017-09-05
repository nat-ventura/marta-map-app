import React, { Component } from 'react';
import Card from './Card.js';

const getMartaData = () => {
    return fetch('http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=2c514350-0c26-47dd-b872-7936af81c8e1', {
        method: 'get'
    }).then( function (res) {
        return res.json()
    }).catch( function (err) {
        alert(err);
    });
}

class Dashboard extends Component {
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
                let new_data = [];
                let emptySignal = [{DESTINATION: 'No trains available at this time.', NEXT_ARR: ' '}];
                jsonData.map( (data) => {
                    if (data.DIRECTION == this.props.direction && data.STATION == this.props.station) {
                        new_data.push(data)
                    }
                    return data;
                })
                if (new_data.length > 0) {
                    if (new_data.length >= this.state.martaData.length || new_data[0].DIRECTION != this.state.martaData[0].DIRECTION) {
                        this.setState({
                            martaData: new_data,
                            emptyArray: 0
                        });
                    }
                } else if (new_data.length == 0) {
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
        clearInterval( this.martaDataGrabber);
    }

    render() {
        let martaOutput = this.state.martaData.map( (item) => {
            return (
                <Card station={item.DESTINATION} time={item.NEXT_ARR} localTime={this.state.localTime}/>
            )
        });

        return (
            <div className='row'>
                <div className='style-me'>
                    {martaOutput}
                </div>
            </div>
        )
    }

}

export default Dashboard;