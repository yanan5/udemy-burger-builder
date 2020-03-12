import React, { Component } from "react";
import axios from "axios";
import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: -1
  };
  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
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
    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
