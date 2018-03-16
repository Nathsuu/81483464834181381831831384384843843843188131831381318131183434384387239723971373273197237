function unmute(message,prefix,client){
    
     if (message.content.startsWith(prefix + "unmute")) {
if (message.channel.type === "dm") return;
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply(":x: Vous n'avez pas la permission `manage-guild`.").catch(console.error);
if(message.mentions.users.size === 0) {
  return message.channel.send(":x: Vous n'avez mentionnée aucun utilisateur !");
}
let unmuteMember = message.guild.member(message.mentions.users.first());
if(!unmuteMember) {
  return message.channel.send(":x: Vous n'avez mentionnée aucun utilisateur !");
}
if(!message.guild.member(client.user).hasPermission("MANAGE_GUILD")) {
  return message.reply(":x: Je n'ai pas la permission \`MANAGE_GUILD\` pour faire ceci.").catch(console.error);
}
message.channel.overwritePermissions(unmuteMember, { SEND_MESSAGES: true }).then(member => {
    message.channel.send(`**${unmuteMember.user.username}** est désormais unmute dans **#${message.channel.name}** :loud_sound:`)
})
}}
    module.exports = unmute
