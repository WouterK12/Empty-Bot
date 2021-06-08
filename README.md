# Empty Bot

Emtpy Bot is a Discord bot template.
By [WouterK12](https://mcpinger.wouterk12.com)

## Requirements

- [Node.js](https://nodejs.org/en/) with [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Usage

- `npm install`
- `npm init`
- Create a file called `.env` and add [your token](https://discord.com/developers) and prefix to it.

.env

```.env
TOKEN=YOURTOKEN
PREFIX=em.
```

### Start

- Developing: `nodemon index.js`
- Production: `node index.js`

## Included commands

- Help: get a list of commands
- Ping: pong! (with MongoDB database)
- Statistics: get the uptime and total guilds of the bot
