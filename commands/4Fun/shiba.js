const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "shiba",
  aliases: ['shibe'],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: '!shiba',
    category: '4fun'
  },
  callback : async (message, args, Discord, client) => {
    const res = await fetch("http://shibe.online/api/shibes");
    const img = (await res.json())[0];
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
