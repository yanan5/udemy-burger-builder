import React from "react";
import PizzaImage from "../components/PizzaImage/PizzaImage";

class Pizza extends React.Component {
  render() {
    return (
      <div>
        <h1>The Pizza</h1>
        <PizzaImage />
      </div>
    );
  }
}

export default Pizza;
