   const Discord = require("discord.js");

module.exports.run = async (client, message) => {
   
 if(message.author.id == "282123215537569793"){

 } else {
      message.channel.send(":comet: Vous n'avez pas la permission de faire cette commande. Seul mon créateur le peut.")
 }
let totalSeconds = (client.uptime / 1000);
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = totalSeconds % 60;
let uptime = `${hours} Heure(s), ${minutes} minute(s) et ${seconds} seconde(s)`;
let sicon = message.guild.iconURL;
   
  const embed = new Discord.RichEmbed()
  .setThumbnail(sicon)
  .setColor("#FF9900")
  .addField(':paperclip: Nom complet', "Vaction#7169")
  .addField(':id: ID', "417993047427776512")
  .addField(':hash: Descriminateur', "#7169")
  .addField(":triangular_flag_on_post: Nombre de serveurs", client.guilds.size)
  .addField(":bust_in_silhouette: Developpeur du bot", "**WinDino#3781**")
  .addField(":computer: OS", "linux")
  .addField(":mouse_three_button: Config", "(x64) Intel Core Processor (Haswell, no TSX) @ 3092 MHz")
  .addField(":scales: PID", "24787")
  .addField(":wrench: CPU", "143.67%")
  .addField(":level_slider: RAM", "134 MB / 1998 MB (7%)")
  .addField(":calendar_spiral: Dernière connexion", uptime)
  .addField(':books: Lib', "Discord.js " + process.version)
  message.channel.send(embed)
  
} 
module.exports.help = {
  name: "debug"
}
