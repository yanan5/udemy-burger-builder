import React, { Component } from "react";
import { connect } from "react-redux";
import {
  onInc,
  onDec,
  onIncByVal,
  onDecByVal,
  onStore,
  onDelete
} from "../../actions/action";

import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";

const Counter = ({
  counter,
  onInc,
  onDec,
  onIncByVal,
  onDecByVal,
  onStore,
  onDelete,
  result
}) => (
  <div>
    <CounterOutput value={counter} />
    <CounterControl label="Increment" clicked={onInc} />
    <CounterControl label="Decrement" clicked={onDec} />
    <CounterControl label="Add 5" clicked={onIncByVal} />
    <CounterControl label="Subtract 5" clicked={onDecByVal} />
    <div>
      <CounterControl label="Store Result" clicked={onStore} />
    </div>
    <ul>
      {result.map((val, ind) => (
        <li key={`${val}-${ind}`}>
          {val} - <CounterControl label="X" clicked={() => onDelete(ind)} />
        </li>
      ))}
    </ul>
  </div>
);

const mapStateToProps = state => ({
  counter: state.counter,
  result: state.result
});
const mapDispatchToProps = {
  onInc,
  onDec,
  onIncByVal,
  onDecByVal,
  onStore,
  onDelete
};
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
