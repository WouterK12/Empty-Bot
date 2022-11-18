const { client } = require("../bot");
const { Collection, PermissionsBitField } = require("discord.js");
const { InteractionType } = require("discord-api-types/v10");

client.on("interactionCreate", async (interaction) => {
  if (interaction.type !== InteractionType.ApplicationCommand) return;

  const commandName = interaction.commandName;
  const command = client.commands.get(commandName);
  if (command == null) return;

  if (interaction.guild) {
    // if bot has permissions to send in the current channel (guild)
    if (
      interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.SendMessages) ==
      false
    )
      return;
  }

  // cooldown
  if (client.cooldowns.has(command.name) == false) {
    client.cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = client.cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 0) * 1000;

  if (timestamps.has(interaction.user.id)) {
    const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      const waitMessage = `${interaction.user.username}, please wait \`${timeLeft.toFixed(1)}\` more second${
        timeLeft == 1 ? "" : "s"
      } before reusing that command.`;

      interaction.reply({
        content: waitMessage,
        ephemeral: true,
      });

      return;
    }
  }

  // init cooldown
  timestamps.set(interaction.user.id, now);
  setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

  try {
    command.execute(interaction);
  } catch (err) {
    console.log(`Error executing command (${command.name})\n${err}`);
    interaction.reply({
      content: "Whoops! Something went wrong!\nPlease try again later.",
      ephemeral: true,
    });
  }
});
