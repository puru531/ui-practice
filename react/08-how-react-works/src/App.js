import { useState } from "react";

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}
//React element
// console.log(<DifferentContent test={23} />);
/*
This will return an object of react elements, which contains all the information about the component,
It conts information like $$typeof, key, props, type: DifferentContent() ... etc.
$$typeof is a security feature that React has implemented in order to protect us from cross site 
scrpting attacks. It is of type Symbol, which is one of the JavaScript primitive which cannot 
be transmitted via JSON. This means that a symbol like this cannot come from API.
So if some hackers would try to send us a fake react element from any API, then React would 
not see that $$typeof as Symbol. because Symbols cannot be transmitted via JSON. Then react would
not include that fake react element into the DOM. 
*/

// console.log(DifferentContent());
/*
in this case, we get $$typeof as Symbol but type is "div" instead,
Beasuse unlike above <DifferentContent test={23} /> in which React was considering as React component element
This time, it considers it as React raw element

*/

function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>
      {/* ---------------- Direct consequence of Diffing rules ------------- */}
      {/* Here the state is changing, but element is same, so if if content is hidded and 
      number of likes is 4 then it will remain in same state even if we change the tab. 
      becuase the state inside that component will remain unchanged.
      
      But as soon as we click on tab 4, we replace the current element with another one,
      so the TabContent will be removed from DOM and state will be reset.
      Again if we go to any other tab(1,2,3), it will start fresh with states reset
      
      To solve this problem we need to use key prop.
      */}
      {activeTab <= 2 ? (
        <TabContent item={content.at(activeTab)} key={activeTab} />
      ) : (
        <DifferentContent />
      )}
      {/* This will sload content inside it in DOM, but will not include in React Component tree.
      So it cannot manage its own state. */}
      {/* {TabContent({ item: content.at(0) })}  */}
    </div>
  );
}

function Tab({ num, activeTab, onClick }) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  console.log("Render"); //on state change, component function is called every time.
  //but when state is alreadt in its default state, the this console will not be logged as component function will not be called again.

  function handleInc() {
    setLikes(likes + 1);
  }
  function handleTripleInc() {
    // setLikes(likes + 1);
    // setLikes(likes + 1);
    // setLikes(likes + 1); // will only increase likes by one. because state update is asynchronous
    // and likes is still 0. so state is stale

    //to ovwercome this we can use callback function
    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1); //this will work.

    // handleInc(); //will not work
    // handleInc();
    // handleInc();
  }

  function handleUndo() {
    setShowDetails(true);
    console.log(showDetails);
    setLikes(0);
    console.log(likes);
  }

  function handleUndoLater() {
    setTimeout(handleUndo, 2000); //batching in react 18 works well, so console.log(render) will execute only once.
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button onClick={handleTripleInc}>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleUndoLater}>Undo in 2s</button>
      </div>
    </div>
  );
}

function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}
