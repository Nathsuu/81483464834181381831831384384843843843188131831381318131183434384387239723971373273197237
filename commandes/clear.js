exports.run = (client, message, args, tools) => {

  
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply(":comet: Vous n'avez pas la permission ``MANAGE_GUILD`` pour faire cette commande.");

  if (isNaN(args[0])) return message.channel.send(":comet: Vous n'avez pas mentionné de nombre ! Exemple/Usage : ``v!clear 50``");
  
  if (args[0] > 100) return message.channel.send(":comet: Vous n'avez pas fourni un nombre inférieur à 100 ! Exemple/Usage : ``v!clear 50``");


  message.channel.bulkDelete(args[0])
    .then(messages => message.channel.send(`:comet: Vous venez de supprimer \`${messages.size}/${args[0]}\` messages ! :ok_hand:**`).then(msg => msg.delete({
      timeout: 10000
    }))) 

}


module.exports.help = {
  name:"clear"
}
