export default function Stats({items}) {
  if(!items.length) return (
    <p className="stats"><em>Start adding items to your packing list 🚀</em></p>
  );
  
  const numItems = items.length;
  const packedItems = items.filter((item)=> item.packed === true).length;
  const percentPacked = Math.round((packedItems / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentPacked === 100 ? 'You got everything! Ready to go✈️' :
        `💼 You have ${numItems} items in your list, and you already have packed ${packedItems} (${percentPacked}%)`}
      </em>
    </footer>
  );
}