import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }
  async getResults() {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    // const key = '52f194fce6211fe426cd3832da9055d9';
    // const id = '02410039';
    try {
      const res = await axios(
        `${proxy}https://forkify-api.herokuapp.com/api/search?&q=${this.query}`
      );
      this.result = res.data.recipes;
      // console.log(this.result);
    } catch (err) {
      alert(err);
    }
  }
}
