import axios from 'axios';

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
      console.log(res);
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
    const numIng = this.ingerdient.length;
    const period = Math.ceil(numIng / 3);
    this.time = period * 15;
  }
  calcServings() {
    this.servings = 4;
  }
}
