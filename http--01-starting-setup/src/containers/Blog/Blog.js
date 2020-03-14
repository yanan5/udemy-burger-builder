import React, { Component } from "react";
import Posts from "./Posts/Posts";
import NewPost from './NewPost/NewPost';
import { Route } from "react-router-dom";
import "./Blog.css";

class Blog extends Component {
  render() {
    return (
      <div className="Blogs">
        <header>
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/new-post">New Post</a>
              </li>
            </ul>
          </nav>
        </header>
        <Route exact path="/" component={Posts} />
        <Route exact path="/new-post" component={NewPost} />
      </div>
    );
  }
}

export default Blog;
