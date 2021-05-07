const { MessageEmbed, Message } = require("discord.js");
module.exports = {
  name: "pin1",
  aliases: [],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!pin1",
    category: "info",
  },
  callback: async (message, args, Discord, client) => {
    const embed = new MessageEmbed()
      .setTitle(";)")
      .setURL("https://sjp.pwn.pl/")
      .setFooter(
        `Komenda wywołana dla ${message.author.username}`,
        message.author.displayAvatarURL()
      );

      message.channel.send(embed)
  },
};
