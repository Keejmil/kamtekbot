const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "snippets",
  aliases: ["snippet"],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!8ball <temat>",
    category: "discord.js",
  },
  callback: async (message, args, Discord, client) => {
    if (args[0] == "embed" || "MessageEmbed" || "embeds") {
      const embed = new MessageEmbed()
        .setColor("RED")
        .setTitle("Embedy - snippet Discord.JS")
        .addFields(
          {
            name: "Metody: ",
            value:
              "Aby do embeda dodać jakąś treść, musimy to zrobić **metodami**. Poniżej przedstawię kilka, a tak na prawdę najważniejsze z nich. ",
          },
          {
            name: "setColor()",
            value: "Ustawia kolor wiadomości embed",
            inline: true,
          },
          {
            name: "setTitle()",
            value: "Ustawia tzw. tytuł embeda.",
            inline: true,
          },
          {
            name: "setAuthor()",
            value: "Ustawia tzw. autora embeda.",
            inline: true,
          },
          {
            name: "setURL()",
            value:
              "Ustawia adres URL, który ma się włączyć, gdy tytuł zostanie kliknięty.",
            inline: true,
          },
          {
            name: "setImage()",
            value:
              "Ustawia zdjęcie, które ma zostać pokazane. Może to być ścieżka do pliku lub adres URL",
            inline: true,
          },
          {
            name: "setThumbnail()",
            value: "Podobnie jak setImage() - ustawia zdjęcie.",
            inline: true,
          },
          {
            name: "addField / addFields",
            value: "dodaje tzw. fieldy do wiadomości embed.",
            inline: true,
          },
          {
            name: "setFooter()",
            value: "Ustawia tzw. footer embeda.",
            inline: true,
          },
          {
            name: "setTimestamp()",
            value: "Dodaje datę do embeda (nie potrzeba podawać parametrów",
            inline: true,
          }
        )
        .setTimestamp();

      return message.channel.send(embed);
    }
    if (args[0] === "permissions" || "permisje" || "perms") {
      const embed = new MessageEmbed()
        .setColor("RED")
        .setTitle("Permisje - snippet Discord.JS")
        .addFields(
          {
            name: "Permisje.",
            value:
              "Aby np. sprawdzić permisje, używamy kodu `if(!message.member.hasPermission('NAZWA PERMISJI')) return;`",
          },
          {
            name:
              "Poniżej znajdziesz spis wszystkich permisji w formacie JSON.",
          },
          { name: "\u200B", value: "\u200B" }
        )
        .setDescription(
          "[Znajdziesz to pod tym linkiem (nie będę  tu pisał)](https://raw.githubusercontent.com/sabattle/CalypsoBot/develop/src/utils/permissions.json)"
        )
        .setTimestamp()
        .setFooter(
          `Snippet dla ${message.author.username}. Copyright: Keejmil#6969`,
          message.author.displayAvatarURL({ dynamic: true })
        );

      return message.channel.send(embed);
    }
  },
};
