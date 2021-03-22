module.exports.run = (client, Discord) => {
  client.on("guildMemberAdd", (GuildMember) => {
    GuildMember.channels.cache
      .get("815313113112903780")
      .setName(`┇👥┇ Jest nas ${GuildMember.guild.memberCount}!`);
  });

  client.on("guildMemberRemove", (guildMember) => {
    GuildMember.channels.cache
      .get("815313113112903780")
      .setName(`┇👥┇ Jest nas ${GuildMember.guild.memberCount}!`);
  });
};
