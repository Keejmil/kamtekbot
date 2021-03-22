const fs = require("fs");
const fetch = require("node-fetch");

const { prefix } = require("./config.json");

module.exports = (client, Discord) => {
  const commandFolders = fs.readdirSync("./commands");

  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(`./commands/${folder}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`./commands/${folder}/${file}`);
      if (command.name) {
        client.commands.set(command.name, command);
      } else {
        continue;
      }
    }
  }

  client.on("message", (message) => {
    if (message.content.includes("<@452375865901449223>")) {
      if (message.content.startsWith(prefix)) return;
      message.author.send(
        "Witaj! \nPamiętaj, że na serwerze panuje zakaz pingowania Keejmila! Nie rób tego więcej, ponieważ za drugim razem zostaniesz upomniany! (a przy kolejnych dostaniesz mute na 12h)"
      );
    }

    if (message.author.bot) return;

    if (message.channel.id === "822039637093515274") {
      fetch(
        `https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}&key=8jz4ZA6935Qk9aaBilUwzH9eR`
      )
        .then((response) => response.json())
        .then((data) => {
          message.reply(data.response);
        })
        .catch((err) => {
          message.channel.send("Nie udało się połączyć z API.");
        });
    }

    if (!message.content.startsWith(prefix) || message.channel.type === "dm")
      return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command =
      client.commands.get(cmd) ||
      client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(
          `Musisz zaczekać jeszcze ${timeLeft.toFixed(
            1
          )} sekund, aby użyć komendy \`${command.name}\` ponownie.`
        );
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    if (command.permissions) {
      const authorPerms = message.channel.permissionsFor(message.author);
      if (!authorPerms || !authorPerms.has(command.permissions)) {
        return message.reply("You can not do this!");
      }
    }

    if (command) {
      command.execute(message, args, Discord, client, cmd);
    }
  });
};
