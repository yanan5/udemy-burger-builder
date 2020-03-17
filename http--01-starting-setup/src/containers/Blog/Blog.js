import React, { Component } from "react";
import Posts from "./Posts/Posts";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import asyncComponent from '../../hoc/asyncComponent';

import "./Blog.css";

const AsyncNewPost = asyncComponent(() => import("./NewPost/NewPost"));

class Blog extends Component {
  render() {
    return (
      <div className="Blogs">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink exact activeClassName="nav-active" to="/posts">
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink exact activeClassName="nav-active" to="/new-post">
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route exact path="/new-post" component={AsyncNewPost} />
          <Route path="/posts" component={Posts} />
          <Redirect from="/" to="posts" />
        </Switch>
        
      </div>
    );
  }
}

export default Blog;
