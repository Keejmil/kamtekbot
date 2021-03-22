const { prefix } = require("../../config.json");

module.exports = {
  name: "help",
  aliases: ["pomoc"],
  permissions: [],
  cooldown: 0,
  category: "info",
  async execute(message, args, Discord, client) {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      data.push("Komenda HELP.\n\n");
      data.push(`Mój prefix to \`${prefix}\`.\n`);
      data.push(`Poniżej znajdziesz listę moich komend:\n`);
      data.push(commands.map((command) => command.name).join(", "));
      data.push(
        `\n\nAby odnaleźć pomoc do konkretnej komendy, użyj komendy \`${prefix}help <nazwa komendy>\``
      );

      return message.author
        .send(data, { split: true })
        .then(() => {
          if (message.channel.type === "dm") return;
          message.reply(`Dostałeś nową wiadomość!`);
        })
        .catch((err) => {
          message.reply(
            `Nie udało mi się wysłać wiadomości do \`${message.author.tag}\`.`
          );
        });
    } else {
      const name = args[0].toLowerCase();
      const command =
        commands.get(name) ||
        commands.find((c) => c.aliases && c.aliases.includes(name));

      if (!command) {
        return message.reply("Taka komenda nie istnieje!");
      }

      data.push(`**Komenda:** ${command.name}`);

      if (command.aliases)
        data.push(`**Aliases:** ${command.aliases.join(", ")}`);
      if (command.description) data.push(`**Kategoria:** ${command.category}`);
      if (command.cooldown) data.push(`**Cooldown**: ${command.cooldown}`);
      if (command.permissions) data.push(`**Potrzebne permisje**: ${command.permissions}`);

      message.channel.send(data, { split: true });
    }
  },
};
