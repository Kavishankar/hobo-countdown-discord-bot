const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client();

let count_channel = bot.channels.get(config.CHANNEL_ID);
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
        count_channel.name = count_channel.name + 1;
    }

    else if(message.author.id == config.USER_ID && message.content.toLowerCase().indexOf("morning") != -1 && everyone.test(message.content))
    {
        count_channel.name = 0;
    }

});

bot.login(process.env.BOT_TOKEN);