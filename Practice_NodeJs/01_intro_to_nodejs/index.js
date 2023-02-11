const superheroes = require("superheroes");
const supervillains = require("supervillains");

var superHeroName = superheroes.random();
var supervillainName = supervillains.random();

console.log(superHeroName + " vs " + supervillainName);