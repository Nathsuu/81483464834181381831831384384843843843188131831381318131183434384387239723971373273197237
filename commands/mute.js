function mute(message,prefix,client){
    
     if (message.content.startsWith(prefix + "mute")) {
if (message.channel.type === "dm") return;
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply(":x: Il vous faut la permission `manage-guild` pour executer cette commande.").catch(console.error);
if(message.mentions.users.size === 0) {
  return message.channel.send(":x: Vous n'avez mentionnée aucun utilisateur !");
}
let muteMember = message.guild.member(message.mentions.users.first());
if(!muteMember) {
  return message.channel.send(":x: Vous n'avez mentionné aucun utilisateur !");
}
if(!message.guild.member(client.user).hasPermission("MANAGE_GUILD")) {
  return message.reply(":x: Il me faut la permission `manage-guild` pour executer cette commande.").catch(console.error);
}
message.channel.overwritePermissions(muteMember, { SEND_MESSAGES: false }).then(member => {
    message.channel.send(`:white_check_mark: ${muteMember.user.username}** est mute !`)
})
}}
    module.exports = mute
