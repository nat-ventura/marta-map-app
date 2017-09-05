import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import Dashboard from './Components/Dashboard.js';
import './styles/main.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.setState({
      station: "FIVE POINTS STATION",
      direction: "S"
  });
  }
  // better to use this function than to leave it in the constructor

  render() {
    return (
      <div className="App">
        <div>
        <Autocomplete
          items = {[
            { id: 'AIRPORT STATION', label: 'AIRPORT STATION' },
            { id: 'ART CENTER STATION', label: 'ART CENTER STATION' },
            { id: 'ASHBY STATION', label: 'ASHBY STATION' },
            { id: 'AVONDALE STATION', label: 'AVONDALE STATION' },
            { id: 'BANKHEAD STATION', label: 'BANKHEAD STATION' },
            { id: 'BROOKHAVEN STATION', label: 'BROOKHAVEN STATION' },
            { id: 'BUCKHEAD STATION', label: 'BUCKHEAD STATION' },
            { id: 'CHAMBLEE STATION', label: 'CHAMBLEE STATION' },
            { id: 'CIVIC CENTER STATION', label: 'CIVIC CENTER STATION' },
            { id: 'COLLEGE PARK STATION', label: 'COLLEGE PARK STATION' },
            { id: 'DECATUR STATION', label: 'DECATUR STATION' },
            { id: 'PEACHTREE CENTER STATION', label: 'PEACHTREE CENTER STATION' },
            { id: 'DORAVILLE STATION', label: 'DORAVILLE STATION' },
            { id: 'DUNWOODY STATION', label: 'DUNWOODY STATION' },
            { id: 'EAST LAKE STATION', label: 'EAST LAKE STATION' },
            { id: 'EDGEWOOD STATION', label: 'EDGEWOOD STATION' },
            { id: 'Five Points', label: 'FIVE POINTS STATION' },
            { id: 'GARNETT STATION', label: 'GARNETT STATION' },
            { id: 'H. E. HOLMES STATION', label: 'H. E. HOLMES STATION' },
            { id: 'INDIAN CREEK STATION', label: 'INDIAN CREEK STATION' },
            { id: 'KENSINGTON STATION', label: 'KENSINGTON STATION' },
            { id: 'KING MEMORIAL STATION', label: 'KING MEMORIAL STATION' },
            { id: 'LENOX STATION', label: 'LENOX STATION' },
            { id: 'LINDBERGH CENTER STATION', label: 'LINDBERGH CENTER STATION' },
            { id: 'MEDICAL CENTER STATION', label: 'MEDICAL CENTER STATION' },
            { id: 'MIDTOWN STATION', label: 'MIDTOWN STATION' },
            { id: 'NORTH AVENUE STATION', label: 'NORTH AVENUE STATION' },
            { id: 'NORTH SPRINGS STATION', label: 'NORTH SPRINGS STATION' },
            { id: 'OAKLAND CITY STATION', label: 'OAKLAND CITY STATION' },
            { id: 'SANDY SPRINGS STATION', label: 'SANDY SPRINGS STATION' },
            { id: 'WEST END STATION', label: 'WEST END STATION' },
            { id: 'WEST LAKE STATION', label: 'WEST LAKE STATION' },
            { id: 'bar', label: 'bar' },
            { id: 'baz', label: 'baz' }
          ]}
          shouldItemRender = { (item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1 }
          getItemValue= { item => item.label }
          renderItem={ (item, highlighted) =>
            <div
              key = {item.id}
              style={
                { backgroundColor: highlighted ? '#eee' : 'transparent' }
              }
            >
              {item.label}
            </div>
          }
          ref='input'
          value={this.state.station}
          onChange={ e => this.setState({ station: e.target.value })}
          onSelect={ station => this.setState({ station })}
          onFocus={(e) => { console.log(this.refs.input)}}
          />
        </div>
        <div className="style-me">
          <Dashboard direction={this.state.direction} station={this.state.station}/>
        </div>
      </div>
    );
  }
  _update = (event) => {
    this.setState({
      direction: event.target.value,
    })
  }
}


export default App;
