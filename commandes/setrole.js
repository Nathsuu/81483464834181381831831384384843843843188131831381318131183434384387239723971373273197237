const db = require("quick.db");

module.exports.run = async (client, message, args) => {
 
 let role = message.mentions.roles.first() || args.join(" ");
 
 if(!role) return message.channel.send("Please mention a role!")
 
 if(role === 'none') {
  db.set(`autorole_${message.guild.id}`, null).then(message.channel.send({embed: { description: `New Members won't be given any roles!` }})) ;
  return;
 }
 
 db.set(`autorole_${message.guild.id}`, role.id).then(i => {
 
   message.channel.send({embed: { description: `New Members will now be given <@&${i}>` }})
 
 });
 
}

module.exports.help = {
  name: "setrole"
}
