const config = require("../../config.json");

module.exports = {
  name: "suggest",
  aliases: [],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!suggest <sugestia>",
    category: "server",
  },
  callback: async (message, args, Discord, client) => {
    if (
      message.content.includes("@everyone") ||
      message.content.includes("@here")
    )
      return;

    const channel = message.guild.channels.cache.get(config.suggestChannelId);
    const suggestion = args.join(" ");

    if (!suggestion)
      return message.channel.send(
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
      .setColor("#818181")
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .addFields(
        { name: "Propozycja:", value: suggestion },
        { name: "Status: ", value: "Wysłane." }
      )
      .setTimestamp();

    channel
      .send(embed)
      .then((suggestionMessage) => {
        suggestionMessage.react("👍");
        suggestionMessage.react("👎");
      })
      .then(() => {
        message.channel.send(
          new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Gotowe!")
            .setDescription(
              `Pomyślnie wysłano Twoją sugestię na kanał ${channel}`
            )
            .setFooter(
              `Komenda wywołana dla ${message.author.username}`,
              message.author.displayAvatarURL()
            )
        );
      });
  },
};
