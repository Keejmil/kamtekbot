const { MessageEmbed, Message } = require("discord.js");
module.exports = {
  name: "quote",
  aliases: [],
  user: {
    permissions: ["MANAGE_MESSAGES"],
    requiredRoles: [],
  },
  description: {
    usage: "!quote <ID Wiadomości>",
    category: "Misc",
  },
  callback: async (message, args, Discord, client) => {
    const channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]);
    if (!channel) {
      message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setTitle("Error!")
          .setDescription(
            "Nie podałeś kanału!\n\nUżyj `!quote <kanał> <id wiadomości>`"
          )
          .setFooter(
            `Komenda wywołana dla ${message.author.username}`,
            message.author.displayAvatarURL()
          )
      );
      return;
    }

    const messageID = args[1];
    if (!messageID) {
      message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setTitle("Error!")
          .setDescription(
            "Nie podałeś ID wiadomości!\n\nUżyj `!quote <kanał> <id wiadomości>`"
          )
          .setFooter(
            `Komenda wywołana dla ${message.author.username}`,
            message.author.displayAvatarURL()
          )
      );
    }

    const reason = args.slice(2).join(' ');

    const embed = new MessageEmbed()
      .setColor("#36393f")
      .setAuthor(
        `Na prośbę ${message.author.tag} | ${message.author.id}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `**[SKOCZ DO WIADOMOŚCI](${`https://discord.com/channels/${message.guild.id}/${channel.id}/${messageID}`}) z kanału <#${
          channel.id
        }>**\n\n**Notka:** ${reason || "Nie podano!"}`
      );

    message.channel.send(embed);
  },
};
