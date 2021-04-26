const axios = require("axios");

module.exports = {
  name: "docs",
  aliases: ["d"],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: `!docs <słowa kluczowe>`,
    category: "4fun",
  },
  callback: async (message, args, Discord, client) => {
    const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      args
    )}`;

    axios.get(uri).then((embed) => {
      const { data } = embed;

      if (data && !data.error) {
        message.channel.send({ embed: data });
      } else {
        message.reply("Nie znaleziono.");
      }
    });
  },
};
