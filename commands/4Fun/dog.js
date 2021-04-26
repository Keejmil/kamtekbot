const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "dog",
  aliases: ["pies"],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!dog",
    category: "4fun",
  },
  callback: async (message, args, Discord, client) => {
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const img = (await res.json()).message;
    const embed = new MessageEmbed()
      .setTitle("🐶  Woof!  🐶")
      .setImage(img)
      .setFooter(
        message.member.displayName,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  },
};
