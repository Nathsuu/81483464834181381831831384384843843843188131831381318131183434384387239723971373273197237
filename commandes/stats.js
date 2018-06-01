const Discord = require("discord.js");

module.exports.run = async (client, message) => {
 
let totalSeconds = (client.uptime / 1000);
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = totalSeconds % 60;
let uptime = `${hours} heures, ${minutes} minutes et ${seconds} secondes`;
 
 let sicon = message.guild.iconURL;
 var mentionned = message.mentions.users.first();
 var getvalueof;
 var startTime = Date.now(); 
 if(mentionned){
 var getvalueof = mentionned;
 }else {
 var getvalueof = message.author;
 }
 const embed = new Discord.RichEmbed()
  .setTitle(`Stats du Serveur`)
  .setThumbnail(sicon)
  .setDescription(`Infos sur l'états de status des membres de \`${message.guild.name}\``)
  .setColor("#FF9900")
  .addField('Online :', ":large_blue_circle: "  + message.guild.members.filter(m => m.presence.status == 'online').size, true)
  .addField('Offline :', ":white_circle: "  + message.guild.members.filter(m => m.presence.status == 'offline').size, true)
  .addField('Occupé :', ":red_circle: "  + message.guild.members.filter(m => m.presence.status == 'dnd').size, true)
  .addField('Jeux :', ":black_circle: "  + message.guild.members.filter(m => m.presence.status == 'idle').size, true)
  .addBlankField() 
  .setTitle(`Information du Discord`)
  .addField(":floppy_disk: Utilisateurs :", message.guild.memberCount)
  .addField(":floppy_disk: Channels :", message.guild.channels.size) 
  .addField(":floppy_disk: Roles :", message.guild.roles.size)
  .addBlankField() 
  .addField("Humans", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size, true)
  .addField("Bots", message.guild.members.filter(m => m.user.bot).size, true)
  .addBlankField()  
  .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)
  message.channel.send(embed)

}

module.exports.help = {
  name:"stats"
}
