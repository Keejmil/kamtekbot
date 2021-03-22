module.exports.run = async (client, Discord) => {
    client.on('guildMemberAdd', (guildMember, user) => {
        const channel = guildMember.guild.channels.cache.get('812301230403485747');

        const embed = new Discord.MessageEmbed()
        .setColor("#FF6161")
        .setAuthor(`Dołączył do nas ${guildMember.user.username} | ${guildMember.user.id}`, guildMember.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`<@${guildMember.user.id}> (\`${guildMember.user.tag}\`) dołączył na serwer!`)
        .addFields(
            {
                name: "Data utworzenia konta:",
                value: new Date(guildMember.user.createdTimestamp).toLocaleDateString(),
            }
        )
        .setFooter(`Liczba członków: ${guildMember.guild.memberCount}`)
        .setTimestamp();

        channel.send(embed);
    })
}

// https://discord.gg/xNCCMX3m