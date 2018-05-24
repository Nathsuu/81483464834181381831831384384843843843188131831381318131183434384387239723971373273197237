 let prefix;
 
 let fetch = await db.fetch(`prefix_${message.guild.id}`);
 if(fetch === null) prefix = 'v!'
 else prefix = fetch
const db = require("quick.db");

module.exports.run = async (client, message, args) => {
 
 let prefix;
 let fetch = await db.fetch(`prefix_${message.guild.id}`);
 if(fetch === null) prefix = 'v!'
 else prefix = fetch
 
 if(!args.join(" ")) return message.channel.send(`My current prefix is ${prefix}`)
 if(!args.slice(1).join(" ")) return message.channel.send(`My current prefix is ${prefix}`)
 
 if(args[0] === 'set') {
  
   let nPrefix = args.slice(1).join(" ");
   
   db.set(`prefix_${message.guild.id}`, nPrefix).then(i => {
   
     message.channel.send(`My prefix has been changed to ${i}`)
   
   });
   
 }
   
}

module.exports.help = {
  name: "prefix"
}
