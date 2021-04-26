const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "coinflip",
  aliases: ["rzutmoneta"],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!coinflip",
    category: "4fun",
  },
  callback: async (message, args, Discord, client) => {
    const coin = Math.floor(Math.random() * 2);
    let result;
    if (coin === 1) result = " orzeł";
    else result = "a reszka";

    const embed = new MessageEmbed()
      .setTitle("½  Coinflip  ½")
      .setDescription(
        `Rzuciłem monetą dla ciebie, ${message.member}. Wypadł**${result}**!`
      )
      .setFooter(
        message.member.displayName,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  },
};
