const { MessageEmbed, Message } = require("discord.js");
module.exports = {
  name: "niedziala",
  aliases: ["notworking"],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!niedziala",
    category: "discord.js",
  },
  callback: async (message, args, Discord, client) => {
    const embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle("Nie działa mi kod z poradnika!")
      .setDescription(
        `Jeżeli nie działa, napewno to ty za tym stoisz.\n\nSkoro na poradniku wszystko działa, tobie też powinno działać.\nSprawdź, czy nie masz w kodzie np. literówek.`
      )
      .setFooter(
        `Snippet dla ${message.author.username}. Copyright: Keejmil#6969`,
        message.author.displayAvatarURL({ dynamic: true })
      );

    message.channel.send(embed);
  },
};
