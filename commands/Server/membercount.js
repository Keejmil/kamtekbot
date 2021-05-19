const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "membercount",
  aliases: ["licznik"],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!membercount",
    category: "server",
  },
  callback: async (message, args, Discord, client) => {
    let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(
        `**Ilość użytkowników na tym serwerze wynosi:** \n\`\`\`${
          message.guild.memberCount
        }\`\`\`\n\n**Keejmil:** \`1\`\n**Osoby:** \`${
          message.guild.members.cache.filter((m) => !m.user.bot).size
        }\`\n**Boty:** \`${
          message.guild.members.cache.filter((m) => m.user.bot).size
        }\``
      )
      .setFooter(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      );

    message.channel.send(embed);
  },
};
