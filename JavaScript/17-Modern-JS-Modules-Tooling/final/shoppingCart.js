////////////////////////////////////////////////////////////////////////////////////////////////
///--------------->  EXPORTING MODULES   <--------------------
console.log('Exporting Modules...');
//all top level variables are private in this module
const shippingCost = 10;
export const cart = [];


//Blocking code --> importing module will wait for exporting modules to finish execution of blocking code
//Top level await blocks the code of entire module
// console.log('Start fetching users...');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finished fetching users...');

//if we want to use these variables in other modules or files, then we need to export them.
//Export is of two types: Named exports and Deault exports
// named export is easy one, we jsut need to add export before anything we want to export.

//Named export
export const addToCart = function (quantity, product) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart.`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

//Default export
//instead of any variable, we export value in default export, and then we can import it using any name in other file.
export default function (quantity, product) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart.`);
  };