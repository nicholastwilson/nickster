class PlayingCard {

    public static fromCode(code: string): PlayingCard {
        
    }

    suit: Suit;
    rank: Rank;

    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }

    getCode() {
        return this.rank.code + this.suit.code;
    }

    getName() {
        return this.rank.name + (this.suit ? " of " + this.suit.name : "");
    }

}
