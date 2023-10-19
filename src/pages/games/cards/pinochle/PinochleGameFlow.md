# Pinochle Game Flow

- Create Game
    - create_game() ──► *NEW* games ──► *NEW* game_players
    - join_game() ──► *NEW* game_players

- Start Round
    - start_round() ──► games: {deck, dealer} ──► game_players: {hand, bids}

- Bidding
    - bid() ──► game_players: {bids}

- Declaring Trump
    - declare_trump() ──► games: {trump, bid} ──► game_players: {points}
