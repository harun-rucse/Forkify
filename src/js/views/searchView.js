import {
  elements
} from './base';
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = ' ';
};

export const clearResult = () => {
  elements.searchResList.innerHTML = '';
  elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
  const resultArr = Array.from(document.querySelectorAll('.results__link'));
  resultArr.forEach(el => {
    el.classList.remove('results__link--active');
  });

  document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
};

/**
 * Title: Pasta with tomato and spinach
 * initial accumulator is 0
 * acc: 0 / acc + cur.length: 5/ newTitle = ['Pasta']
 * acc: 5 / acc + cur.length: 9/ newTitle = ['Pasta', 'with']
 * acc: 9 / acc + cur.length: 15/ newTitle = ['Pasta', 'with', 'tomato']
 * acc: 15 / acc + cur.length: 18/ newTitle = ['Pasta', 'with', 'tomato']
 */
const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    // return the result
    return `${newTitle.join(' ')} ...`;
  } else {
    return title;
  }
};

const renderRecipie = recipe => {
  const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(
                      recipe.title
                    )}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
  elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${
  type === 'prev' ? page - 1 : page + 1
}>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${
            type === 'prev' ? 'left' : 'right'
          }"></use>
      </svg>
      <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
`;

const renserButtons = (page, numPages, resPerPage) => {
  const pages = Math.ceil(numPages / resPerPage);

  let button;
  if (page === 1 && pages > 1) {
    // Only Button to go next
    button = createButton(page, 'next');
  } else if (page < pages) {
    // Both Button
    button = `
      ${createButton(page, 'prev')}
      ${createButton(page, 'next')}
    `;
  } else if (page === pages && pages > 1) {
    // Only Button to go prev
    button = createButton(page, 'prev');
  }
  elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

/**
 * page = 1 and resPerPage = 10
 * page = 1/ start = 0 / end = 10
 * page = 2/ start = 10 / end = 20
 * page = 3/ start = 20 / end = 30
 */

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  // Render recipes
  recipes.slice(start, end).forEach(renderRecipie);

  // Render pagination
  renserButtons(page, recipes.length, resPerPage);
};