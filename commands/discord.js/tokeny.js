const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "tokeny",
  aliases: [],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!tokeny",
    category: "discord.js",
  },
  callback: async (message, args, Discord, client) => {
    let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Jak zbudowane są tokeny?")
      .setImage("https://i.imgur.com/7WdehGn.png")
      .setFooter(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      );

    message.channel.send(embed);
  },
};
