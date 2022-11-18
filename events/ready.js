const { client } = require("../bot");
const { ActivityType } = require("discord.js");

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user.setActivity("/help", {
    type: ActivityType.Listening,
  });
});
