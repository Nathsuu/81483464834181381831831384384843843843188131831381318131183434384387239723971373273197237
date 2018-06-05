const db = require("quick.db");

module.exports.run = async (client, message, args) => {
 
 let Pchannel = message.mentions.channels.first()
 if(!Pchannel) return message.channel.send("Vous n'avez mentionné aucun channel ! Exemple/Usage : \`v!setpartners #partners\`")
 if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("Vous n'avez pas la permission ``MANAGE_GUILD`` pour faire cette commande.");
 db.set(`wPchannel_${message.guild.id}`, Pchannel.id).then(i => {
 
   message.channel.send(`Le channel des setpartners ont été changé en :\n\n<#${i}>`);
   
 });
 
}

module.exports.help = {
  name: "setpartners"
}
