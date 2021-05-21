const { MessageEmbed } = require("discord.js");
const thanksSchema = require("../../schemas/thankSchema");

module.exports = {
  name: "leaderboard",
  aliases: ["lb", "thankslb", "thanks-leaderboard", "thanksleaderboard"],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!leaderboard",
    category: "dziękujki",
  },
  callback: async (message, args, Discord, client) => {
    let text = ``;

    const results = await thanksSchema
      .find({})
      .sort({
        received: -1,
      })
      .limit(10);

    for (let counter = 0; counter < results.length; counter++) {
      const { userID, thanks } = results[counter];

      text += `\`${counter + 1}.\` <@${userID}> - \`${thanks}\` podziękowań;\n`;
    }

    let embed = new MessageEmbed()
      .setColor("RED")
      .setTitle("Najbardziej pomocni użytkownicy na serwerze:")
      .setDescription(text)
      .setFooter(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      );

    message.channel.send(embed);
  },
};
