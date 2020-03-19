import React, { Component } from "react";
import { withRouter } from "react-router-dom";
class Course extends Component {
  render() {
    const search = this.props.location.search.substr(0);
    const value = search.split("=")[1]
     console.log(this.props)
    return (
      <div>
        <h1>{decodeURIComponent(value)}</h1>
        <p>You selected the Course with ID: {this.props.match.params.id}</p>
      </div>
    );
  }
}

export default withRouter(Course);
