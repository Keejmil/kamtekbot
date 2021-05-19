const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "promises",
  aliases: [],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!promises",
    category: "discord.js",
  },
  callback: async (message, args, Discord, client) => {
    let embed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle('"Promises" w JavaScript\'cie - co to?')
      .setDescription(
        'Jak sama nazwa wskazuje (mniej oczywiste) - " You give a promise something to do and it owes you a response later on in your code"\nZapisujesz w kodzie, aby coś wykonało się, lecz później.\n\nJeżeli chcesz wiedzieć więcej niż co to jest, polecam [ten artykuł](https://js.evie.dev/promises).'
      )
      .setFooter(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      );

    message.channel.send(embed);
  },
};
