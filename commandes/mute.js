const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply(":comet: Vous n'avez pas la permission ``MANAGE_GUILD`` pour faire cette commande soit je n'ai pas la permission d'ajouter/retirer un rôle. La personne à qui vous essayez de mute est peut-être intouchable.");
  if(args[0] == "help"){
    message.reply(":comet: Vous n'avez pas mentionné un utilisateur ! Exemple/Usage : ``v!mute @User Insulte``");
    return;
  }
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply(":comet: Vous n'avez pas mentionné un nombre ! Exemple/Usage : ``v!mute @User Insulte``");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply(":comet: Je n'est pas la permission ``MANAGE_MESSAGES`` pour faire cette commande.");
  let reason = args.slice(1).join(" ");
  if(!reason) return message.reply(":comet: Il me faut une raison.");

  let muterole = message.guild.roles.find(`name`, "vmuted");

  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "vmuted",
        color: "#FF9900",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  message.delete().catch(O_o=>{});

  try{
    await tomute.send(`:exclamation: Vous venez d'être mute sur un serveur m'utilisant.`)
  }catch(e){
    message.channel.send(`:comet: L'utilisateur a été mute, mais sont DM est verrouillés.`)
  }

  let muteembed = new Discord.RichEmbed()
   .setDescription("Sanction de niveau II")
   .setColor("#FF9900")
   .addField("Utilisateur :", `${tomute} (${tomute.id})`, true)
   .addField("Modérateur :", `${message.author} (${message.author.id})`, true)
   .addField("Sanction", "Mute")
   .addField("Raison", reason)

  let vchannelchannel = message.guild.channels.find(`name`, "vchannel");
  if(!vchannelchannel) return message.reply(":comet: Impossible de trouver le canal \`vchannel\`.");
  vchannelchannel.send(muteembed);

  await(tomute.addRole(muterole.id));

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`:comet: <@${tomute.id}> a bien été mute !`);
  }, ms(mutetime));


}

module.exports.help = {
  name: "mute"
}
