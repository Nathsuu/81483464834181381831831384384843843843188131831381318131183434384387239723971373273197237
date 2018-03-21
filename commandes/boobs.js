const Discord = require("discord.js");

module.exports.run = async (client, msg) => {

    const snek = require('snekfetch');

    var max = 12119;
    var min = 10000;
    var MathRan = Math.floor(Math.random() * (max - min + 0)) + min;
    var MathLoL = Math.round(MathRan);

    if (!msg.channel.nsfw) return msg.channel.send("**:warning: Hum...Comment dire, ce n'est pas un salon pour les grand ici (NSFW)**");

var embed = new Discord.RichEmbed()

.setColor(0x6CD3F9)  
.setTimestamp()
.setAuthor('💦 Recherche de boobs')
.setImage("http://media.oboobs.ru/boobs_preview/" + MathLoL + ".jpg")
.setFooter(`demandé par @${msg.author.username}`)
msg.channel.send(embed);
        }


module.exports.help = {
  name:"boobs"
}
