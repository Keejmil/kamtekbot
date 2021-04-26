const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "embed",
  aliases: [],
  user: {
    permissions: ["ADMINISTRATOR"],
    requiredRoles: [],
  },
  description: {
    usage: "!embed",
    category: "server",
  },
  callback: async (message, args, Discord, client) => {
    const text = args.slice(1).join(" ");

    // Send Message In Channel You Want To
    const channel = message.mentions.channels.first();
    if (!channel) return message.reply("Provide A Channel To Send Embed");

    // Embed Options
    const title = text.split("|")[0];
    if (!title) return message.reply("Provide Title For Embed.");
    const description = text.split("|")[1];
    if (!description) return message.reply("Provide Description For Embed.");
    const footer = text.split("|")[2];
    if (!footer) return message.reply("Provide Footer For Embed.");

    // Send Embed
    const embed = new MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .setFooter(footer);
    channel.send(embed); // Send Embed
  },
};