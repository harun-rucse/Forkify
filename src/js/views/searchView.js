import { elements } from './base';
export const getInput = () => elements.searchInput.value;

const renderRecipie = recipe => {
  const markup = `
        <li>
            <a class="results__link results__link--active" href="#23456">
                <figure class="results__fig">
                    <img src="img/test-1.jpg" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">Pasta with Tomato ...</h4>
                    <p class="results__author">The Pioneer Woman</p>
                </div>
            </a>
        </li>
    `;
  elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = recipes => {
  console.log('recipes');
  recipes.forEach(renderRecipie);
};
