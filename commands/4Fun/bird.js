const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "bird",
  aliases: ["ptak", "ptaszek"],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!bird",
    category: "4fun",
  },
  callback: async (message, args, Discord, client) => {
    const res = await fetch("http://shibe.online/api/birds");
    const img = (await res.json())[0];
    const embed = new MessageEmbed()
      .setTitle("🐦  Chirp!  🐦")
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