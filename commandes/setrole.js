const db = require("quick.db");

module.exports.run = async (client, message, args) => {
 
 let role = message.mentions.roles.first() || args.join(" ");
 
 if(!role) return message.channel.send(":comet: Vous n'avez mentionné aucun role ! Exemple/Usage : \`v!setrole @Role \`")
 
 if(role === 'none') {
  db.set(`autorole_${message.guild.id}`, null).then(message.channel.send(`Les nouveaux membres ne recevront aucun rôle !`));
  return;
 }
 
 db.set(`autorole_${message.guild.id}`, role.id).then(i => {
 
   message.channel.send(`Vous venez de mettre l'autorôle pour les nouveaux membres avec le grade <@&${i}>`);
 });
 
}

module.exports.help = {
  name: "setrole"
}
