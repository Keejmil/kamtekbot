// Importowanie modułów;
const fs = require("fs");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
// Importowanie prefixu z config'u;
const { prefix } = require("./config.json");

// Tworzenie Mapy do cooldownów;
const cooldowns = new Map();

// Eksportowanie funkcji;
module.exports = async (client, Discord) => {
  // Tworzenie zmiennej, która śledzi foldery w folderze "commands";
  const commandFolders = fs.readdirSync("./commands");

  // Pętla "Dla każdego folderu";
  for (const folder of commandFolders) {
    // Tworzenie zmiennej, która śledzi docelowe pliki komend;
    const commandFiles = fs
      .readdirSync(`./commands/${folder}`)
      .filter((file) => file.endsWith(".js"));

    // Pętla "Dla każdego pliku komend";
    for (const file of commandFiles) {
      const command = require(`./commands/${folder}/${file}`);

      // Ustawianie komend w kolekcji;
      if (command.name) {
        client.commands.set(command.name, command);
        console.log(`Rejestruję komendę ${command.name}`);
      } else {
        continue;
      }
    }
  }

  // Nasłuchiwanie na wiadomości;
  client.on("message", (message) => {
    // Sprawdzanie, czy autorem wiadomości nie jest bot. Chroni to przez "pętlą" bota;
    if (message.author.bot) {
      return;
    }

    // Sprawdzanie, czy wiadomość do bota nie została wysłana w DM'mie;
    if (message.channel.type === "dm") {
      return;
    }

    // Sprawdzanie, czy kontent wiadomości to nie wzmianka bota. Przydaje się to do informacji oraz pomocy;
    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(
            `Pomagam ${message.author.username}.`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            `Witaj!\n\nMój prefix to \`${prefix}\`\nAby uzyskać pomoc, użyj komendy \`!help\``
          )
      );
    }

    const text = 'kamtekbot';
    const funResponse = new RegExp(`^${text}( |)`);
    if (message.content.match(funResponse)) {
      return message.channel.send('Tak sóham?')
  }

    // Chat-Bot;
    if (message.channel.id === "822039637093515274") {
      fetch(
        `https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}&key=8jz4ZA6935Qk9aaBilUwzH9eR`
      )
        .then((response) => response.json())
        .then((data) => {
          message.reply(data.response);
        })
        .catch((err) => {
          message.react("🤷‍♂️");
        });
    }

    // Sprawdzanie docelowe, czy wiadomość zaczyna się prefixem;
    if (!message.content.startsWith(prefix)) {
      return;
    }

    // Definiowanie zmiennej "args";
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command =
      client.commands.get(cmd) ||
      client.commands.find((a) => a.aliases && a.aliases.includes(cmd));
    if (!command) {
      return;
    }

    // if(typeof command.user.permissions != Array) {
    //   throw new Error("Error => Typ permisji musi być w Arrayu.");
    // }

    for (const permission of command.user.permissions) {
      if (!message.member.hasPermission(permission)) {
        message.channel.send(`Nie posiadasz permisji \`${permission}\`!`);
        return;
      } else {
        continue;
      }
    }

    // if(typeof command.user.requiredRoles != Array) {
    //   throw new Error("Error => Typ requiredRole musi być Arrayem.");
    // }

    for (const roleID of command.user.requiredRoles) {
      if (!message.member.roles.cache.has(roleID)) {
        message.channel.send(`Nie posiadasz roli o ID \`${roleID}\`!`);
        return;
      } else {
        continue;
      }
    }

    //If cooldowns map doesn't have a command.name key then create one.
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = command.user.cooldown * 1000;

    //If time_stamps has a key with the author's id then check the expiration time to send a message to a user.
    if (time_stamps.has(message.author.id)) {
      const expiration_time =
        time_stamps.get(message.author.id) + cooldown_amount;

      if (current_time < expiration_time) {
        const time_left = (expiration_time - current_time) / 1000;

        return message.reply(
          `Please wait ${time_left.toFixed(1)} more seconds before using ${
            command.name
          }`
        );
      }
    }

    //If the author's id is not in time_stamps then add them with the current time.
    time_stamps.set(message.author.id, current_time);
    //Delete the user's id once the cooldown is over.
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

    command.callback(message, args, Discord, client);
  });
};
