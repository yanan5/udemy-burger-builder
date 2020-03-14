import React, { Component } from "react";
import Posts from "./Posts/Posts";
import NewPost from './NewPost/NewPost';
import { Route, NavLink } from "react-router-dom";
import "./Blog.css";

class Blog extends Component {
  render() {
    return (
      <div className="Blogs">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/new-post">New Post</NavLink>
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
