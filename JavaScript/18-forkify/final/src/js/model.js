import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { getJSON } from "./helper.js";

export const state = {
  recipe: {},
  search: {
    query: '',
    results: []
  }
};

export const loadRecipe = async function (id) {
  try {

    const data = await getJSON(`${API_URL}${id}`);
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      img: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.error(`${err} 💥💥💥💥💥`);
    throw err;
  }
};

export const loadSearchResult = async function(query) {
    try{
        state.search.query = query;
       const {data} = await getJSON(`${API_URL}?search=${query}`);
       state.search.results = data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                img: rec.image_url,
            }
        })
        console.log(state.search.results);
    } catch (err) {
        console.error(`${err} 💥💥💥💥💥`);
        throw err;
    }
}