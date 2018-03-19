const Discord = require("discord.js");
const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const fs = require("fs")

exports.run = (bot, message, args) => {
    if (!message.channel.nsfw) return message.channel.send(":x: Cette commande est executable dans un channel NSFW :underage:.")

    var subreddits = [
        'pussy',
        'rearpussy',
        'simps',
        'vagina',
        'MoundofVenus',
        'PerfectPussies',
        'spreading'
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    randomPuppy(sub)
            .then(url => {
                var randomname = Math.floor(Math.random() * (99999999999999999999 - 11111111111111111111 + 0)) + 11111111111111111111;
                request.get(url).then(r => {
                    fs.writeFile(`${randomname}.jpg`, r.body)
                    message.channel.sendFile(r.body).then(d => {
                        fs.unlink(`./${randomname}.jpg`)
                })
            })
        })
}
