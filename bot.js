const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client();

var everyone = /\@everyone/;

bot.on("ready", () => {
    console.log("Logged in as "+bot.user.username);
    bot.user.setActivity('out for Chains!', { type: 'WATCHING' });
});

bot.on("error", err => {
    console.error(err);
});

bot.on("message", message => {

    if(message.channel.type != "text") return;
    if(message.author.bot) return;

    if((message.content.startsWith("~>chain ") || message.content.startsWith("->chain ")) && message.mentions.members.first().id == config.USER_ID)
    {
        let count = bot.channels.get(config.CHANNEL_ID).name;
        bot.channels.get(config.CHANNEL_ID).edit({name: (parseInt(count)+1).toString()});
        console.log("Up!");
    }

    else if(message.author.id == config.USER_ID && message.content.toLowerCase().indexOf("morning") != -1 && everyone.test(message.content))
    {
        bot.channels.get(config.CHANNEL_ID).edit({name: "0"});
        console.log("Down!");
    }

});

bot.login(process.env.BOT_TOKEN);