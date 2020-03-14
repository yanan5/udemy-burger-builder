import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import { Link } from "react-router-dom";
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
  render() {
    const posts = this.state.posts.map(post => (
      <Link key={post.id} to={`/${post.id}`}>
        <Post {...post} />
      </Link>
    ));
    const Posts = props => <section className="Posts">{posts}</section>;
    const PostsWithSpinner = withSpinner(Posts, this.state.posts.length);
    return <PostsWithSpinner />;
  }
}

export default Posts;
