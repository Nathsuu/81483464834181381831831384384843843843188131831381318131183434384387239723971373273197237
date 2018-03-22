const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply(":x: Il vous faut la permission `manage-guild` pour executer cette commande.");
  if(args[0] == "help"){
    message.reply(":x: Vous n'avez pas mentionné un nombre ! Exemple : `v!tempmute @User <1s/m/h/d>`");
    return;
  }
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply(":x: Vous n'avez pas mentionné un nombre ! Exemple : `v!tempmute @User <1s/m/h/d>");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply(":x: Vous n'avez pas la permission de faire cette commande sur lui.");
  let reason = args.slice(2).join(" ");
  if(!reason) return message.reply(":x: Il me faut une raison.");

  let muterole = message.guild.roles.find(`name`, "muted");

  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
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

  let mutetime = args[1];
  if(!mutetime) return message.reply(":x: Vous n'avez pas spécifié de temps!");

  message.delete().catch(O_o=>{});

  try{
    await tomute.send(`:exclamation: Vous venez d'être mute ${mutetime}.`)
  }catch(e){
    message.channel.send(`Un utilisateur a été mute, mais sont DM est verrouillés. Il sera mute pour ${mutetime}`)
  }

  let muteembed = new Discord.RichEmbed()
  .setDescription("TempMute")
  .setColor("#FF9900")
  .addField("Utilisateur Tempmute", tomute)
  .addField("Tempmute par", `<@${message.author}> avec l'ID ${message.author.id}`)
    .addField("Tempsmute depuis", message.channel)
  .addField("Temps du Mute", mutetime)
  .addField("Raison", reason);

  let incidentschannel = message.guild.channels.find(`name`, "vchannel");
  if(!incidentschannel) return message.reply(":x:Impossible de trouver le canal \`vchannel\`.");
  incidentschannel.send(muteembed);

  await(tomute.addRole(muterole.id));

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`:white_check_mark: <@${tomute.id}> a bien été tempmute !`);
  }, ms(mutetime));


}

module.exports.help = {
  name: "tempmute"
}
