import axios from 'axios';
import {
  indianred
} from 'color-name';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }
  async getRecipe() {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    try {
      const res = await axios(
        `${proxy}https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );
      this.title = res.data.recipe.title;
      this.img = res.data.recipe.image_url;
      this.author = res.data.recipe.publisher;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (err) {
      alert('Someyhing went wrong :(');
    }
  }

  calcTime() {
    // Assume that every 3 ingerdient need 15 mint
    const numIng = this.ingredients.length;
    const period = Math.ceil(numIng / 3);
    this.time = period * 15;
  }
  calcServings() {
    this.servings = 4;
  }
  parseIngedients() {
    const newIngredients = this.ingredients.map(el => {
      // 1) Uniform units
      const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
      const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
      const units = [...unitsShort, 'g', 'kg'];

      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      })

      // 2) Remove parenthesis
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // 3) Parse ingredient into cout, unit, ingredient
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

      let objIng;
      if (unitIndex > -1) {
        // Threre is a unit
        // Ex: 4 1/2 cups arrCount = [4, 1/2] ==> eval([4+1/2]) ==> 4.5
        // Ex: 4 cups arrCount = [4]
        // Ex 4 3 1/2 cups arrCount = [4, 3, 1/2]
        // Ex: 1-1/2 cup
        const arrCount = arrIng.slice(0, unitIndex);
        let count;
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace('-', '+'));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join('+'));
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' ')
        }

      } else if (parseInt(arrIng[0], 10)) {
        // Threre is no unit but 1st element is number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
        }
      } else if (unitIndex === -1) {
        // Threre is no unit and 1st element is not a number
        objIng = {
          count: 1,
          unit: '',
          ingredient
        }
      }

      return objIng;
    });

    this.ingredients = newIngredients;
  }
}