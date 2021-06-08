const mongoose = require("mongoose");
const Guild = require("../models/guild");

module.exports = {
  async AddGuild(message) {
    const newGuild = new Guild({
      _id: mongoose.Types.ObjectId(),
      name: message.guild.name,
      guildId: message.guild.id,
      time: message.createdAt,
      updatedAt: message.createdAt,
    });
    return await newGuild.save();
  },
};
