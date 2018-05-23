const db = require("quick.db");

module.exports.run = async (client, message, args) => {
 
 let channel = message.mentions.channels.first()
 if(!channel) return message.channel.send("Please mention a channel!")
 
 db.set(`wchannel_${message.guild.id}`, channel.id).then(i => {
 
   message.channel.send(`Le channel des welcomes/leaves ont été changé en :\n\n<#${i}>`);
   
 });
 
}

module.exports.help = {
  name: "setchannel"
}
