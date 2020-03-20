import React, { Component } from "react";
class Course extends Component {
  render() {
    const search = this.props.location.search.substr(0);
    const value = search.split("=")[1]
    return (
      <div>
        <h1>{decodeURIComponent(value)}</h1>
        <p>You selected the Course with ID: {this.props.match.params.id}</p>
      </div>
    );
  }
}

export default Course;
