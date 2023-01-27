import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import 'core-js';
import 'regenerator-runtime/runtime';

if(module.hot) {
  module.hot.accept();
}

const recipeContainer = document.querySelector('.recipe');

console.log('============= Applications Starts ===============');

const controlRecipes = async function() {
  try{

    const id = window.location.hash.slice(1); 
    if(!id) return;
    recipeView.renderSpinner();
    //1 Loading the recipe
    await model.loadRecipe(id);

    //2. Rendering the recipe
    recipeView.render(model.state.recipe);

  } catch(err){
    recipeView.renderError();
  }
};

const controlSearchResults = async function() {
  try{
    //show spinner
    resultsView.renderSpinner();
    //Get search query
    const query = searchView.getQuery();
    if(!query) return;
    //Load search results
    await model.loadSearchResult(query);
    //render the search results
    resultsView.render(model.state.search.results);
    
  } catch(err){
    console.error(err);
  }
};


const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);