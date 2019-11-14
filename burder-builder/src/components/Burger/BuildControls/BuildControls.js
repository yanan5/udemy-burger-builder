import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css'

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
]
const BuildControls = (props) => {
    return <div className={classes.BuildControls}>
      <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map(ctrl => (
        <BuildControl
          count={props.ingredients[ctrl.type]} 
          price={props.priceList[ctrl.type]}
          add={() => props.addIngredient(ctrl.type)}
          remove={() => props.removeIngredient(ctrl.type)}
          key={ctrl.label} 
          label={ctrl.label}
          disabled={props.disabled[ctrl.type]} />
      ))}
      <button 
        onClick={props.showOrderHandler}
        className={classes.OrderButton}
        disabled={!props.purchasable}
        >ORDER NOW</button>
    </div>
}

export default BuildControls;