const Discord = require("discord.js");

module.exports.run = async (client, message) => {

 const embed = new Discord.RichEmbed()
  .setTitle(`Info`)
  .setDescription(`Infos sur l'états de status des membre de \`${message.guild.name}\``)
  .setThumbnail(message.guild.iconURL)
  .setColor(0xffffff)
  .setFooter(`©`)
  .addField('Online:', "<:online:379776303743631372>"  + message.guild.members.filter(m => m.presence.status == 'online').size, true)
  .addField('Offline:', "<:offline:379776320349011968>"  + message.guild.members.filter(m => m.presence.status == 'offline').size, true)
  .addField('Dnd:', "<:dnd:379775982149566473>"  + message.guild.members.filter(m => m.presence.status == 'dnd').size, true)
  .addField('Idle:', "<:idle:379775845348409346>"  + message.guild.members.filter(m => m.presence.status == 'idle').size, true)
  message.channel.send(embed)

}

module.exports.help = {
  name:"member"
}
