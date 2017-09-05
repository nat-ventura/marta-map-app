import React, { Component } from 'react';
import Countdown from './Countdown.js';
import Time from './Time.js';
import Destination from './Destination.js';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="card">
                <div className="card-block">
                    <Destination destination={this.props.station} />
                    <Time time={this.props.time}/>
                    <Countdown time={this.props.time} localTime={this.props.localTime}/>
                </div>
            </div>
        )
    }
}

export default Card;