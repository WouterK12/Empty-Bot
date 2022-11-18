const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name: "help",
  cooldown: 0,
  data: new SlashCommandBuilder().setName("help").setDescription("View a list of commands."),

  async execute(interaction) {
    const helpEmbed = new EmbedBuilder()
      .setColor("#000000")
      .setTitle("Emtpy Bot Help")
      .setDescription("Empty Bot is Discord bot template\nBy [WouterK12]()")
      .setThumbnail(interaction.client.user.avatarURL())
      .addFields({ name: "Commands", value: "/help\n/ping\n/statistics" });

    const messageActionRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setLabel("By WouterK12").setStyle(ButtonStyle.Link).setURL("https://mcpinger.wouterk12.com")
    );

    interaction.reply({ embeds: [helpEmbed], components: [messageActionRow], ephemeral: true });
  },
};
