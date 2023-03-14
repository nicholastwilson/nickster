class PlayingCardDeck {

    cards: PlayingCard[];

    constructor(cards: PlayingCard[]) {
        this.cards = cards;
    }

    shuffle() {
        this.cards.shuffle();
    }

    toString() {
        let str = '[';
        if(Array.isArray(this.cards)) {
            for(let i = 0; i < this.cards.length; i++) {
                if(i == 0)
                    str += ', ';
                str += this.cards[i].getCode();
            }
        }
        str += ']';
        return str;
    }

    clone() {
        return new PlayingCardDeck(this.cards.slice());
    }

}