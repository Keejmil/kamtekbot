const { get, create, url } = require('sourcebin');

module.exports = {
    name: 'sourcebin',
    aliases: [],
    user: {
        permissions: [],
        requiredRoles: [],
    },
    description: {
        usage: '!sourcebin <nazwa dokumentu> <treść dokumentu>',
        category: '4fun',
    },
    callback : async (message, args, Discord, client) => {
        const title = args[0];
        if(!title) {
            message.channel.send("Nie podałeś tytułu tej wklejki!");
            return;
        }

        const content = args.slice(1).join(' ');
        if(!content) {
            message.channel.send("Nie podałeś treści wklejki!");
            return;
        }

        const bin = await create(
            [
                {
                    content
                }
            ],
            {
                title,
                description: "paste made with KamTekBot on Discord."
            }
        ).then(value => {
            message.channel.send(`Twoją wklejkę znajdziesz pod tym linkiem:\n\n${value.url}`)
        })
    }
}