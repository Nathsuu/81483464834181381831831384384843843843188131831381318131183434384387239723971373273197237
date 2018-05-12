const Discord = require("discord.js");
const prefix = 'v!';
module.exports.run = async (bot, message, args) => {


  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply(":comet: Vous n'avez pas la permission ``MANAGE_GUILD`` pour faire cette commande.");
  if(args[0] == "help"){
    message.reply(":comet: Vous n'avez pas mentionné un utilisateur ! Exemple : ``Exemple : ``v!unmute @User N'insulte plus``");
    return;
  }
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply(":comet: Vous n'avez pas mentionné un nombre ! Exemple : ``v!unmute @User N'insulte plus``");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply(":comet: Je n'est pas la permission ``MANAGE_MESSAGES`` pour faire cette commande.");
  
  var roledel = message.guild.roles.find('name', 'vmuted');
  message.delete().catch(O_o=>{});

  try{
    await tomute.send(`:exclamation: Vous venez d'être unmute sur un serveur m'utilisant.`)
  }catch(e){
    message.channel.send(`:comet: L'utilisateur a été unmute, mais sont DM est verrouillés.`)
  }

  let muteembed = new Discord.RichEmbed()
   .setDescription("Sanction de niveau II")
   .setColor("#FF9900")
   .addField("Utilisateur :", `${tomute} (${tomute.id})`, true)
   .addField("Modérateur :", `${message.author} (${message.author.id})`, true)
   .addField("Sanction", "Unmute")

  let vchannelchannel = message.guild.channels.find(`name`, "vchannel");
  if(!vchannelchannel) return message.reply(":comet: Impossible de trouver le canal \`vchannel\`.");
  vchannelchannel.send(muteembed);

  await(tomute.removeRole(roledel.id));

}

module.exports.help = {
  name: "unmute"
}
