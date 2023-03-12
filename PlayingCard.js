import Suit from '.\Suit';
import Rank from '.\Rank';

class PlayingCard() {

 var Suit suit;
 var Rank rank;

 constructor(suit, rank) {
  this.suit = suit;
  this.rank = rank;
 }

 getCode = () => {
  return rank + suit;
 }

}
