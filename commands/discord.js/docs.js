const axios = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "docs",
  aliases: ["d"],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: `!docs <słowa kluczowe>`,
    category: "4fun",
  },
  callback: async (message, args, Discord, client) => {
    const keywords = args.join(" ");
    if (!keywords) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setTitle("Error!")
          .setDescription(
            "Nie podałeś słów kluczowych!\n\nUżyj np. `!docs message.channel.send`"
          )
          .setFooter(
            `Komenda wywołana dla ${message.author.username}`,
            message.author.displayAvatarURL()
          )
      );
    }

    const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      keywords
    )}`;

    axios.get(uri).then((embed) => {
      const { data } = embed;

      if (data && !data.error) {
        message.channel.send({ embed: data });
      } else {
        message.reply(
          new MessageEmbed()
            .setColor("RED")
            .setTitle("Error!")
            .setDescription(
              "Nie znaleziono takiej klasy/metody/wartości w dokumentacji!\n\nSprawdź, czy nie popełniłeś literówki."
            )
            .setFooter(
              `Komenda wywołana dla ${message.author.username}`,
              message.author.displayAvatarURL()
            )
        );
      }
    });
  },
};
