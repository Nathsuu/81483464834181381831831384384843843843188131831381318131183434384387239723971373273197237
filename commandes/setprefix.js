const Discord = require("discord.js");
const fs = require("fs");
let prefix = setprefix[message.guild.id].setprefix;
module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("non");
  if(!args[0] || args[0 == "help"]) return message.reply(":x: Vous n'avez mentionné aucun prefix ! Exemple : \`v!setprefix <PREFIX ICI>\`");

  let setprefix = JSON.parse(fs.readFileSync("./data/setprefix.json", "utf8"));

  setprefix[message.guild.id] = {
    setprefix: args[0]
  };

  fs.writeFile("./data/setprefix.json", JSON.stringify(setprefix), (err) => {
    if (err) console.log(err)
  });

  let sEmbed = new Discord.RichEmbed()
  .setColor("#FF9900")
  .setTitle("Nouveau Prefix !")
  .setDescription(`Votre nouveau prefix est maintenant sur ce serveur : ${args[0]}`);

  message.channel.send(sEmbed);

}

module.exports.help = {
  name: "setprefix"
}
