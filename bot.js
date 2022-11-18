// Empty Bot, a Discord bot template
// By WouterK12

require("dotenv").config();
const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const fs = require("fs");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages],
  partials: [Partials.Message, Partials.Channel],
});

// Mongoose connection
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/empty-bot", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

module.exports = {
  async totalGuilds() {
    const guilds = await client.shard.fetchClientValues("guilds.cache.size");
    return guilds.reduce((acc, guildCount) => acc + guildCount, 0);
  },
};

// Loop through all events,
// enable all events
fs.readdir("./events/", (err, files) => {
  files.forEach((file) => {
    require(`./events/${file}`);
  });
});

// Commands
client.cooldowns = new Collection();
client.commands = new Collection();
fs.readdir("./commands/", (err, files) => {
  files.forEach((file) => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
  });
});

process.on("unhandledRejection", (error) => {
  console.error("Uncaught Promise Rejection", error);
});

// Properly close client when CTRL + C is used in the terminal
process.on("SIGINT", () => {
  client.destroy();
});

client.login(process.env.TOKEN);

module.exports.client = client;
