const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  guildId: String,
  time: String,
  updatedAt: String,
});

module.exports = mongoose.model("Guild", guildSchema, "guilds");
