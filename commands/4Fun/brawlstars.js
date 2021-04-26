const BrawlStars = require("brawlstars.js");
const values = require("../../values");
const brawlClient = new BrawlStars.Client(values.brawlStarsApiKey);
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "brawlstars",
  aliases: "brawl-stats",
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!brawl-stats <tag gracza>",
    category: "4fun",
  },
  callback: async (message, args, Discord, client) => {
    const userTag = args[0];
    if (!userTag) {
      message.channel.send("Nie podałeś tagu użytkownika!");
      return;
    }

    const player = await brawlClient.getPlayer(userTag);

    player.club.name;

    const embed = new MessageEmbed()
      .setColor("ffdf4c")
      .setAuthor(
        `Statystyki Brawl Stars | Użytkownik: ${player.name}`,
        "https://imgur.com/Ebe27is"
      )
      .addFields(
        { name: `Nazwa: `, value: `${player.name}`, inline: true },
        { name: "Ilość brawlerów: ", value: player.brawlerCount, inline: true },
        {
          name: "Ilość wszystkich zwycięstw: ",
          value: player.totalVictories,
          inline: true,
        },
        {
          name: "Ilość pucharków: ",
          value: `${player.trophies} (najwyższe: ${player.highestTrophies})`,
          inline: true,
        },
        {
          name: "Ilość zwycięstw trio",
          value: player.trioVictories,
          inline: true,
        },
        {
          name: "Ilość zwycięstw solo: ",
          value: player.soloVictories,
          inline: true,
        },
        {
          name: "Ilość zwycięstw duo: ",
          value: player.duoVictories,
          inline: true,
        },
        {
          name: "Ilość StarPowerów: ",
          value: player.starpowersCount,
          inline: true,
        },
        { name: "Ilość gadgetów: ", value: player.gadgetsCount, inline: true }
      )
      .setFooter(
        "Komenda wykonana przez Keejmila",
        message.author.displayAvatarURL({ dynamic: true })
      );

    message.channel.send(embed);
  },
};

// #99202VY0C
