import React from "react";
//back in the day, we used to write component using classes not functions
class Counter extends React.Component {
  //here we cannot use useState for creating state.

  //to use state :
  constructor(props) {
    super(props);
    //for each state we want to create, we need to pass in the object below.
    this.state = { count: 0 };

    //All eventhandlers used in jsx loose their binding, so we need to this object in bind to give access to current component instance.
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleDecrement() {
    //setting state : we can just pass the state value or we can update the state value based on current state.
    this.setState((curState) => {
      return { count: curState.count - 1 };
    });

    //just passing value
    // this.setState({ count: 10});
  }
  handleIncrement() {
    this.setState((curState) => {
      return { count: curState.count + 1 };
    });
  }

  render() {
    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + this.state.count);
    return (
      <div>
        <button onClick={this.handleDecrement}>-</button>
        <span>
          {date.toDateString()} [{this.state.count}]
        </span>
        <button onClick={this.handleIncrement}>+</button>
      </div>
    );
  }
}

export default Counter;

/* ------------------- Difference between class components and function components -----------
Class components :
    Introduced in v0.13 (2015)
    How to create : ES6 class, extending React.Component
    Reading props : this.props.X
    Local state : this.setState()
    Side effects/lifecycle : Lifecycle methods
    Event handlers : class methods
    Returning JSX : Return JSX from render method


Function components : 
    Introduced in v16.8 (2019, with hooks) {existed since beginning, but without hooks.}
    How to create : JavaScript function (any type)
    Reading props : destructuring or props.X
    Local state : useState() hook
    Side effects/lifecycle : useEffect() hook
    Event handlers : Functions 
    Returning JSX : Retrun JSX from function
    Advantages : Easier to build
                 Cleaner code : useEffect combines all lifecycle-related code in single place
                 Easier to share logic
                 We don't need this keyword anymore
 */
