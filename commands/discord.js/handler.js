const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "handler",
  aliases: [],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!handler",
    category: "discord.js",
  },
  callback: async (message, args, Discord, client) => {
    let embed = new MessageEmbed()
      .setColor("#FF0000")
      .setTitle("Handler")
      .setURL("https://youtu.be/met3HA8ML2o")
      .setFooter(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();

    message.channel.send(embed);
  },
};
