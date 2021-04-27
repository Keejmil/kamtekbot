const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "permisje",
  aliases: ["perms", "permsy", "permissions"],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!permisje",
    category: "discord.js",
  },
  callback: async (message, args, Discord, client) => {
    const embed = new MessageEmbed()
      .setColor("RED")
      .setTitle("Permisje - snippet Discord.JS")
      .addFields(
        {
          name: "Permisje.",
          value:
            "Aby np. sprawdzić permisje, używamy kodu `if(!message.member.hasPermission('NAZWA PERMISJI')) return;`",
        },
        {
          name: "Powyżej znajdziesz spis wszystkich permisji w formacie JSON.", value: "^^^ "
        },
        { name: "\u200B", value: "\u200B" }
      )
      .setDescription(
        "[Znajdziesz to pod tym linkiem (nie będę  tu pisał)](https://raw.githubusercontent.com/sabattle/CalypsoBot/develop/src/utils/permissions.json)"
      )
      .setTimestamp()
      .setFooter(
        `Snippet dla ${message.author.username}. Copyright: Keejmil#6969`,
        message.author.displayAvatarURL({ dynamic: true })
      );

    message.channel.send(embed);
  },
};
