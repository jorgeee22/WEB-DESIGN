import {randomSuperhero} from 'superheroes';
import {randomSupervillain} from 'supervillains'


var superName= randomSuperhero();
var vilName = randomSupervillain();

console.log("An epic battle begins: " + superName + " vs. " + vilName + ", Who will win?");