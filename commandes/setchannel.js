const db = require("quick.db");

module.exports.run = async (client, message, args) => {
 
 let channel = message.mentions.channels.first()
 if(!channel) return message.channel.send("Vous n'avez mentionné aucun channel ! Exemple/Usage : \`v!setchannel #welcome\`")
 if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("Vous n'avez pas la permission ``MANAGE_GUILD`` pour faire cette commande.");
 db.set(`wchannel_${message.guild.id}`, channel.id).then(i => {
 
   message.channel.send(`Le channel des welcomes/leaves ont été changé en :\n\n<#${i}>`);
   
 });
 
}

module.exports.help = {
  name: "setchannel"
}
