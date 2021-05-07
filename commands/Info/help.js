const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { prefix } = require("../../config.json");

module.exports = {
  name: "help",
  aliases: ["pomoc"],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!help <opcjonalnie: nazwa komendy>",
    category: "info",
  },
  callback: async (message, args, Discord, client) => {
    const data = [];
    const { commands } = message.client;

    readdirSync("./commands/").forEach((dir) => {
      const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
        file.endsWith(".js")
      );
    });

    if (!args.length) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.charAt(0).toUpperCase() + dir.slice(1),
          value: cmds.length === 0 ? "Niedługo..." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .addField(
          "Poniżej znajdziesz spis moich wszystkich komend.",
          `Mój prefix to \`!\``
        )
        .addFields(categories)
        .setFooter(
          `Pomoc dla ${message.author.username}.`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp();

      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Nie mam takiej komendy!`)
          .setDescription(`Użyj \`!help\` aby zobaczyć listę moich komend!!`)
          .setColor("RANDOM");
        return message.channel.send(embed);
      }

      // let commandAliases;
      // if(!command.aliases || command.aliases === null) commandAliases = 'Nie istnieją';
      // else commandAliases = command.aliases.join(', ');

      // let commandCategory;
      // if(!command.description.category || command.description.category === null) commandCategory = "Nie podano";
      // else commandCategory = commandCategory;

      // const embed = new MessageEmbed()
      // .setColor('RANDOM')
      // .setTitle(`Pomoc dla komendy ${command.name}`)
      // .addFields(
      //   {
      //     name: "Aliasy: ",
      //     value: `\`${commandAliases}\``
      //   },
      //   {
      //     name: "Kategoria: ",
      //     value: `\`${commandCategory}\``
      //   }
      // )

      // const embed = new MessageEmbed()
      //   .setTitle("Command Details:")
      //   .addField("PREFIX:", `\`${prefix}\``)
      //   .addField(
      //     "COMMAND:",
      //     command.name ? `\`${command.name}\`` : "No name for this command."
      //   )
      //   .addField(
      //     "ALIASES:",
      //     command.aliases
      //       ? `\`${command.aliases.join("` `")}\``
      //       : "No aliases for this command."
      //   )
      //   .addField(
      //     "USAGE:",
      //     command.usage
      //       ? `\`${prefix}${command.name} ${command.usage}\``
      //       : `\`${prefix}${command.name}\``
      //   )
      //   .addField(
      //     "DESCRIPTION:",
      //     command.description
      //       ? command.description
      //       : "No description for this command."
      //   )
      //   .setFooter(
      //     `Requested by ${message.author.tag}`,
      //     message.author.displayAvatarURL({ dynamic: true })
      //   )
      //   .setTimestamp()
      //   .setColor(roleColor);

      const { name, aliases } = command;
      const { permissions, requiredRoles } = command.user;
      const { usage, category } = command.description;

      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`Komenda ${name}.`)
        .setDescription(
          `**Aliasy: **\n\`${aliases.join(
            " "
          )}\`\n\n**Potrzebne permisje: **\n\`${
            permissions.join(" ") || "Nie ma."
          }\`\n\n**Potrzebne role: **\n${
            `<@&${requiredRoles}>` || "Nie ma."
          }\n\n**Użytkowość: **\n\`${command.usage}\`\n\n**Kategoria: **\n\`${
            command.category
          }\``
        )
        .setFooter(
          `Komenda wywołana dla ${message.author.username}`,
          message.author.displayAvatarURL()
        )
        .setTimestamp();

      return message.channel.send(embed);
    }
  },
};
