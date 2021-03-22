module.exports = {
    name: "ytsuggest",
    aliases: ['yt-suggest', 'video-suggest'],
    category: "serwer",
    permissions: [],
    async execute(message, args, Discord, client) {
        const channel = message.guild.channels.cache.get('813318393649954826');
        const suggestion = args.join(' ');

        if(!suggestion) return message.reply("Nie podałeś propozycji.");

        const embed = new Discord.MessageEmbed()
        .setColor('#FF0000')
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