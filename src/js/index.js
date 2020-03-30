import axios from 'axios';

// "https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free"

async function getResults(query) {
  const key = '52f194fce6211fe426cd3832da9055d9';
  const id = '02410039';
  try {
    const res = await axios(
      `https://api.edamam.com/search?q=${query}&app_id=${id}&app_key=${key}&from=0&to=30`
    );
    const recipes = res.data.hits;
    console.log(recipes);
  } catch (err) {
    alert(err);
  }
}

getResults('pizza');
