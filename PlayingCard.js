import Suit from '.\Suit';
import Rank from '.\Rank';

class PlayingCard() {

 suit;
 rank;

 constructor(suit, rank) {
  this.suit = suit;
  this.rank = rank;
 }

 getCode = () => {
  return rank + suit;
 }

}
