const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "userinfo",
  aliases: ["user-info", "me", "ui"],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!user-info <opcjonalnie: wzmianka użytkownika>",
    category: "info",
  },
  callback: async (message, args, Discord, client) => {
    const user = message.mentions.users.first() || message.author;
    const guildMember = message.guild.members.cache.get(user.id);

    let userbot;
    if (message.author.bot == true) {
      userbot = "tak.";
    } else {
      userbot = "nie.";
    }

    const embed = new MessageEmbed()
      .setColor("#a51b9d")
      .setAuthor(
        `Informacje o ${user.tag}`,
        user.displayAvatarURL({ dynamic: true })
      )
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        {
          name: "Tag i ID:",
          value: `${user.tag} | ${user.id}`,
        },
        {
          name: "Dołączył do serwera:",
          value: new Date(guildMember.joinedTimestamp).toLocaleDateString(),
        },
        {
          name: "Założył konto: ",
          value: new Date(user.createdTimestamp).toLocaleDateString(),
        },
        { name: "Ilość ról: ", value: guildMember.roles.cache.size },
        { name: "Czy jest botem: ", value: userbot },
        { name: "Nickname: ", value: guildMember.nickname || "Nie istnieje." }
      );

    message.channel.send(embed);
  },
};
