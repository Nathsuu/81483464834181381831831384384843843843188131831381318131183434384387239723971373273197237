const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply(":comet: Vous n'avez pas mentionné un utilisateur ! Exemple/Usage : ``v!tempmute @User 1s/m/h/d``");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply(":comet: Vous n'avez pas la permission ``MANAGE_GUILD`` pour faire cette commande.");
  let muterole = message.guild.roles.find(`name`, "vmuted");
  let reason = args.slice(2).join(" ");
  if(!reason) return message.reply(":comet: Il me faut une raison.");  
  //start of create role
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
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply(":comet: Vous n'avez pas spécifié de temps !");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> a été mute pendant ${ms(ms(mutetime))}`);
  let muteembed = new Discord.RichEmbed()
   .setDescription("Sanction de niveau II")
   .setColor("#FF9900")
   .addField("Utilisateur :", `${tomute} (${tomute.id})`, true)
   .addField("Modérateur :", `${message.author} (${message.author.id})`, true)
   .addField("Sanction", "Tempmute")
   .addField("Raison", reason)
   .addField("Temps", `${ms(ms(mutetime))}`) 

  let vchannelchannel = message.guild.channels.find(`name`, "vchannel");
  if(!vchannelchannel) return message.reply(":comet: Impossible de trouver le canal \`vchannel\`.");
  vchannelchannel.send(muteembed);
  
  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> a été unmute.`);
  }, ms(mutetime));

}

module.exports.help = {
  name: "tempmute"
}
