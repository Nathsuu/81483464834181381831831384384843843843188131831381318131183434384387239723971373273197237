const db = require("quick.db");

module.exports.run = async (client, message, args) => {
 
 db.set(`lmsg_${message.guild.id}`, args.join(" ")).then(i => {
 
   message.channel.send({embed: { description: `Leave Message was changed to **${i}**` }});
 
 });
 
}

module.exports.help = {
  name: "setleave"
}
