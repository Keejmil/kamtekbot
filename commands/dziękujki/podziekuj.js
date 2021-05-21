const { MessageEmbed } = require("discord.js");
const thankSchema = require("../../schemas/thankSchema");
module.exports = {
  name: "podziekuj",
  aliases: ["thanks", "thank", "dzieki"],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!podziekuj <uzytkownik>",
    category: "dziękujki",
  },
  callback: async (message, args, Discord, client) => {
    let user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user) {
      message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setTitle("Error!")
          .setDescription(
            "Nie podałeś użytkownika, któremu chcesz podziękować!\n\nUżyj `!podziekuj <uzytkownik>`"
          )
          .setFooter(
            `Komenda wywołana dla ${message.author.username}`,
            message.author.displayAvatarURL()
          )
      );
      return;
    }

    if (message.author.id == user.id) {
      message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setTitle("Error!")
          .setDescription("Nie możesz podziękować samemu sobie!")
          .setFooter(
            `Komenda wywołana dla ${message.author.username}`,
            message.author.displayAvatarURL()
          )
      );
      return;
    }

    await thankSchema.findOneAndUpdate(
      {
        userID: user.id,
      },
      {
        $inc: {
          thanks: 1,
        },
      },
      {
        upsert: true,
      }
    );

    message.channel.send(
      new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Udało się!")
        .setDescription(`Pomyślnie podziękowałeś <@${user.id}>.`)
        .setFooter(
          `Komenda wywołana dla ${message.author.username}`,
          message.author.displayAvatarURL()
        )
        .setTimestamp()
    );
  },
};
