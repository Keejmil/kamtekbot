const { MessageEmbed, Message } = require("discord.js");
module.exports = {
  /**
   * @param {Message} message
   */
  name: "quote",
  aliases: [],
  user: {
    permissions: ["ADMINISTRATOR"],
    requiredRoles: [],
  },
  description: {
    usage: "!quote <ID Kanału> <ID Wiadomości>",
    category: "Misc",
  },
  callback: async (message, args, Discord, client) => {
    const channelID = args[0];
    if (!channelID) {
      message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setTitle("Error!")
          .setDescription(
            "Nie podałeś ID kanału, na którym została wysłana wiadomość!\n\nUżyj `!quote <ID Kanału> <ID Wiadomości>`"
          )
          .setFooter(
            `Komenda wywołana dla ${message.author.username}`,
            message.author.displayAvatarURL()
          )
      );
      return;
    }

    const validChannel = message.guild.channels.cache.get(channelID);

    const messageID = args[1];
    if (messageID) {
      message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setTitle("Error!")
          .setDescription(
            "Nie podałeś ID wiadomości!\n\nUżyj \`!quote <ID Kanału> <ID Wiadomości>\`"
          )
          .setFooter(
            `Komenda wywołana dla ${message.author.username}`,
            message.author.displayAvatarURL()
          )
      );
      return;
    }

    validChannel.messages.fetch(messageID).then((msg) => {
      message.channel.send(msg.url)
    })
  },
};
