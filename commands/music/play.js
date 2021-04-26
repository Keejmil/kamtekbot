const path = require("path");

module.exports = {
  name: "play",
  aliases: [],
  user: {
    permissions: ["ADMINISTRATOR"],
    requiredRoles: [],
  },
  command: {
    usage: "!play",
    category: "testing",
  },
  callback: async (message, args, Discord, client) => {
    const { voice } = message.member;

    if (!voice.channelID) {
      message.channel.send("Nie jesteś na kanale głosowym!");
      return;
    }

    voice.channel.join().then((connection) => {
      connection.play(path.join(__dirname, "test3.mp3"));
    });
  },
};
