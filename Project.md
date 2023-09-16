# Games

## Create Game

*Requires authenticated user*

1. Configure game settings
2. Server creates a game instance
3. Server returns new game ID

```
┌────────────────────┐    ┌─────────────┐    ┌─────────┐
│ Configure Settings ├──► │ Create Game ├──► │ Game ID │
└────────────────────┘    └─────────────┘    └─────────┘
```

## Invite Friends

1. Link is generated using game ID: `{HOST}/.../#/games/{GAME_ID}`
2. Link is shared with other users
3. User opens link to join game by ID

```
                                       ┌──────────────┐
                                  ┌──► │ Text Message ├──┐
┌─────────┐    ┌───────────────┐  │    └──────────────┘  │    ┌───────────┐
│ Game ID ├──► │ Generate Link ├──┤                      ├──► │ Join Game │
└─────────┘    └───────────────┘  │    ┌──────────────┐  │    └───────────┘
                                  └──► │     Email    ├──┘
                                       └──────────────┘
```

## Join Existing Game

1. User joins game using game ID by:
    - Opening shared URL that includes game ID
    - Entering game ID in Join Game form
2. Server registers user as a new player in random seat
3. Server returns player seat

```
                  ┌───────────────┐
             ┌──► │   Open Link   ├──┐
             │    └───────────────┘  │
┌─────────┐  │                       │    ┌─────────────────┐    ┌───────────────┐
│ Game ID ├──┤                       ├──► │ Register Player ├──► │ Assigned Seat │
└─────────┘  │                       │    └─────────────────┘    └───────────────┘
             │    ┌───────────────┐  │
             └──► │ Enter Game ID ├──┘
                  └───────────────┘
```

## Start Game

1. Players can switch positions by clicking another position
    - If the position is available, update to the new seat
    - If the position is taken, request to switch with other player
        - If the other player accepts, switch positions
        - If the other player declines, positions remain the same
2. Players wait until at least the minimum number of players have joined
3. Any player can start game

```
                            ┌──────────────────┐
                       ┌──► │ Switch Positions ├──┐
┌───────────────────┐  │    └──────────────────┘  │    ┌──────────────────┐    ┌────────────┐
│ Assigned Position ├──┤                          ├──► │ Wait for Players ├──► │ Start Game │
└───────────────────┘  │    ┌──────────────────┐  │    └──────────────────┘    └────────────┘
                       └──► │   Keep Position  ├──┘
                            └──────────────────┘
```

# User Profiles

- User profiles are a collection of metadata about a user, such as:
    - Identifying information: profile ID, name, email (for authenticated users)
    - Preferences: theme, animation speed, audio settings
    - Statistics: types of games played, games completed, games won
- All users have a profile stored on the server, whether authenticated or not
- Profile IDs are randomly generated once, stored locally, and sent with every server request
- Logging in retrieves the user's profile ID and stores it locally
- Logging out clears the locally stored profile ID

# User Authentication

- Authentication is managed using an access and refresh JSON Web Tokens (JWTs)
- Tokens are considered valid if they exist, are not expired, and are validated by the server
- If the access token is valid, the user is considered authenticated
- If the access token is invalid but the refresh token is valid, retrieve a new access token from the server
- If the refresh token is invalid, require user login to generate new access and refresh tokens

```
┌─────────────────────┐     ┌─────┐                                               ┌──────────────────────┐
│ Valid Access Token? ├───► │ Yes ├─────────────────────────────────────────────► │    Authenticated     │
└─────────┬───────────┘     └─────┘                                               └──────────────────────┘
          │                                                                                  ▲
          ▼                                                                                  │
       ┌─────┐    ┌──────────────────────┐    ┌─────┐    ┌──────────────────────┐            │
       │ No  ├──► │ Valid Refresh Token? ├──► │ Yes ├──► │ Refresh Access Token ├────────────┤
       └─────┘    └──────────┬───────────┘    └─────┘    └──────────────────────┘            │
                             │                                                               │
                             ▼                                                               │
                          ┌─────┐    ┌───────────────────────────┐                           │
                          │ No  ├──► │ Server Creates New Tokens ├───────────────────────────┘
                          └─────┘    └───────────────────────────┘
```
