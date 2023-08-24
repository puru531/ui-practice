import { useState } from "react";
export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const [items, setItem] = useState([]); //uplifted to parent
  //there is no use of items here in UI to render, but we need setItems to set the items.
  //And as state can be passed only downward not upwards, we cannot pass this array to PackingList component, becuase it is not child of Forms.
  //So we have to uplift the state to thr parent component.

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    // handleAddItem(newItem); //uplifted
    onAddItems(newItem); //uplifted

    setQuantity(1);
    setDescription("");
  }
  /* uplifted to parent
  function handleAddItem(item) {
    setItem((items) => [...items, item]); //we cannot do items.push() here, because in react state should not be mutated.
  }
  */

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}
