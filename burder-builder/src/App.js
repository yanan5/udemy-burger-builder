import React from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

class App extends React.Component {
  state = { show: true };
  componentDidMount() {
    setTimeout(() => this.setState({ show: false }), 5000);
  }
  render() {
    return (
      <div>
        <Layout>{this.state.show && <BurgerBuilder />}</Layout>
      </div>
    );
  }
}

export default App;
