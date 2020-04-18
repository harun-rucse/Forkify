import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import {
  elements,
  renderLoader,
  clearLoader
} from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likeView from './views/likeView';
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
    try {
      await state.search.getResults();

      // 5) Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (err) {
      alert('Error seach recipe');
    }
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
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);

    // Render pagination
    searchView.clearResult();
    searchView.renderResults(state.search.result, goToPage);
  }

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
    try {
      // Get recipe data and parseIngredients
      await state.recipe.getRecipe();
      state.recipe.parseIngedients();

      // Calculate serving and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (err) {
      alert('Error passing recipe')
    }
  }
};

// Handle delete and update shopping list item
elements.shopping.addEventListener('click', e => {
  // Get the id of clicked item
  const id = e.target.closest('.shopping__item').dataset.itemid;

  // Handle delete
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    // Delete from list
    state.list.deleteItem(id);

    // Delete from UI
    listView.deleteItem(id);
  }
  // Handle update
  else if (e.target.matches('.shopping__count-value')) {
    // Get the newCount from input field
    const val = parseFloat(e.target.value, 10);

    // check IF val is positive and grater than 0 then update count ELSE set input value = 0
    if (val > 0) {
      // Update list, passing id and newCount
      state.list.updateCount(id, val);
    } else {
      e.target.value = 0;
    }


  }
  // Clear list all item btn
  listView.toggleClearListBtn(state.list.list.length);
});

/**
 *  LIST CONTROLLER
 */
const controlList = () => {
  // Create List object IF there is not yet and add to state
  if (!state.list) state.list = new List();

  // Add each ingredient to list
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);

    // Render item on UI
    listView.renderItem(item);
  });
  // Clear list all item btn
  listView.toggleClearListBtn(state.list.list.length);
};

// Restoring shopping list
window.addEventListener('load', ()=> {
  // Create new list object and add it to state
  state.list = new List();

  // Restoring from localStorage
  state.list.readStorage();

  // Render list
  state.list.list.forEach(listView.renderItem);

  // Clear list all item btn
  listView.toggleClearListBtn(state.list.list.length);
});

/**
 *  LIKE CONTROLLER
 */
const controlLike = () => {
  // create Like obj IF there is not yet and add it to state
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id;

  // User not yet like this recipe
  if (!state.likes.isLiked(currentID)) {
    // Add like to Like list
    const newLike = state.likes.addLike(currentID, state.recipe.title, state.recipe.author, state.recipe.img);

    // Toggle like button
    likeView.renderToggleLikeBtn(true);

    // Render like to UI list
    likeView.renderLike(newLike);
  }
  // User already liked this recipe
  else {
    // Remove like from Like list
    state.likes.deleteLike(currentID);

    // Toggle like button
    likeView.renderToggleLikeBtn(false);

    // Remove like from UI list
    likeView.deleteLike(currentID);
  }
  likeView.toggleLikeMenu(state.likes.numLikes());
}

// Restoring recipe likes
window.addEventListener('load', ()=> {
  state.likes = new Likes();

  // Restore likes
  state.likes.readStorage();
  
  // Toggle like menu
  likeView.toggleLikeMenu(state.likes.numLikes());

  // Render likes
  state.likes.likes.forEach(likeView.renderLike);
});

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
  if (e.target.matches('.recipe__btn-add, .recipe__btn-add *')) {
    // Add shopping button is click
    controlList();
  }
  if (e.target.matches('.recipe__love, .recipe__love *')) {
    // Like button is click
    controlLike();
  }
});

// Clear shopping list button handle
elements.clearList.addEventListener('click', ()=> {
  // Delete all list from list array
  state.list.deleteAllItem();

  // Clear from UI
  listView.clearList();

  // Toggle clear list button
  listView.toggleClearListBtn(state.list.list.length);
});