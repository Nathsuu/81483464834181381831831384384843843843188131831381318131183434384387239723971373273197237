const {RichEmbed} = require("discord.js");
exports.run = async (client, message, args, level) => {
       
 if(message.author.id == "282123215537569793"){
  let embed = new RichEmbed()
  .setColor("#FF9900")
  .setTitle("Restarting...")
  await message.channel.send(embed); 


  client.commands.forEach( async cmd => {
    await client.unloadCommand(cmd);
  }); 

  process.exit(1);
  };
}       

module.exports.help = {
  name: "reboot"
}
