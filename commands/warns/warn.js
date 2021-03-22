const db = require("../../models/warnSchema");

module.exports = {
  name: "warn",
  permissions: ["ADMINISTRATOR"],
  category: "Moderation / Warn",
  async execute(message, args, Discord, client) {
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!user) {
      message.channel.send("Nie oznaczyłeś osoby, którą chcesz ostrzeżyć.");
      return;
    }

    const reason = args.slice(1).join(" ");

    if (!reason) {
      message.channel.send("Nie podałeś przyczyny.");
      return;
    }

    const guildId = message.guild.id;
    const userId = user.user.id;

    const warning = {
      author: userId,
      timestamp: new Date().getTime(),
      reason: reason,
      moderator: message.author.tag
    };

    await db.findOneAndUpdate(
      {
        guildID: guildId,
        userId: userId,
      },
      {
        guildID: guildId,
        userId: userId,
        $push: {
          warnings: warning,
        },
      },
      {
        upsert: true,
      }
    );

    message.channel.send(
        new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Ostrzeżono użytkownika!")
        .setAuthor()
    )
  },
};
