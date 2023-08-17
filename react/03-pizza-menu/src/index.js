import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//props are immutable, because if we chnage it in child, it will also be updated in parent.
//Component Function name needs to start with upper case letter
//React supports one way data flow --> data can flow from parent to children, not children to parent.

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];
/*
1. JSX is a JavaScript-like templating language.
2. JSX is a single-file extension.
3. JSX is a JavaScript-like templating language.

//JSX Rules :
> JSX works essentially like HTML, but we can wnter "Javascript mode" by usinfg {}.
> We can place JavaScript expressions inside {}. examples: reference variable, create arrays or objects, [].map(), ternary operator
> Statements are not allowed (if/else, for, switch, etc)

*/
function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  // const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  // return <h1 style={style}>Fats React Pizza Co.</h1>; //style should be in object {{}}
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;
  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {/* {numPizzas > 0 && ( */}
      {numPizzas > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>

          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} /> //we need to pass key for each child elements
            ))}
          </ul>
        </>
      ) : (
        <p>We are still working on our menu. Please come back later :)</p>
      )}
    </main>
  );
}

function Pizza({ pizzaObj }) {
  // if (pizzaObj.soldOut) return null; //early return
  return (
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name}></img>
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
      </div>
    </li>
  );
}

function Footer() {
  // return React.createElement("footer", null, "We're currently open");
  const hour = new Date().getHours();
  const openHours = 0;
  const closeHours = 24;
  const isOpen = hour >= openHours && hour <= closeHours;
  // if (hour >= openHours && hour <= closeHours) alert("We are currently open.");
  // else alert("Sorry, we are closed.");

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHours={closeHours} openHours={openHours} />
      ) : (
        <p>
          We're happy to welcome you between {openHours}:00 to {closeHours}:00.{" "}
        </p>
      )}
    </footer>
  );
}
function Order({ closeHours, openHours }) {
  return (
    <div className="order">
      <p>
        We're open utill {openHours}:00 to {closeHours}:00. Come visit us or
        order online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

//React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//React before v18
// ReactDOM.render(<App />, document.getElementById("root"));
