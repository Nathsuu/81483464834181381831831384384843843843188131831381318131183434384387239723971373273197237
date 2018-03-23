const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply(":x: Il vous faut la permission `manage-guild` pour executer cette commande.");
  if(args[0] == "help"){
    message.reply(":x: Vous n'avez pas mentionné un utilisateur ! Exemple : ``Exemple : ``v!mute @User Insulte``");
    return;
  }
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply(":x: Vous n'avez pas mentionné un nombre ! Exemple : ``v!mute @User Insulte``");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply(":x: Vous n'avez pas la permission de faire cette commande sur lui.");
  let reason = args.slice(1).join(" ");
  if(!reason) return message.reply(":x: Il me faut une raison.");

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
    message.channel.send(`L'utilisateur a été mute, mais sont DM est verrouillés.`)
  }

  let muteembed = new Discord.RichEmbed()
  .setDescription("Mute")
  .setColor("#FF9900")
  .addField("Utilisateur Mute", tomute)
  .addField("Mute par", `${message.author}`)
  .addField("Mute depuis", message.channel)
  .addField("Raison", reason);

  let vchannelchannel = message.guild.channels.find(`name`, "vchannel");
  if(!vchannelchannel) return message.reply(":x: Impossible de trouver le canal \`vchannel\`.");
  vchannelchannel.send(muteembed);

  await(tomute.addRole(muterole.id));

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`:white_check_mark: <@${tomute.id}> a bien été mute !`);
  }, ms(mutetime));


}

module.exports.help = {
  name: "mute"
}
