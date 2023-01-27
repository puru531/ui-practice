'strict mode';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// budget[0].value = 1000; //this will because object.freeze only works on top level and it not not deep freeze.
// budget[0] = 'Puru'; //will not work

//make objects immutable
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
// spendingLimits.jay = 200;
// console.log(spendingLimits); // will not add jay, becuase it is immutable now.

// const getLimit = user => spendingLimits?.[user] ?? 0;
const getLimit = (limits, user) => limits?.[user] ?? 0; //no longer depending on external variables

const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  // user = user.toLowerCase();
  const cleanUser = user.toLowerCase();
  // const limit = spendingLimits[cleanUser] ? spendingLimits[cleanUser] : 0;
  //same using optional chaining and nullish coalasing
  // const limit = spendingLimits?.[cleanUser] ?? 0;

  // const limit = getLimit(cleanUser);

  // if (value <= getLimit(cleanUser)) {
  //   // budget.push({ value: -value, description, user: cleanUser });
  //   return [...state, { value: -value, description, user: cleanUser }]
  // }
  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};

const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

// const checkExpenses = function (state, limits) {
//   // for (const entry of budget)
//   //   if (entry.value < -getLimit(limits, entry.user)) entry.flag = 'limit';
//   return state.map(entry => {
//     return entry.value < -getLimit(limits, entry.user) ? {...entry, flag: 'limit'} : entry;
//   })
// };
//arrow function
const checkExpenses = (state, limits) =>
  state.map(entry => {
    return entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry
  });

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

// const logBigExpenses = function (bigLimit) {
//   let output = '';
//   for (const entry of budget)
//     output +=
//       entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : ''; // Emojis are 2 chars

//   output = output.slice(0, -2); // Remove last '/ '
//   console.log(output);
// };
const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state.filter(entry =>  entry.value <= -bigLimit).map(entry => entry.description.slice(-2)).join(' / ');
  // const bigExpenses = state.filter(entry =>  entry.value <= -bigLimit).reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, '')
  console.log(bigExpenses);
};

console.log(budget);
logBigExpenses(finalBudget, 1000);
