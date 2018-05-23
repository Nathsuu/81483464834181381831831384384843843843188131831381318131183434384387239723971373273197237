const db = require("quick.db");

module.exports.run = async (client, message, args) => {
 
 db.set(`lmsg_${message.guild.id}`, args.join(" ")).then(i => {
 
   message.channel.send(`Le message de leave a été changé en :\n\n**${i}**`);
 
 });
 
}

module.exports.help = {
  name: "setleave"
}
