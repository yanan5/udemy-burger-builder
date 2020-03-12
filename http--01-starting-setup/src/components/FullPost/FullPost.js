import React, { Component } from "react";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    selectedPost: null
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== -1 && this.props.id !== prevProps.id) {
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${this.props.id}`)
        .then(res =>
          this.setState({
            selectedPost: res.data
          })
        );
    }
  }
  deletePostHandler = () => {
      axios.delete(`https://jsonplaceholder.typicode.com/posts/${this.props.id}`)
      .then(res => console.log('deleted', res))
  };
  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    const { selectedPost } = this.state;
    if (this.props.id !== -1 && selectedPost) {
      post = (
        <div className="FullPost">
          <h1>{selectedPost.title}</h1>
          <p>{selectedPost.body}</p>
          <div className="Edit">
            <button className="Delete" onClick={this.deletePostHandler}>
              Delete
            </button>
          </div>
        </div>
      );
    }

    return post;
  }
}

export default FullPost;
