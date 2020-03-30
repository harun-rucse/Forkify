import str from './models/Search';
// import { add as a, multiply as m } from './views/searchView';
import * as searchView from './views/searchView';

console.log(
  `Using imported functions ! ${searchView.add(3, 3)} and ${searchView.multiply(
    2,
    3
  )}. ${str}`
);
