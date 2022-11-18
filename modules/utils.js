const mongoose = require("mongoose");
const Guild = require("../models/guild");

module.exports = {
  async AddGuild(interaction) {
    const newGuild = new Guild({
      _id: mongoose.Types.ObjectId(),
      name: interaction.guild.name,
      guildId: interaction.guild.id,
      time: interaction.createdAt,
      updatedAt: interaction.createdAt,
    });
    return await newGuild.save();
  },
};
