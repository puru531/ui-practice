const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

//Destructuring
/*
const book = getBook(2);
book;
// const title = book.title;
// const author = book.author;

const { title, author, pages, publicationDate, genres, hasMovieAdaptation } =
  book; //destructuring, give same name in book object.

console.log("====", author, title, genres);

//Array destructuring
// const primaryGenre = genres[0];
// const secondaryGenre = genres[1];

const [primaryGenre, secondaryGenre, ...otherGenres] = genres; //... is rest operator which will hold all other values in an array., can be placed only at the end.
console.log(primaryGenre, secondaryGenre, otherGenres);

const newGenre = [...genres, "epic fantacy"]; // ... is spread operator which will take all values out of the arrya and place it.

//Object spread operator
const updatedBook = {
  ...book,
  //Adding new property
  moviePublicationDate: "2022-12-9",
  //Overwriting an  existing property
  pages: 1210,
}; //spread all properties inside book and we can add more.
console.log("====", updatedBook);

//ternary
const pagesRange = pages > 1000 ? "over a thousand" : "less than a thousand.";
console.log("====", pagesRange);

//Arrow functions
// function getYear(str) {
//   //Normal function, function declaration
//   return str.split("-")[0];
// }
//Arrow function of same.
const getYear = (str) => str.split("-")[0]; //function expression

console.log("====", getYear(publicationDate));

//Template literal
const summary = `${title}, a ${pages}-page long book, was written by ${author} and published in ${getYear(
  publicationDate
)}`;
console.log("====", summary);

//Short circuiting
//&& -->when ever first false, return first, else return second
console.log(true && "Some string");
console.log(hasMovieAdaptation && "This book has a movie");
//falsy : 0, '', null, undefined
console.log(0 && "Some string");

// || --> Whenever first true, returns first other wise returns last.
console.log(true || "Some str");
console.log(false || "Some str");

const spanishTranslation = book.translations.spanish || "Not Translated.";
console.log("====", spanishTranslation);
// || operator can give wrong result when we are checking count
const countWrong = book.reviews.librarything.reviewsCount || "No data"; // In this case review count is 0 which is a data, but it will result NO Data
console.log("====", countWrong);

//To overcome this, we have Nullish Coalace operartor (??)
const count = book.reviews.librarything.reviewsCount ?? "No data";
console.log("====", count);

//Optional Chaining
function getTotalReviewCount(book) {
  const goodreads = book.reviews.goodreads.reviewsCount;
  // const librarything = book.reviews.librarything.reviewsCount; // will throw error if  any value is not available, and code will brake
  //to overcomce this, we will use optional chaining, which will not throw error but will return undefined
  const librarything = book?.reviews?.librarything?.reviewsCount ?? 0; //if it is undefined set 0 as default
  return goodreads + librarything;
}
console.log(getTotalReviewCount(book));


*/

//Functional Array Methods (Map, Filter, Reduce) --> Functional : (they do not mutate the original array, but returns new array.)
/*
const books = getBooks();

//Map method --> will loop over the array and return a new array with some operations applied to each of the elements of the array.
const x = [1, 2, 3, 4, 5, 6].map((el) => el * 2);
console.log(x);

const titles = books.map((book) => book.title);
console.log(titles);

const essentialData = books.map((book) => ({
  title: book.title,
  author: book.author,
}));
console.log(essentialData);

//Filter method --> will loop over the array and return a new array with only the elements that satisfy the condition.
const longBooksWithMovies = books
  .filter((book) => book.pages > 500)
  .filter((book) => book.hasMovieAdaptation);
console.log(longBooksWithMovies);

const adventureBooks = books
  .filter((book) => book.genres.includes("adventure"))
  .map((x) => x.title);
console.log(adventureBooks);

//Reduce Method --> Returns the reduced version of entire into one value, ex. - sum of all.
const pagesAll = books.reduce((sum, book) => sum + book.pages, 0);
console.log(pagesAll);

//Sort Method
const y = [7, 2, 9, 2, 5, 1, 3];
const sorted = y.slice().sort((a, b) => a - b); // sort also changes the original array, so slice is used to make another copy.
sorted;
y;

const stortedByPages = books.slice().sort((a, b) => a.pages - b.pages);
stortedByPages;

//Working with immutable arrays.
//Add book object to array
const newBook = {
  id: 6,
  title: "Harry Potter and chanmber of secrets",
  author: "J. K. Rowling",
};
const booksAfterAdd = [...books, newBook];

// Delete book object from array
const booksAfterDelete = booksAfterAdd.filter((book) => book.id !== 3);

//Update the book object in the array
const booksAfterUpdate = booksAfterDelete.map((book) =>
  book.id === 1 ? { ...book, pages: 1210 } : book
);
booksAfterUpdate;

*/

// //Asynchronous JavaScript --> promises
// fetch("https://jsonplaceholder.typicode.com/todos")
//   .then((res) => res.json())
//   .then((data) => console.log(data));

//Async Await
async function getTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();
  console.log(data);
  return data;
}
const todos = getTodos();
console.log(todos); //will return promise object becuase getTodos has not returned data yet and this line is executed.
