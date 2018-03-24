const Discord = require("discord.js");

module.exports.run = async (client, msg) => {

    const snek = require('snekfetch');

    var max = 12119;
    var min = 10000;
    var MathRan = Math.floor(Math.random() * (max - min + 0)) + min;
    var MathLoL = Math.round(MathRan);

    if (!msg.channel.nsfw) return msg.channel.send(":x: Cette commande n'est executable que dans un channel NSFW :underage:");

var embed = new Discord.RichEmbed()

.setColor("#FF9900")  
.setImage("http://media.oboobs.ru/boobs_preview/" + MathLoL + ".jpg")
.setFooter("VacBot | Vaction | Demande par " + msg.author.tag, msg.author.displayAvatarURL)
.setTimestamp()
msg.channel.send(embed);
        }


module.exports.help = {
  name:"boobs"
}
