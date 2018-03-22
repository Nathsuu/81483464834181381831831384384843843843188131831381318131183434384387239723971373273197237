const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply(":x: Il vous faut la permission `manage-server` pour executer cette commande.");
  if(!args[0] || args[0 == "help"]) return message.reply(":x: Vous n'avez mentionné aucun utilisateur ! Exemple : \`v!setprefix v!\`");

  let prefixes = JSON.parse(fs.readFileSync("./data/prefixes.json", "utf8"));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./data/prefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err)
  });

  let sEmbed = new Discord.RichEmbed()
  .setColor("#FF9900")
  .setTitle("Nouveau Prefix !")
  .setDescription(`Mon prefix est maintenant ${args[0]} sur ce serveur.`);

  message.channel.send(sEmbed);

}

module.exports.help = {
  name: "setprefix"
}
