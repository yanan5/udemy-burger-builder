import React, { Component } from "react";
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";
import FullPost from "./FullPost/FullPost";
import { Route, NavLink, Switch } from "react-router-dom";
import "./Blog.css";

class Blog extends Component {
  render() {
    return (
      <div className="Blogs">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink exact activeClassName="nav-active" to="/">
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
          <Route exact path="/" component={Posts} />
          <Route exact path="/new-post" component={NewPost} />
          <Route exact path="/:id" component={FullPost} />
        </Switch>
        
      </div>
    );
  }
}

export default Blog;
