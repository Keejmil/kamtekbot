const Discord = require("discord.js");
const mongoose = require("mongoose");
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

// Tworzenie kolekcji;
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

// Event ready;
client.on("ready", () => {
  console.log("Client is ready!");

  // "Executowanie" plików jako funkcje
  mongo(client, Discord);
  commandHandler(client, Discord);
  featuresHandler.run(client, Discord);
  eventHandler(client, Discord);
});

// Logowanie clienta przez token z configu;
client.login(config.token);