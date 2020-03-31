import { elements } from './base';
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = ' ';
};

export const clearResult = () => {
  elements.searchResList.innerHTML = '';
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
  }
};

const renderRecipie = recipe => {
  const markup = `
        <li>
            <a class="results__link" href="#23456">
                <figure class="results__fig">
                    <img src="${recipe.recipe.image}" alt="${
    recipe.recipe.label
  }">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(
                      recipe.recipe.label
                    )}</h4>
                    <p class="results__author">${recipe.recipe.source}</p>
                </div>
            </a>
        </li>
    `;
  elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = recipes => {
  recipes.forEach(renderRecipie);
};
