import React, { Component } from 'react';
import Projects from './Components/Projects';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    }
  }

  componentWillMount(){
    this.setState({projects: [
      {
        title: 'business website',
        category: 'web design'
      },
      {
        title: 'social app',
        category: 'mobile development'
      },
      {
        title: 'ecommerce shopping',
        category: 'web development'
      }
    ]})
  }
  // better to use this function than to leave it in the constructor

  render() {
    return (
      <div className="App">
        this will be a marta map
        <Projects projects={this.state.projects}/>
      </div>
      // everything has to be inside one div-- or one main element
    );
  }
}

export default App;
