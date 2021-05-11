const Discord = require("discord.js");
const config = require("./config.json");

// Tworzenie clienta, poprzez którego będziemy się łączyli z Discordem;
const client = new Discord.Client({
  partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
  ws: { properties: { $browser: "Discord iOS" } },
});

// Importowanie plików;
const commandHandler = require("./command-handler");
const eventHandler = require("./event-handler");
const featuresHandler = require("./features");
const mongo = require("./mongo");
const { channels } = require("twitch-api-v5");

// Tworzenie kolekcji;
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

// Event ready;
client.on("ready", async () => {
  console.log("Client is ready!");

  client.user.setActivity(`${client.users.cache.size} użytkowników | ${client.channels.cache.size} kanałów`, { type: "WATCHING" });
  // "Executowanie" plików jako funkcje
  mongo(client, Discord);
  commandHandler(client, Discord);
  featuresHandler.run(client, Discord);
  eventHandler(client, Discord);
});

// Logowanie clienta przez token z configu;
client.login(config.token);