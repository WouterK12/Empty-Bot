const { totalGuilds } = require("../bot");
const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name: "statistics",
  cooldown: 5,
  data: new SlashCommandBuilder().setName("statistics").setDescription("View Empty Bot's statistics."),

  async execute(interaction) {
    await interaction.deferReply();

    let uptime = (process.uptime() / 60 / 60).toFixed(1);
    if (uptime >= 24) {
      uptime /= 24;
      uptime = uptime.toFixed(1);
      uptime += " days";
    } else {
      uptime += " hours";
    }

    const statsEmbed = new EmbedBuilder()
      .setColor("#000000")
      .setTitle("Empty Bot Statistics")
      .addFields({ name: "Online", value: `Uptime: ${uptime}\nGuilds: ${await totalGuilds()}` })
      .setThumbnail(interaction.client.user.avatarURL())
      .setTimestamp();

    // maybe ping an api and add it to the embed, then

    setTimeout(() => {
      interaction.editReply({
        embeds: [statsEmbed],
      });
    }, 1000);
  },
};
