const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "iamdumb",
  aliases: ["dumb", "jestemglupi", "jestemdebilem"],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!iamdumb",
    category: "discord.js",
  },
  callback: async (message, args, Discord, client) => {
    let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Jestem Głupi!")
      .setDescription(
        "Czy faktycznie jesteś głupi, na przykład nie masz głowy do kodowania, czy poprostu brakuje ci doświadczenia i wiedzy, aby zrozumieć kod?\n\nPonieważ jeśli jesteś po prostu głupi, jedyną pomocą, jaką możemy zapewnić w zakresie kodowania botów, jest „nie koduj botów, użyj tych, które istnieją”.\nJeśli po prostu brakuje ci doświadczenia, istnieje rozwiązanie - „po prostu poświęć trochę czasu na naukę języka JavaScript, a wszystko będzie dobrze”.\n\nWiększość ludzi, którzy mówią lub myślą, że są głupi, dzieje się tak tylko dlatego, że wpadają w myśl, że są przytłoczeni wieloma informacjami naraz."
      )
      .setFooter(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();

    message.channel.send(embed);
  },
};
