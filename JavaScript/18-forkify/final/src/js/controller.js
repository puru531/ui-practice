import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import 'core-js';
import 'regenerator-runtime/runtime';
import { MODAL_CLOSE_SEC } from './config.js';

// if(module.hot) {
//   module.hot.accept();
// }

const recipeContainer = document.querySelector('.recipe');

console.log('============= Applications Starts ===============');

const controlRecipes = async function() {
  try{

    const id = window.location.hash.slice(1); 
    if(!id) return;
    recipeView.renderSpinner();
    //0. Loading the recipe
    await model.loadRecipe(id);

    //1. update the resultsView and bookmarkView to mark or highlight the selected recipe
    resultsView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmarks);

    //2. Rendering the recipe
    recipeView.render(model.state.recipe);

  } catch(err){
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function() {
  try{
    //1. Get search query
    const query = searchView.getQuery();
    if(!query) return;

    //2. show spinner
    resultsView.renderSpinner();


    //3. Load search results
    await model.loadSearchResults(query);

    //4. render the search results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    //5. Render initial pagination buttons
    paginationView.render(model.state.search);
    
  } catch(err){
    console.error(err);
  }
};

const controlPagination = function(gotoPage) {
  //1. render NEW search results
  resultsView.render(model.getSearchResultsPage(gotoPage));

  //2. Render NEW pagination buttons
  paginationView.render(model.state.search);
}

const controlServings = function(newServings) {
  //update the recipe servings in state (model.js)
  model.updateServings(newServings);

  //Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function() {
  //1) Add or remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //2) Update recipe view
  recipeView.update(model.state.recipe);

  //3) Render bookmarks
  bookmarkView.render(model.state.bookmarks);
}

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //show spinner
    addRecipeView.renderSpinner();
    //Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //show the success message
    addRecipeView.renderMessage();

    //Render the new recipe
    recipeView.render(model.state.recipe);

    //Render bookmarks
    bookmarkView.render(model.state.bookmarks);

    //change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`); //will update the url without refreshing, takes three args --> state, title, url

    //close the form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC);
  } catch (err) {
    addRecipeView.renderError(err.message);
    console.error('💥💥', err);
  }
};


const init = function() {
  bookmarkView.addHanderRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerRenderAddBookmark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe)
};
init();

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);