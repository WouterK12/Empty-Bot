const { client } = require("../index");
const discord = require("discord.js");

client.on("message", async (message) => {
  if (message.author.bot) return;

  const prefix = process.env.PREFIX;
  if (!message.content.toLowerCase().startsWith(prefix)) return;

  // arguments
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // find if command exists
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  // no such command
  if (!command) return;

  // not executable in dm
  if (command.guildOnly && !message.guild) {
    return message.channel.send(
      "Sorry, this command cannot be executed in DM's."
    );
  }

  // if bot has permissions to send in the current channel (guild)
  if (
    message.guild &&
    !message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")
  ) {
    return;
  }

  // cooldown
  if (!client.cooldowns.has(command.name)) {
    client.cooldowns.set(command.name, new discord.Collection());
  }

  const now = Date.now();
  const timestamps = client.cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 0) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(1)} more second${
          timeLeft == 1 ? "" : "s"
        } before reusing that command.`
      );
    }
  }

  // init cooldown
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (err) {
    console.log(`Error executing command (${command.name}):\n${err}`);
    message.channel.send(`Whoops, something went wrong!\nTry again later.`);
  }
});
