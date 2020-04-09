import Search from './models/Search';
import Recipe from './models/Recipe';
import {
  elements,
  renderLoader,
  clearLoader
} from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';

/**
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked object
 */
const state = {};
/**
 *  SEARCH CONTROLLER
 */

const controlSearch = async () => {
  // 1) Get query from view
  const query = searchView.getInput(); // TODO
  console.log(query);

  if (query) {
    // 2) New search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResult();
    renderLoader(elements.searchRes);

    // 4) Search for Recipes
    await state.search.getResults();

    // 5) Render results on UI
    clearLoader();
    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

// Pagination control
// Even deligation
elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  const goToPage = parseInt(btn.dataset.goto, 10);

  // Render pagination
  searchView.clearResult();
  searchView.renderResults(state.search.result, goToPage);
});

/**
 *  RECIPE CONTROLLER
 */
const controlRecipe = async () => {
  // Get the id from url
  const id = window.location.hash.replace('#', '');

  if (id) {
    // Prepare UI for changes
    recipeView.clearRenderRecipe();
    renderLoader(elements.recipe);

    // Highlight Selected search item
    if (state.search) {
      searchView.highlightSelected(id);
    }


    // Get recipe object  and add it to state
    state.recipe = new Recipe(id);

    // Get recipe data and parseIngredients
    await state.recipe.getRecipe();
    state.recipe.parseIngedients();

    // Calculate serving and time
    state.recipe.calcTime();
    state.recipe.calcServings();

    // Render recipe
    clearLoader();
    recipeView.renderRecipe(state.recipe);
  }
};

['load', 'hashchange'].forEach(event => window.addEventListener(event, controlRecipe));

// Handle recipe button clicked
elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    // Decrease button is click
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngrediens(state.recipe);
    }
  }
  if (e.target.matches('.btn-increase, .btn-increase *')) {
    // Increase button is click
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngrediens(state.recipe);
  }
});