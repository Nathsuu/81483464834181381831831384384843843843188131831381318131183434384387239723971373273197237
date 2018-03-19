const Discord = require("discord.js");
const request = require('snekfetch');
const fs = require("fs")

exports.run = (bot, message, args) => {
    var max = 5244;
    var min = 1000;
    var MathRan = Math.floor(Math.random() * (max - min + 0)) + min;
    var MathLoL = Math.round(MathRan);
    if (!message.channel.nsfw) {
        message.channel.send(":x: Cette commande est executable dans un channel NSFW :underage:.")
       
    var subreddits = [
        'pussy',
        'rearpussy',
        'simps',
        'vagina',
        'MoundofVenus',
        'PerfectPussies',
        'spreading'
        'e-girl'        
    ]        
    } else {
        
        
        var randomname = Math.floor(Math.random() * (99999999999999999999 - 11111111111111111111 + 0)) + 11111111111111111111;
        request.get("http://media.obutts.ru/butts_preview/0" + MathLoL + ".jpg").then(r => {
            fs.writeFile(`${randomname}.jpg`, r.body)
        
          //  message.channel.send(r.body)
            message.channel.sendFile(r.body).then(d => {
                fs.unlink(`./${randomname}.jpg`)
            })
        })
    }
}
