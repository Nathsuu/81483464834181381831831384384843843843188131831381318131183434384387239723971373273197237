const Discord = require("discord.js");

module.exports.run = async (client, message) => {
   
 if(message.author.id == "282123215537569793"){

  let totalSeconds = (client.uptime / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  let uptime = `${hours} Heure(s), ${minutes} minute(s) et ${seconds} seconde(s)`;
  let sicon = message.guild.iconURL;
  var startTime = Date.now(); 
   
  const embed = new Discord.RichEmbed()
  .setThumbnail(sicon)
  .setColor("#FFEC00")
  .addField(':paperclip: Nom complet', "KroKro'Bot#2356")
  .addField(':id: ID', "441287185749114900")
  .addField(':hash: Descriminateur', "#2356")
  .addField(":triangular_flag_on_post: Nombre de serveurs", client.guilds.size)
  .addField(":map: Nombre de joueurs", client.users.size)  
  .addField(":bust_in_silhouette: Developpeur du bot", "**WinDino#3781**")
  .addField(":computer: OS", "linux")
  .addField(":ping_pong: Ping", `${Date.now() - startTime} ms`)
  .addField(":wrench: CPU", "143.67%")
  .addField(":level_slider: RAM", "134 MB / 1998 MB (7%)")
  .addField(":calendar_spiral: Dernière connexion", uptime)
  .addField(':books: Lib', "Discord.js " + process.version)
  message.channel.send(embed)
 } else {
      message.channel.send("🧠 Vous n'avez pas la permission de faire cette commande. Seul mon créateur le peut.")
 } 
} 
module.exports.help = {
  name: "debug"
}
