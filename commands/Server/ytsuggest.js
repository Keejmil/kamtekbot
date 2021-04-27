const config = require('../../config.json')

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

    if (!suggestion) return message.reply("Nie podałeś propozycji.");

    const embed = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .addFields({ name: "Propozycja:", value: suggestion })
      .setTimestamp();

    channel
      .send(embed)
      .then((suggestionMessage) => {
        suggestionMessage.react("👍");
        suggestionMessage.react("👎");
      })
      .then(() => {
        message.reply(
          `Twoja sugestia została pomyślnie wysłana na ${channel}.`
        );
      });
  },
};
