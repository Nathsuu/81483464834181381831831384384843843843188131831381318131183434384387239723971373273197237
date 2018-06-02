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
  .setColor("#FF9900")
  .addField(':paperclip: Nom complet', "Vaction#7169")
  .addField(':id: ID', "417993047427776512")
  .addField(':hash: Descriminateur', "#7169")
  .addField(":triangular_flag_on_post: Nombre de serveurs", client.guilds.size)
  .addField(":map: Nombre d'utilisateurs", client.users.size)  
  .addField(":bust_in_silhouette: Developpeur du bot", "**WinDino#3781**")
  .addField(":computer: OS", "linux")
  .addField(":ping_pong: Ping", `${Date.now() - startTime} ms`)
  .addField(":calendar_spiral: Dernière connexion", uptime)
  .addField(':books: Lib', "Discord.js " + process.version)
  .addField(":calling: Invitation", "Lien [ICI](https://discordapp.com/oauth2/authorize?client_id=417993047427776512&scope=bot&permissions=2146958583)")
  message.channel.send(embed)
 } else {
      message.channel.send(":comet: Vous n'avez pas la permission de faire cette commande. Seul mon créateur le peut.")
 } 
} 
module.exports.help = {
  name: "debug"
}
