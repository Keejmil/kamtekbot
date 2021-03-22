module.exports = {
  name: "ping",
  aliases: [],
  cooldown: 0,
  permissions: [],
  category: "info",
  async execute(message, args, Discord, client) {
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
