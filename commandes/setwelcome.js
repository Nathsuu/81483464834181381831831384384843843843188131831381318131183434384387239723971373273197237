const db = require("quick.db");

module.exports.run = async (client, message, args) => {
 
 db.set(`wmsg_${message.guild.id}`, args.join(" ")).then(i => {
 
   message.channel.send(`Le message de bienvenue a été changé en :\n\n**${i}**`);
  
  
 });
 
}

module.exports.help = {
  name: "setwelcome"
}
