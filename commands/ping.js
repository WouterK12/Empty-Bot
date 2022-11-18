const Guild = require("../models/guild");
const utils = require("../modules/utils");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name: "ping",
  cooldown: 0,
  data: new SlashCommandBuilder().setName("ping").setDescription("Ping, pong!"),

  async execute(interaction) {
    let guild = await Guild.findOne({
      guildId: interaction.guild.id,
    });

    if (!guild) {
      guild = await utils.AddGuild(interaction);
    }

    interaction.reply({
      content: `Pong!\n(${guild.name})`,
    });
  },
};
