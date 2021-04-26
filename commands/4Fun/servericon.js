const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "servericon",
  aliases: ["serwer-icon", "serveravatar", "serweravatar"],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!serwer-icon",
    category: "4fun",
  },
  callback : async (message, args, Discord, client) => {
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`Avatar serwera ${message.guild.name}`)
      .setURL(message.guild.iconURL())
      .setImage(message.guild.iconURL({ size: 1000 }))
      .setFooter(
        `Komenda wykonana na życzenie ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );

    message.channel.send(embed);
  },
};
