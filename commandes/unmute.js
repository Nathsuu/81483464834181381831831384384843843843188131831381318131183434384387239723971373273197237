const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply(":x: Il vous faut la permission `manage-guild` pour executer cette commande.");
  if(args[0] == "help"){
    message.reply(":x: Vous n'avez pas mentionné un utilisateur ! Exemple : ``Exemple : ``v!unmute @User``");
    return;
  }
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply(":x: Vous n'avez pas mentionné un nombre ! Exemple : ``v!mute @User Insulte``");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply(":x: Vous n'avez pas la permission de faire cette commande sur lui.");

  let muterole = message.guild.roles.find(`name`, "vmuted");
  }

      message.guild.channels.forEach(async (channel, id) => {
  }  
  try{
    await tomute.send(`:exclamation: Vous venez d'être unmute sur un serveur m'utilisant.`)
  }catch(e){
    message.channel.send(`L'utilisateur a été unmute, mais sont DM est verrouillés.`)
  }

  let muteembed = new Discord.RichEmbed()
  .setDescription("Unmute")
  .setColor("#FF9900")
  .addField("Utilisateur Unmute", tomute)
  .addField("Unmute par", `${message.author}`)
  .addField("Unmute depuis", message.channel)


  let vchannelchannel = message.guild.channels.find(`name`, "vchannel");
  if(!vchannelchannel) return message.reply(":x: Impossible de trouver le canal \`vchannel\`.");
  vchannelchannel.send(muteembed);

  await(tomute.addRole(muterole.id));

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`:white_check_mark: <@${tomute.id}> a bien été unmute !`);
  }, ms(mutetime));


}

module.exports.help = {
  name: "unmute"
}
