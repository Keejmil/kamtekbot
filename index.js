const Discord = require('discord.js');
const mongoose = require('mongoose');

const client = new Discord.Client();

const commandHandler = require('./command-handler')
const featuresHandler = require('./features');

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

client.on('ready', () => {
    console.log("Client is ready!");

    mongoose.connect('mongodb+srv://keejmil:pFYrHdQnLFkTjGo7@discordbot.czrjh.mongodb.net/DiscordBot?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(() => {
        console.log("Połączono z bazą danych.");
    }).catch((err) => {
        console.log(err)
    })

    commandHandler(client, Discord);
    featuresHandler.run(client, Discord);
})

client.login('ODA5MTIzNjcwNDQxMzI4NzIw.YCQhIw.FKwEhxX04WyArsImkNvd0A3T8F4');