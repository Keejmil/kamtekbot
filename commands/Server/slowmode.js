const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "slowmode",
  aliases: ["sm"],
  user: {
    permissions: ["MANAGE_CHANNELS"],
    requiredRoles: [],
  },
  description: {
    usage: "!slowmode <ilość sekund | off>",
    category: "serwer",
  },
  callback: async (message, args, Discord, client) => {
    const newLimit = args[0];
    if (!newLimit) {
      message.channel.send(
        new MessageEmbed()
          .setTimestamp()
          .setColor("RED")
          .setTitle("Error!")
          .setDescription(
            "Nie podałeś nowego slowmode'u!\n\nUżyj `!slowmode <ilość sekund | off>`"
          )
          .setFooter(
            `Komenda aktywowana przez ${message.author.username}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
      );
      return;
    }

    if (newLimit === "off") {
      message.channel.setRateLimitPerUser(0);
      message.react("813692209748508692");
      return;
    }

    if (isNaN(newLimit)) {
      message.channel.send(
        new MessageEmbed()
          .setTimestamp()
          .setColor("RED")
          .setTitle("Error!")
          .setDescription(
            "Nie podałeś prawidłowego nowego slowmode'u!\n\nUżyj `!slowmode <ilość sekund | off>`"
          )
          .setFooter(
            `Komenda aktywowana przez ${message.author.username}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
      );
      return;
    }

    try {
      message.channel.setRateLimitPerUser(newLimit);
      message.react("813692209748508692");
    } catch (err) {
      message.react("813692210074746911");
    }
  },
};
