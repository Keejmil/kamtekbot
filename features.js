const fs = require('fs');

module.exports.run = (client, Discord) => {
    const featureFiles = fs.readdirSync('./features').filter(file => file.endsWith('.js'));
    
    for(const file of featureFiles) {
        const feature = require(`./features/${file}`);
        feature(client, Discord);
    }
}