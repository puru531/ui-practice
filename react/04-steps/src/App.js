import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
export default function App() {
  //All react function that starts with 'use' are hooks. e.g. useEffect, useReducer, useState.
  //We can only call hooks on top level of root function, inside i, loop or any function.
  //We must not update state manually
  const [step, setStep] = useState(1); //useState returns array of two items --> i) the default value and  ii) function to update the variable
  const [isOpen, setIsOpen] = useState(true);
  /*
  -------------------- The Mechanics of State --------------------------------
  We don't do direct DOM manipulations. Because react is declarative.
  In React, a view is updated by re-rendering the component. (Call the component function again)
  State is preserved throughout re-renders. Even though the component is re-rendered, the state remains unchanged. Unless the component is unmounted.
  When a state is updated, the component re-renders, 

  One Component, One State : 
  Means, if we are using same component at many places, 
  and update the state in any one place, then it will be updated in that component only, not for all places where it is used 
  */
  function handlePrevious() {
    if (step > 1) {
      //suppose if we want to reduce the step by two, if call setStep twice for that, then it will not work
      // setStep(step - 1); //can use if not updating the state based on current state.
      //setStep(step - 1); //will not work
      setStep((curStep) => curStep - 1); //should use these if updating value based on current state
    }
  }
  function handleNext() {
    if (step < 3) setStep((curStep) => curStep + 1); //setStep(step + 1);
    // step = step + 1; //will not work, update using useState setter function
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        {isOpen ? "Close" : "Open"}
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
