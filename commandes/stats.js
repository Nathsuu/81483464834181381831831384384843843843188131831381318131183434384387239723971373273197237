const Discord = require("discord.js");

module.exports.run = async (client, message) => {

 const embed = new Discord.RichEmbed()
  .setTitle(`Info`)
  .setDescription(`Infos sur l'états de status des membre de \`${message.guild.name}\``)
  .setThumbnail(message.guild.iconURL)
  .setColor(0xffffff)
  .setFooter(`©`)
  .addField('Online:', ":large_blue_circle:"  + message.guild.members.filter(m => m.presence.status == 'online').size, true)
  .addField('Offline:', ":white_circle:"  + message.guild.members.filter(m => m.presence.status == 'offline').size, true)
  .addField('Dnd:', ":red_circle:"  + message.guild.members.filter(m => m.presence.status == 'dnd').size, true)
  .addField('Idle:', ":black_circle:"  + message.guild.members.filter(m => m.presence.status == 'idle').size, true)
  message.channel.send(embed)

}

module.exports.help = {
  name:"stats"
}
