function unmute(message,prefix,client){
    
     if (message.content.startsWith(prefix + "unmute")) {
if (message.channel.type === "dm") return;
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply(":comet: Il vous faut la permission `manage-guild` pour executer cette commande.").catch(console.error);
if(message.mentions.users.size === 0) {
  return message.channel.send(":comet: Vous n'avez mentionnée aucun utilisateur !");
}
let unmuteMember = message.guild.member(message.mentions.users.first());
if(!unmuteMember) {
  return message.channel.send(":comet: Vous n'avez mentionnée aucun utilisateur !");
}
if(!message.guild.member(client.user).hasPermission("MANAGE_GUILD")) {
  return message.reply(":comet: Il me faut la permission `manage-guild` pour executer cette commande.").catch(console.error);
}
message.channel.overwritePermissions(unmuteMember, { SEND_MESSAGES: true }).then(member => {
    message.channel.send(`:comet: **${unmuteMember.user.username}** est unmute !`)
})
}}
    module.exports = unmute
