const { client } = require("../index");
const { MessageEmbed } = require("discord.js");

const retrieveEmbed = new MessageEmbed()
  .setColor("#000000")
  .setTitle("Retrieving statistics...");

module.exports = {
  name: "statistics",
  aliases: ["stats"],
  guildOnly: false,
  cooldown: 5,
  description: "View Empty Bot's statistics.",

  async execute(message) {
    let msg = await message.channel.send(retrieveEmbed);

    let uptime = (process.uptime() / 60 / 60).toFixed(1);
    if (uptime >= 24) {
      uptime /= 24;
      uptime = uptime.toFixed(1);
      uptime += " days";
    } else {
      uptime += " hours";
    }

    const statsEmbed = new MessageEmbed()
      .setColor("#000000")
      .setTitle("Empty Bot Statistics")
      .addField(
        "Online",
        `Uptime: ${uptime}\nGuilds: ${client.guilds.cache.size}`
      )
      .setThumbnail(client.user.avatarURL())
      .setTimestamp();

    // maybe ping an api and add it to the embed, then

    msg.edit(statsEmbed);
  },
};
