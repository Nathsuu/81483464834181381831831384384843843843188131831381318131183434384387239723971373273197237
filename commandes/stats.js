exports.run = async(client, message, args, config, { MessageEmbed }) => {

  const embed = new MessageEmbed()
  .setTitle(`Etat d'${config.name}`)
  .setDescription(`Infos sur l'états de status des membre de \`${message.guild.name}\``)
  .setThumbnail(message.guild.iconURL())
  .setColor(config.color)
  .setFooter(`©${config.name}`)
  .addField('Online:', "<:online:379776303743631372>"  + message.guild.members.filter(m => m.presence.status == 'online').size, true)
  .addField('Offline:', "<:offline:379776320349011968>"  + message.guild.members.filter(m => m.presence.status == 'offline').size, true)
  .addField('Dnd:', "<:dnd:379775982149566473>"  + message.guild.members.filter(m => m.presence.status == 'dnd').size, true)
  .addField('Idle:', "<:idle:379775845348409346>"  + message.guild.members.filter(m => m.presence.status == 'idle').size, true)
  message.channel.send(embed)
};
