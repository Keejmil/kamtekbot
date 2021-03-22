module.exports = {
    name: "suggest",
    aliases: [],
    cooldown: 60,
    category: "serwer",
    async execute(message, args, Discord, client) {
        if(message.content.includes('@everyone') || message.content.includes('@here')) return

        const channel = message.guild.channels.cache.get('813058397532323900');
        const suggestion = args.join(' ');

        if(!suggestion) return message.reply("Nie podałeś propozycji.");

        const embed = new Discord.MessageEmbed()
        .setColor('#818181')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .addFields(
            { name: "Propozycja:", value: suggestion }
            )
        .setTimestamp();

        channel.send(embed).then(suggestionMessage => {
            suggestionMessage.react('👍');
            suggestionMessage.react('👎');
        }).then(() => {
            message.reply(`Twoja sugestia została pomyślnie wysłana na ${channel}.`);
        })

    }
}