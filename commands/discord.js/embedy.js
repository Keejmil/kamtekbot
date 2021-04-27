const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "embedy",
  aliases: ["embeds"],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!embedy",
    category: "discord.js",
  },
  callback: async (message, args, Discord, client) => {
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

    message.channel.send(embed);
  },
};
