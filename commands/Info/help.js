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

      const ignoredCategories = ["owner"];
      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands
          .filter((command) => {
            let file = require(`../../commands/${dir}/${command}`);

            return !file.hidden;
          })
          .map((command) => {
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

      if (!command || command.hidden == true) {
        let embed = new MessageEmbed()
          .setTitle(`Nie mam takiej komendy!`)
          .setDescription(`Użyj \`!help\` aby zobaczyć listę moich komend!!`)
          .setColor("RANDOM");
        return message.channel.send(embed);
      }

      // Szczegołowa komenda help;

      let embed = new MessageEmbed();

      embed.setColor("RANDOM");
      embed.addField({
        name: "Komenda: ",
        value: `\`${this.name}\``,
        inline: true,
      });
      embed.addField({
        name: "Aliasy (inne nazwy tej komendy): ",
        value: this.aliases
          ? `\`${this.aliases.join("` `")}\``
          : "Nie istnieją.",
        inline: true,
      });
      embed.addField({
        name: "Potrzebne permisje: ",
        value: this.user.permissions
          ? `\`${this.user.permissions.join("` `")}\``
          : "Nie istnieją.",
        inline: true,
      });
      embed.addField({
        name: "Potrzebne role: ",
        value: this.user.requiredRoles
          ? `\`${this.user.requiredRoles.join("` `")}\``
          : "Nie istnieją.",
        inline: true,
      });
      embed.addField({
        name: "Składnia: ",
        value: this.description.usage || "Nie podano!",
        inline: true,
      });
      embed.addField({
        name: "Kategoria: ",
        value:
          this.description.category.charAt(0).toUpperCase() +
          this.description.category.slice(1),
        inline: true,
      });

      return message.channel.send(embed);
    }
  },
};
