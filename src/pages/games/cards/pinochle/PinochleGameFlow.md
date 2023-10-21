# Pinochle Game Flow

| **PHASE** | **SUMMARY** | **SERVER CALLS** | **SERVER DATA** | **SERVER MESSAGES** |
|---|---|---|---|---|
| **Create Game** | A new game is created | `create_game(settings)` | NEW `games` | `game-created` |
| **Join Game** | Players join the game | `join_game()` → `game_settings` | NEW `game_players` | `player-joined` |
|  | Players retrieve game settings | `get_game_settings()` | GET `games.settings` |  |
| **Start Round** | Players signal to start a round | `pinochle_start_round()` → `round_started` | SET `dealer`, `player_hands`, `initial_hands` | `round-started` |
|  | Players retrieve initial game state | `get_game_state()` | GET `games.state` |  |
| **Bidding** | Players take turns bidding, passing, or calling for a misdeal | `pinochle_bid(bid)` | SET `player_bids` | `player-bid` |
|  |  | `pinochle_pass()` | SET `player_bids` | `player-passed` |
|  |  | `pinochle_misdeal()` | SET `player_hands`, `player_bids` | `player-misdeals` |
| **Declare Trump** | Player with the highest bid declares trump | `pinochle_declare_trump(suit)` | SET `target_score`, `trump_suit` | `trump-declared` |
| **Partner Pass** | Partner passes cards to declaring player | `pinochle_partner_pass(cards)` | SET `player_hands` | `partner-passed` |
| **Declarer Pass** | Declarer passed cards back to partner | `pinochle_declarer_pass(cards)` | SET `player_hands` | `declarer-passed` |
| **Declarer Throws In** | Declarer throws in the hand voluntarily | `pinochle_throw_in()` |  | `hand-thrown-in` |
| **Shoot the Moon** | Declarer indicates that they will attempt to shoot the moon | `pinochle_shoot_the_moon()` | SET `shoot_the_moon`, `target_score` | `shooting-the-moon` |
| **Choose Meld** | Players choose meld to score | `pinochle_meld()` | SET `player_melds`, `player_scores` | `player-melded` |
| **Declarer Forfeits** | Declarer's team is unable to score enough points to make the bid | `pinochle_fail_bid()` |  | `failed-bid` |
| **Play Card** | Player plays a card from their hand | `pinochle_play_card()` → `winning_player` | SET `trick_cards`, `player_hands`, `player_scores` | `card-played` |
| **End Round** | The round ends, scores are totaled, and summary is shown | `pinochle_get_round_summary()` → `player_hands` | SET `team_scores` |  |
| **Leave Game** | Player leaves the game | `leave_game()` | SET `game_players` | `player-left` |
