const db = require("quick.db");

module.exports.run = async (client, message, args) => {
 if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("Vous n'avez pas la permission ``MANAGE_GUILD`` pour faire cette commande.");
 db.set(`lmsg_${message.guild.id}`, args.join(" ")).then(i => {
 
   message.channel.send(`Le message de leave a été changé en :\n\n**${i}**`);
 
 });
 
}

module.exports.help = {
  name: "setleave"
}
