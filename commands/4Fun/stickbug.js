const fetch = require("node-fetch");

module.exports = {
  name: "stickbug",
  aliases: [],
  permissions: [],
  cooldown: 0,
  category: "4fun",
  async execute(message, args, Discord, client) {
    let user = message.mentions.users.first() || message.author;
    let avatar = user.avatarURL({
      format: "png",
      dynamic: false,
      size: 1024,
    });

    message.channel.send("Ładowanie... Może to potrwać aż minutę.");
    try {
      const res = await fetch(
        encodeURI(
          `https://nekobot.xyz/api/imagegen?type=stickbug&url=${avatar}`
        )
      );
      const vid = (await res.json()).message;

      const attachment = new Discord.MessageAttachment(vid, `${user.tag}-stickbug.mp4`);
      message.channel.send(attachment);
    } catch (err) {
      console.log(err);
    }
  },
};
