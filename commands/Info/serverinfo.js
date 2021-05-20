const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "serverinfo",
  aliases: ["server-info", "si"],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!server-info",
    category: "info",
  },
  callback: async (message, args, Discord, client) => {
    const { guild } = message;

    const embed = new MessageEmbed()
      .setColor("#a51b9d")
      .setAuthor(
        `Informacje o serwerze ${guild.name}`,
        guild.iconURL({ dynamic: true })
      )
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addFields(
        { name: "Nazwa i ID: ", value: `${guild.name} | ${guild.id}` },
        { name: "Właściciel: ", value: guild.owner.user.tag },
        { name: "Ilość użytkowników: ", value: guild.memberCount },
        {
          name: "Kiedy został utworzony: ",
          value: new Date(guild.createdAt).toLocaleDateString(),
        },
        // { name: "Ilość botów: ", value: guild.members.filter(member => !member.user.bot).size },
        { name: "Ilość kanałów: ", value: guild.channels.cache.size },
        { name: "Ilość ról: ", value: guild.roles.cache.size },
        { name: "Ilość emotek: ", value: guild.emojis.cache.size },
        {
          name: "Ilość botów: ",
          value: message.guild.members.cache.filter((member) => member.user.bot)
            .size,
        }
      );

    message.channel.send(embed);
  },
};
