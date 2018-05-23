const db = require("quick.db");

module.exports.run = async (client, message, args) => {
 
 db.set(`wmsg_${message.guild.id}`, args.join(" ")).then(i => {
 
   message.channel.send({embed: { description: `Welcome Message was changed to **${i}**` }});
   message.channel.send(`Welcome Message was changed to **${i}**`);
  
  
 });
 
}

module.exports.help = {
  name: "setwelcome"
}
