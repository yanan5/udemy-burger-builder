import React, { Component } from "react";

import Link from "next/link";
import Router from "next/router";

class Index extends Component {
  static async getInitialProps(context) {
    console.log(context);
    return {appName : "Super App"}
  }
  render() {
    return (
      <div>
        <h1>Hello Next.js</h1>
        <h4>{this.props.appName}</h4>
        <Link href="/auth">
          <a>Auth</a>
        </Link>
        <button onClick={() => Router.push("/auth")}>
          Click to got to Auth
        </button>
      </div>
    );
  }
}

export default Index;
