const config = require("../../config.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ytsuggest",
  aliases: ["yt-suggest"],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!ytsuggest <sugestia>",
    category: "server",
  },
  callback: async (message, args, Discord, client) => {
    if (
      message.content.includes("@everyone") ||
      message.content.includes("@here")
    )
      return;

    const channel = message.guild.channels.cache.get(config.ytSuggestChannelId);
    const suggestion = args.join(" ");

    if (!suggestion)
      return message.reply(
        new MessageEmbed()
          .setColor("RED")
          .setTitle("Error!")
          .setDescription("Nie podałeś sugestii!")
          .setFooter(
            `Komenda wywołana dla ${message.author.username}`,
            message.author.displayAvatarURL()
          )
      );

    const embed = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .addFields({ name: "Propozycja:", value: suggestion })
      .setTimestamp();

    channel.send(embed).then((suggestionMessage) => {
      suggestionMessage.react("👍");
      suggestionMessage.react("👎");
    });

    message.channel.send(
      new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Gotowe!")
        .setDescription(`Pomyślnie wysłano Twoją sugestię na kanał ${channel}`)
        .setFooter(
          `Komenda wywołana dla ${message.author.username}`,
          message.author.displayAvatarURL()
        )
    );
  },
};
