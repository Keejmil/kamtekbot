const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "js",
  aliases: ["learnjs"],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "discord.js",
    category: "4fun",
  },
  callback: async (message, args, Discord, client) => {
    let embed = new MessageEmbed()
      .setColor("YELLOW")
      .setTitle("JavaScript")
      .setDescription(
        "Przed zabraniem się za robienie bota, zaleca się umieć podstawy programowania, najlepiej JavaScript'u.\n\n> **Czemu?**\nWiększość błędów, o których rozwiązanie pytają użytkownicy, byłyby dla nich proste, gdyby umieli JavaScript. \n\n> **No to teraz, jak się tego nauczyć? 🤷‍♀️**\n\nPoniżej przedstawiam przydatne źródła:\n[Poradnik video](https://www.youtube.com/watch?v=PkZNo7MFNFg&t=10298s) od `FreeCodeCamp.com`\nWg. mnie, najlepszy pisemny [poradnik JavaScript](https://eloquentjavascript.net/) autorstwa Marijn Haverbeke\n[Dokumentacja JavaScript'u](https://developer.mozilla.org/en-US/docs/Web/JavaScript) od MDN\n\nPo przeczytaniu / obejrzeniu tych kursów, poznasz podstawy programowania i jesteś gotowy!"
      )
      .setFooter(
        message.author.tag,
        message.author.displayAvatarURL({ dynanic: true })
      );

    message.channel.send(embed);
  },
};
