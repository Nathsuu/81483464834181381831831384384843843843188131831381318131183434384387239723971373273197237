exports.run = (client, message, args, tools) => {

  // This episode will cover purging messages from a channel.
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply(":comet: Vous n'avez pas la permission ``MANAGE_GUILD`` pour faire cette commande.");
  // First, we need to fetch the amount of messages a user wants to purge, this will be stored in args[0].
  if (isNaN(args[0])) return message.channel.send(":comet: Vous n'avez pas mentionné de nombre ! Exemple/Usage : ``v!clear 50``");
  // This checks if args[0] is NOT a number, if not it runs the return statement which sends a message in chat.
  // We also need to check if the number is LESS THAN 100, since 100 is the max you can delete at once.
  if (args[0] > 100) return message.channel.send(":comet: Vous n'avez pas fourni un nombre inférieur à 100 ! Exemple/Usage : ``v!clear 50``");
  // This checks if args[0] is MORE THAN 100, if it is, it returns and sends a message.

  // Now, we can delete the messages
  message.channel.bulkDelete(args[0])
    .then(messages => message.channel.send(`:comet: Vous venez de supprimer \`${messages.size}/${args[0]}\` messages ! :ok_hand:**`).then(msg => msg.delete({
      timeout: 100000
    }))) // This sends how many messages they deleted to chat, we also want to delete this message. This deletes the message after 100000 milliseconds.

}

module.exports.help = {
  name:"clear"
}
