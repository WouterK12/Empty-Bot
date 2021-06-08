const { client } = require("../index");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  guildOnly: false,
  cooldown: 0,
  description: "View a list of commands.",

  async execute(message, args) {
    const helpEmbed = new MessageEmbed()
      .setColor("#000000")
      .setTitle("Emtpy Bot Help")
      .setDescription(
        "Empty Bot is Discord bot template\nBy [WouterK12](https://mcpinger.wouterk12.com)"
      )
      .setThumbnail(client.user.avatarURL())
      .addField("Commands", "help\nping\nstatistics");

    message.channel.send(helpEmbed);
  },
};
