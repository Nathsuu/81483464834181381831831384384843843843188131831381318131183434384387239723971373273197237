const Discord = require("discord.js");

module.exports.run = async (client, message) => {
 let sicon = message.guild.iconURL;
 const embed = new Discord.RichEmbed()
  .setTitle(`Stats du Serveur`)
  .setThumbnail(sicon)
  .setDescription(`Infos sur l'états de status des membre de \`${message.guild.name}\``)
  .setColor("#FF9900")
  .addField('Online:', ":large_blue_circle: "  + message.guild.members.filter(m => m.presence.status == 'online').size, true)
  .addField('Offline:', ":white_circle: "  + message.guild.members.filter(m => m.presence.status == 'offline').size, true)
  .addField('Dnd:', ":red_circle: "  + message.guild.members.filter(m => m.presence.status == 'dnd').size, true)
  .addField('Idle:', ":black_circle: "  + message.guild.members.filter(m => m.presence.status == 'idle').size, true)
  .addBlankField() 
  .setTitle(`Information du Discord`)
  .addField("Nom du Discord", message.guild.name)
  .addField("Propriétaire du serveur", message.guild.owner.user.username)
  .addField("Créer le", message.guild.createdAt, true)
  .addField("Vous avez rejoint", message.member.joinedAt, true)
  .addBlankField()
  .addField(":floppy_disk: Total serveurs :", client.guilds.size)
  .addField(":floppy_disk: Total utilisateurs :", client.users.size)
  .addField(":floppy_disk: Utilisateurs sur le discord :", message.guild.memberCount);
  message.channel.send(embed)

}

module.exports.help = {
  name:"stats"
}
