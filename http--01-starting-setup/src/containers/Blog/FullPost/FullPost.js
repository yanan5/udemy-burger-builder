import React, { Component } from "react";
import axios from "axios";
import Spinner from '../../../hoc/Spinner/Spinner'
import "./FullPost.css";

class FullPost extends Component {
  state = {
    selectedPost: null,
    deleteErr: null
  };
  componentDidMount() {
    const id = this.props.match.params.id
      axios
        .get(`/posts/${id}`)
        .then(res =>
          this.setState({
            selectedPost: res.data
          })
        )
        .catch(err =>
          this.setState({ deleteErr: err }, () => {
            setTimeout(() => this.setState({ deleteErr: null }), 3000)
          })
        );
    
  }
  deletePostHandler = () => {
    axios
      .delete(`/posts/${this.props.id}`)
      .then(res => console.log("deleted", res))
      .catch(err =>
        this.setState({ deleteErr: err }, () => {
          setTimeout(() => this.setState({ deleteErr: null }), 3000)
        })
      );
  };
  render() {
    const { selectedPost, deleteErr } = this.state;
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (deleteErr !== null) {
      post = (
        <p style={{ textAlign: "center", color: "red" }}>
          Error Deleting Post!
        </p>
      );
    }
    if(selectedPost === null) {
      post = <Spinner />
    }
    if (selectedPost !== null && deleteErr === null) {
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
