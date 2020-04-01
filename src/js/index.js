import Search from './models/Search';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';

/**
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked object
 */
const state = {};

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
