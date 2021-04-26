const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["pfp"],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!avatar <opcjonalnie: wzmianka użytkownika>",
    category: "4fun",
  },
  callback: async (message, args, Discord, client) => {
    const user = message.mentions.users.first() || message.author;

    const embed = new MessageEmbed()
      .setColor("RED")
      .setTitle(`Zdjęcie profilowe użytkownika ${user.username}`)
      .setImage(user.displayAvatarURL({ dynamic: true }));

    message.channel.send(embed);
  },
};
