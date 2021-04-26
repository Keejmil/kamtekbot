module.exports = {
  name: "ping",
    aliases: [],
    user: {
        permissions: [],
        requiredRoles: [],
    },
    description: {
        usage: '!ping',
        category: 'info',
    },
    callback : async (message, args, Discord, client) => {
    let waitingEmbed = new Discord.MessageEmbed()
      .setColor("#FF6161")
      .setTitle("Obliczanie pingu...");

    message.channel.send(waitingEmbed).then(async (resultMessage) => {
      const ping =
        (await resultMessage.createdTimestamp) - message.createdTimestamp;
      resultMessage.edit(
        new Discord.MessageEmbed()
          .setColor("#FF6161")
          .setAuthor(`Pong, ${message.author.username}! 🏓`, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(
            `\`${ping}ms\` :green_circle:`
          )
      );
    });
  },
};
