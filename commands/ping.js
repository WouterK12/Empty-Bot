const Guild = require("../models/guild");
const utils = require("../modules/utils");

module.exports = {
  name: "ping",
  aliases: ["p"],
  guildOnly: true,
  cooldown: 0,
  description: "Ping, pong!",

  async execute(message, args) {
    let guild = await Guild.findOne({
      guildId: message.guild.id,
    });

    if (!guild) {
      guild = await utils.AddGuild(message);
    }

    if (args.length) {
      return message.channel.send(`Are you sure about ${args[0]}?`);
    }

    message.channel.send(`Pong!\n(${guild.name})`);
  },
};
