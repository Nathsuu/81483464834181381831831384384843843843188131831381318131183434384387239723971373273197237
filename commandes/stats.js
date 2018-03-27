const Discord = require("discord.js");

module.exports.run = async (client, message) => {
 let sicon = message.guild.iconURL;
 var mentionned = message.mentions.users.first();
 var getvalueof;
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
  .addField('Dnd :', ":red_circle: "  + message.guild.members.filter(m => m.presence.status == 'dnd').size, true)
  .addField('Idle :', ":black_circle: "  + message.guild.members.filter(m => m.presence.status == 'idle').size, true)
  .addBlankField() 
  .setTitle(`Information du Discord`)
  .addField("Nom du Discord", message.guild.name)
  .addField("Propriétaire du Serveur", message.guild.owner.user.username)
  .addField("Serveur créer le", message.guild.createdAt, true)
  .addField("Vous avez rejoint le", message.member.joinedAt, true)
  .addField('Vos roles actuels', message.guild.members.get(getvalueof.id).roles.array().map(g => "" + g.name + "").join(', ')) 
  .addBlankField()
  .addField(":floppy_disk: Total serveurs :", client.guilds.size)
  .addField(":floppy_disk: Total utilisateurs :", client.users.size)
  .addField(":floppy_disk: Utilisateurs sur le discord :", message.guild.memberCount)
  .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)
  message.channel.send(embed)

}

module.exports.help = {
  name:"stats"
}
