const db = require("quick.db");

module.exports.run = async (client, message, args) => {
 
 let channel = message.mentions.channels.first()
 if(!channel) return message.channel.send(":comet: Vous n'avez mentionné aucun channel ! Exemple/Usage : \`v!setchannel #welcome\`")
 
 db.set(`wchannel_${message.guild.id}`, channel.id).then(i => {
 
   message.channel.send(`Le channel des welcomes/leaves ont été changé en :\n\n<#${i}>`);
   
 });
 
}

module.exports.help = {
  name: "setchannel"
}
