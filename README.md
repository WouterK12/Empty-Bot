# Empty Bot

Emtpy Bot is a Discord bot template.  
By WouterK12, based on [MCPinger](https://mcpinger.wouterk12.com)

## Requirements

- [Node.js](https://nodejs.org/en/) with [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Usage

- `npm install`
- `npm init`
- Create a file called `.env` and add [your bot's token and client Id](https://discord.com/developers) to it.

.env

```.env
TOKEN=YOURTOKEN
CLIENTID=YOURCLIENTID
```

### Start

- Update Application Commands: `npm run update-commands`
- Developing: `npm run dev`
- Production: `npm run start`

## Included commands

- /help: get a list of commands
- /ping: pong! (with MongoDB database)
- /statistics: get the uptime and total guilds (across all shards) of the bot
