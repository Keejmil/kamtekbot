var api = require("twitch-api-v5");
const _ = require("lodash");
var moment = require("moment");

api.clientID = "vhpnzn59f5gz49tdbjkisz6w932sen";

module.exports = {
  name: "twitchinfo",
  aliases: ["twitch-info", "twitchstats", "twitch-stats"],
  user: {
    permissions: [],
    requiredRoles: [],
  },
  description: {
    usage: "!twitchinfo <nazna streamera>",
    category: "4fun",
  },
  callback : async (message, args, Discord, client) => {
    api.search.channels({ query: `${args[0]}` }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        let final = _.first(res.channels);
        console.log(final);

        let broadcasterType = final.broadcaster_type;
        if (broadcasterType === "") {
          broadcasterType = "None";
        } else if (broadcasterType === "affiliate") {
          broadcasterType = "Affiliate";
        } else if (broadcasterType === "partner") {
          broadcasterType = "Partner";
        }

        let created = moment(final.created_at).format("DD-MM-YYYY");
        let lastLive = moment(final.updated_at).format("DD-MM-YYYY, HH:mm");

        const twitchEmbed = new Discord.MessageEmbed()
          .setColor("#6441a5")
          .setAuthor(
            `   │   ${final.display_name}`,
            client.user.displayAvatarURL()
          )
          .setDescription(`${final.description}`)
          .addField(
            "Ostatni stream:",
            `${final.status}\f
                   Gra: \`${final.game}\``
          )
          .addField("Obserwujący:", final.followers.toLocaleString(), true)
          .addField("Wyświetlenia:", final.views.toLocaleString(), true)
          .addField("Broadcaster Type", broadcasterType)
          .addField("Konto założone:", created, true)
          .addField("Ostatni stream:", lastLive, true)
          .setThumbnail(final.logo)
          .setFooter(`URL: ${final.url}`);

        message.channel.send(twitchEmbed);
      }
    });
  },
};

// vhpnzn59f5gz49tdbjkisz6w932sen
