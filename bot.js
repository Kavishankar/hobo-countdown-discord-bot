const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client();

function sendDate(bot){
    var t2 = new Date(config.YEAR, config.MONTH, config.DAY);
    var t1 = new Date();
    var diff = parseInt(((t2-t1)/1000)- (30*24*60*60) - (2*60*60));
    if(diff>0)
        var new_name = diff + " secs";
    else if(diff == 0)
        var new_name = config.MSG;
    else
        return;
    if(bot.channels.get(config.ID))
        bot.channels.get(config.ID).edit({name: new_name});
}

bot.on("ready", () => {
    console.log("Logged in as "+bot.user.username);
    bot.user.setActivity('Party Organiser!', { type: 'PLAYING' });
    setInterval(sendDate,1000,bot);

});

bot.on("error", err => {
    console.error(err);
});

bot.login(process.env.BOT_TOKEN);