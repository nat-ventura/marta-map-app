import React, { Component } from 'react';
import ProjectItem from './ProjectItem';

class Projects extends Component {
  render() {
    let projectItems;
    if(this.props.projects){
        projectItems = this.props.projects.map(project => {
            // console.log(project);
            return (
                <ProjectItem key={project.title} project={project} />
            )
        });
    }
    return (
      <div className="Projects">
          {projectItems}
        {/* {this.props.test} */}
      </div>
      // everything has to be inside one div-- or one main element
    // all of our projects will be held in state (not from an api or database..
    // where it would normally be)
    );
  }
}

export default Projects;
