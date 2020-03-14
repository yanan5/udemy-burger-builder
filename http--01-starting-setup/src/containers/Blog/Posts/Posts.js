import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import "./Posts.css";

class Posts extends Component {
  state = {
    posts: []
  };
  componentDidMount() {
    axios
      .get("/posts")
      .then(res => {
        const posts = res.data.slice(0, 4);
        const updatedPosts = posts.map(post => ({ ...post, author: "Max" }));
        this.setState({ posts: updatedPosts });
      })
      .catch(err => console.log("get error", err));
  }
  postSelectedHandler = id => this.setState({ selectedPostId: id });
  render() {
    const posts = this.state.posts.map(post => (
      <Post
        clicked={() => this.postSelectedHandler(post.id)}
        key={post.id}
        {...post}
      />
    ));
    return (<section className="Posts">{posts}</section>);
  }
}

export default Posts;
