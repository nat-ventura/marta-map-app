import React, { Component } from 'react';

class ProjectItem extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="Project">
          <strong>{this.props.project.title}</strong>: {this.props.project.category}
      </div>
    // everything has to be inside one div-- or one main element
    // all of our projects will be held in state (not from an api or database..
    // where it would normally be)
    // in jsx you can't use class as an attribute or form-- has to be html form
    );
  }
}

export default ProjectItem;
