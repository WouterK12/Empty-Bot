const { client } = require("../index");

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user.setActivity(process.env.PREFIX, {
    type: "LISTENING",
  });

  const guilds = client.guilds.cache.size;
  console.log(`Currently in ${guilds} guilds.`);
});
