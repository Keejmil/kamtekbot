const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "8ball",
  aliases: [],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!8ball <pytanie>",
    category: "4fun",
  },
  callback: async (message, args, Discord, client) => {
    const answers = [
      "Definitywnie tak.",
      "Definitywnie nie.",
      "Tak, ale nie jestem pewien.",
      "Nie, ale nie jestem pewien.",
      "I ty się mnie oto pytasz?",
      "Nie znam odpowiedzi.",
      "Nie mogę rozwiązać pytania.",
      "Daj mi dłuższą chwilę...",
      "Nie mam teraz czasu.",
      "Daj mi spokój!",
      "Nie licz na to.",
      "To zależy.",
      "Moja odpowiedź to nie.",
      "Może zapytaj później.",
      "Nie mogę ci teraz powiedzieć.",
      "Moje źródła mówią nie.",
      "Tak.",
      "Nie.",
      "Lepiej będzie, jak ci nie powiem.",
      "Sam sobie odpowiedz.",
      "Oczywiście, że tak.",
      "Oczywiście, że nie.",
    ];

    const question = args.join(" ");
    if (!question) {
      message.channel.send("Nie podano pytania.");
      return;
    }

    const answer = answers[Math.floor(Math.random() * answers.length)];

    const embed = new MessageEmbed()
      .setColor("BLUE")
      // .setAuthor(message.author.displayAvatarURL({ dynamic: true }), `Odpowiedź na pytanie.`)
      .addFields(
        { name: "Pytanie: ", value: question },
        { name: "Odpowiedź: ", value: `||${answer}||` }
      )
      .setTimestamp();

    message.channel.send(embed);
  },
};
