import React, { Component } from "react";
import { connect } from "react-redux";

import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";

const Counter = ({ counter, onInc, onDec, onInc5, onDec5 }) => (
  <div>
    <CounterOutput value={counter} />
    <CounterControl label="Increment" clicked={onInc} />
    <CounterControl label="Decrement" clicked={onDec} />
    <CounterControl label="Add 5" clicked={onInc5} />
    <CounterControl label="Subtract 5" clicked={onDec5} />
  </div>
);

const mapStateToProps = state => ({
  counter: state.counter
});
const mapDispatchToProps = dispatch => ({
  onInc: () => dispatch({ type: "INC" }),
  onDec: () => dispatch({ type: "DEC" }),
  onInc5: () => dispatch({ type: "INC5", payload: { value: 5 } }),
  onDec5: () => dispatch({ type: "DEC5", payload: { value: 5 } })
});
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
