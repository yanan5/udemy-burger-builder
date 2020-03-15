import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import { withSpinner } from "../../../hoc/Spinner/Spinner";
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
  handlePostClick = id => this.props.history.push({ pathname: `/${id}` });
  render() {
    const posts = this.state.posts.map(post => (
      <Post
        onClick={() => this.handlePostClick(post.id)}
        key={post.id}
        {...post}
      />
    ));
    const Posts = props => <section className="Posts">{posts}</section>;
    const PostsWithSpinner = withSpinner(Posts, this.state.posts.length);
    return <PostsWithSpinner />;
  }
}

export default Posts;
