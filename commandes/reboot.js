const {RichEmbed} = require("discord.js");
exports.run = async (client, message, args, level) => {

  let embed = new RichEmbed()
  .setColor("#ff1d00")
  .setTitle("Bot is shutting down!")
  await message.channel.send(embed); // send the embed



  client.commands.forEach( async cmd => {
    await client.unloadCommand(cmd);
  }); 

  process.exit(1);
}; 

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["boot off", "shutdown"],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "reboot",
  category: "Owner",
  description: "Shuts down the bot, unless running under pm2 or on an VPN/VPS bot will reboot automatically",
  usage: "reboot"
};
