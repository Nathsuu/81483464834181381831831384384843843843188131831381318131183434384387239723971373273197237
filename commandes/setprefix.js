 
const db = require("quick.db");

module.exports.run = async (client, message, args) => {
 
 let prefix;
 let fetch = await db.fetch(`prefix_${message.guild.id}`);
 if(fetch === null) prefix = '&'
 else prefix = fetch
 
 if(!args.join(" ")) return message.channel.send(`Mon préfixe actuel est ${prefix}`)
 if(!args.slice(1).join(" ")) return message.channel.send(`Mon préfixe actuel est ${prefix}`)
 
 if(args[0] === 'set') {
  
   let nPrefix = args.slice(1).join(" ");
   
   db.set(`prefix_${message.guild.id}`, nPrefix).then(i => {
   
     message.channel.send(`Le prefix sur ce serveur est désormais ${i}`)
   
   });
   
 }
   
}
