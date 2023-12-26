import { useSelector } from "react-redux";

function Customer() {
  //useSelector from react-redux gives all the states from reducers, it take a callback function.
  const customer = useSelector((store) => store.customer.fullName);
  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
