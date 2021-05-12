const { MessageEmbed } = require("discord.js");

var Scraper = require("images-scraper");
const google = new Scraper({
  puppeteer: {
    headless: true,
  },
});

module.exports = {
  name: "image",
  aliases: ["img", "png", "searchimage"],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!image <słowo/a kluczowe>",
    category: "4fun",
  },
  callback: async (message, args, Discord, client) => {
    const image_query = args.join(" ");
    if (!image_query)
      return message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setTitle("Error!")
          .setDescription(
            "Nie podałeś słów kluczowych!\n\nUżyj `!image <słowo/a kluczowe>`"
          )
          .setFooter(
            `Komenda wywołana dla ${message.author.username}`,
            message.author.displayAvatarURL()
          )
      );

    const image_results = await google.scrape(image_query, 1);
    message.channel.send(
      new MessageEmbed()
        .setTitle(`Obrazek - ${image_query}`)
        .setImage(image_results[0].url)
        .setColor("RANDOM")
        .setFooter(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
    );
  },
};
