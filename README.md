# Meme Wars Server

Server side for my application ["Meme Wars"](https://github.com/IvanNugiban/meme-wars).

## Installation

This project is using typescript. First compile the typescript using: 

```bash
npx tsc
```

Than create .env file where specify next fields:

```bash
PORT=
DB_URL=
```

Now you can launch server using:

```bash
npm start
```

## Endpoints

### Entries

- **entries/getPair** - get pair of entries with lowest votes amount
- **entries/userSubmited** - check if user already submited entry for today
- **entries/add** add new entry
- **entries/vote** upvote one entry and downvote another
- **entries/addTest** fetch memes and usernames from third-party api's and add them to simulate submission

### Events
- **events/getActive** get active event
- **events/getPrevious** get previous event
- **events/refreshLeaderboard** refresh leaderboard
- **events/endEvent** end current event, start new, reset all user variables, etc.

### Other
- **/uploads** - static path where all images (memes) contained 

  