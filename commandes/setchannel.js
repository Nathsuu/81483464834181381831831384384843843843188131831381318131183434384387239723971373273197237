const db = require("quick.db");

module.exports.run = async (client, message, args) => {
 
 let channel = message.mentions.channels.first()
 if(!channel) return message.channel.send("Please mention a channel!")
 
 db.set(`wchannel_${message.guild.id}`, channel.id).then(i => {
 
   message.channel.send({embed: { description: `Welcome/Leave channel was updated to <#${i}>` }});
   
 });
 
}

module.exports.help = {
  name: "setchannel"
}
