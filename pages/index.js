import React, { Component } from "react";

import Link from "next/link";
import Router from "next/router";

class Index extends Component {
  static async getInitialProps(context) {
    const promise = new Promise((resolve, reject) =>
      setTimeout(() => resolve({ appName: "Super App using promise" }), 5000)
    );
    return promise;
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
