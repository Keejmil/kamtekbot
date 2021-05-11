module.exports = {
  name: "nickname",
  aliases: ["nick"],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!nickname <nowy nickname>",
    category: "server",
  },
  callback: async (message, args, Discord, client) => {
    if (!message.member.roles.cache.has("827459422493212692")) {
      message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setTitle("Error!")
          .setDescription("Aby zmienić nick tą komendą, musisz zakupić item w sklepie serwerowym! (\`!shop\`)")
          .setFooter(
            `Komenda wywołana dla ${message.author.username}`,
            message.author.displayAvatarURL()
          )
      );
      return;
    }

    const newNickname = args.join(" ");

    try {
      message.member.setNickname(newNickname);
      message.member.roles.remove("827459422493212692");
      message.react("813692209748508692");
    } catch (err) {
      message.react("813692210074746911");
    }
  },
};
