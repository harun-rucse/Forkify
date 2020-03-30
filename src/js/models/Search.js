import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }
  async getResults() {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const key = '52f194fce6211fe426cd3832da9055d9';
    const id = '02410039';
    try {
      const res = await axios(
        `${proxy}https://api.edamam.com/search?q=${this.query}&app_id=${id}&app_key=${key}&from=0&to=30`
      );
      this.result = res.data.hits;
      // console.log(this.result);
    } catch (err) {
      alert(err);
    }
  }
}
