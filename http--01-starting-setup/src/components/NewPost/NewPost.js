import React, { Component } from "react";
import axios from "axios";
import "./NewPost.css";

class NewPost extends Component {
  state = {
    title: "",
    body: "",
    author: "Max",
    addErr: null
  };

  addPostHandler = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", this.state)
      .then(res => console.log(res))
      
      .catch(err =>
        this.setState({ addErr: err }, () => {
          setTimeout(() => this.setState({ addErr: null }), 3000)
        })
      );
  };
  render() {
    return (
      <div className="NewPost">
        {this.state.addErr && <p style={{ textAlign: "center", color: "red" }}>
          Error Adding Post!
        </p>}
        <h1>Add a Post</h1>
        <label>Title</label>
        <input
          type="text"
          value={this.state.title}
          onChange={event => this.setState({ title: event.target.value })}
        />
        <label>Content</label>
        <textarea
          rows="4"
          value={this.state.body}
          onChange={event => this.setState({ body: event.target.value })}
        />
        <label>Author</label>
        <select
          value={this.state.author}
          onChange={event => this.setState({ author: event.target.value })}
        >
          <option value="Max">Max</option>
          <option value="Manu">Manu</option>
        </select>
        <button onClick={this.addPostHandler}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;
