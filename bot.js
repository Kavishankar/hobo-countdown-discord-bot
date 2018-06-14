const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client();

var everyone = /\@everyone/;

function IncrementName(count){
    let arr = count.split("-");
    arr[1] = (parseInt(arr[1])+1).toString();
    return arr.join("-");
}

function IncrementCounter(channel){
    let count = bot.channels.get(channel).name;
        bot.channels.get(channel).edit({name: IncrementName(count)});
}

function Increment(){
    IncrementCounter(config.DAILY_ID);
    IncrementCounter(config.PERMA_ID);
}

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

    if((message.content.startsWith("~>chain ") || message.content.startsWith("->chain ")) && message.mentions.members.first())
    {
        message.mentions.members.array().forEach(member => {
            if(member.id == config.USER_ID)
                return Increment();
        });
    }

    else if(message.author.id == config.USER_ID && message.content.toLowerCase().indexOf("morning") != -1 && everyone.test(message.content))
    {
        bot.channels.get(config.DAILY_ID).edit({name: "daily-0"});
    }

});

bot.login(process.env.BOT_TOKEN);