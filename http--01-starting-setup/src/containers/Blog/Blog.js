import React, { Component } from "react";
import axios from "../../axios";
import "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: -1
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
    return (
      <div className="Blogs">
        <header>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/new-post">New Post</a></li>
            </ul>
          </nav>
        </header>
        <section className="Posts">{posts}</section>
      </div>
    );
  }
}

export default Blog;
