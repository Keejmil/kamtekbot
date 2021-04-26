module.exports = {
  name: "nickname",
  aliases: ["nick"],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!nickname <nowy nickname>",
    category: "server",
  },
  callback : async (message, args, Discord, client) => {
    if (!message.member.roles.cache.has("827459422493212692")) {
      message.channel.send(
        "Nie możesz zmienić swojego nickname'u, ponieważ nie kupiłeś itemu w sklepie!"
      );
      return;
    }

    const newNickname = args.join(" ");

    try {
      message.member.setNickname(newNickname);
      message.member.roles.remove("827459422493212692");
      message.react("813692209748508692");
    } catch (err) {
      message.react("813692210074746911");
    }
  },
};
