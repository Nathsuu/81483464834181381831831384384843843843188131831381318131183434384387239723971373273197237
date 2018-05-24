function warns(message,prefix,client){
  
var fs = require('fs');
let warns = JSON.parse(fs.readFileSync("./data/warns.json", "utf8"));
if (message.content.startsWith(prefix + "warn")){
if (message.channel.type === "dm") return;
var mentionned = message.mentions.users.first();
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply(":comet: Il vous faut la permission `manage-guild` pour executer cette commande.").catch(console.error);
if(message.mentions.users.size === 0) {
  return message.channel.send(":comet: Vous n'avez mentionnée aucun utilisateur ! Exemple/Usage : ``v!warn @User Insulte``");
}else{
    const args = message.content.split(' ').slice(1);
    const mentioned = message.mentions.users.first();
    if (message.member.hasPermission('MANAGE_GUILD')){
      if (message.mentions.users.size != 0) {
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
          if (args.slice(1).length != 0) {
            const date = new Date().toUTCString();
            if (warns[message.guild.id] === undefined)
              warns[message.guild.id] = {};
            if (warns[message.guild.id][mentioned.id] === undefined)
              warns[message.guild.id][mentioned.id] = {};
            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;
            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){
              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};
            } else {
              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
                time: date,
                user: message.author.id};
            }
            fs.writeFile("./data/warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
message.delete();
            message.channel.send(':comet: '+mentionned.tag+' a bien été averti !');
message.mentions.users.first().send(`:comet: Vous venez d'être warn sur le serveur **${message.guild.name}** par **${message.author.username}**\n\n**Pour la Raison:** ` + args.slice(1).join(' '))
          } else {
            message.channel.send(":comet: Erreur ! Exemple : "+prefix+"warn <user> <raison>");
          }
        } else {
          message.channel.send(":comet: Erreur ! Exemple : "+prefix+"warn <user> <raison>");
        }
      } else {
        message.channel.send(":comet: Erreur ! Exemple : "+prefix+"warn <user> <raison>");
      }
    } else {
      message.channel.send(":comet: Vous n'avez pas la permission `manage-guild`.");
    }
  }
}

  if (message.content.startsWith(prefix+"seewarn")||message.content===prefix+"seewarns") {
if (message.channel.type === "dm") return;
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply(":comet: Il vous faut la permission `manage-guild` pour executer cette commande.").catch(console.error);
    const mentioned = message.mentions.users.first();
    const args = message.content.split(' ').slice(1);
    if (message.member.hasPermission('MANAGE_GUILD')){
      if (message.mentions.users.size !== 0) {
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
          try {
            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
              message.channel.send("**"+mentioned.tag+"** n'a pas de warn :comet:");
              return;
            }
          } catch (err) {
            message.channel.send("**"+mentioned.tag+"** n'a pas de warn.");
            return;
          }
          let arr = [];
          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns.");
          for (var warn in warns[message.guild.id][mentioned.id]) {
            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** le **"+warns[message.guild.id][mentioned.id][warn].time+"**");
          }
          message.channel.send(arr.join('\n'));
        } else {
          message.channel.send(":comet: Erreur ! Exemple : "+prefix+"seewarn <user> <raison>");
          console.log(args);
        }
      } else {
        message.channel.send(":comet: Erreur ! Exemple : "+prefix+"seewarn <user> <raison>");
      }
    } else {
      message.channel.send(":comet: Vous n'avez pas la permission `manage-guild`.");
    }
  }


  if (message.content.startsWith(prefix+"clearwarn") || message.content === prefix + "clearwarn") {
if (message.channel.type === "dm") return;

if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply(":comet: Il vous faut la permission `manage-guild` pour executer cette commande.").catch(console.error);

   const mentioned = message.mentions.users.first();
    const args = message.content.split(' ').slice(1);
    const arg2 = Number(args[1]);
      if (message.mentions.users.size != 0) {
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
          if (!isNaN(arg2)) {
            if (warns[message.guild.id][mentioned.id] === undefined) {
              message.channel.send(mentioned.tag+" n'a pas de warn");
              return;
            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
              message.channel.send(":comet: Ce warn existe pas");
              return;
            }
            delete warns[message.guild.id][mentioned.id][arg2];
            var i = 1;
            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
              delete warns[message.guild.id][mentioned.id][key];
              key = i;
              warns[message.guild.id][mentioned.id][key]=val;
              i++;
            });
            fs.writeFile("./data/warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
              delete warns[message.guild.id][mentioned.id];
            }
            message.channel.send(`:comet: Le warn de **${mentioned.tag}**: **n°${args[1]}** a été enlevé !`);
            return;
          } if (args[1] === "all") {
            delete warns[message.guild.id][mentioned.id];
            fs.writeFile("./data/warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
            message.channel.send(`:comet:  Les warns de **${mentioned.tag}** ont tous été enlevés !`);
            return;
          } else {
            message.channel.send(":comet: Erreur ! Exemple : "+prefix+"clearwarn @User <nombre | tout>");
          }
        } else {
          message.channel.send(":comet: Erreur ! Exemple : "+prefix+"clearwarn @User <nombre | tout>");
        }
      } else {
       message.channel.send(":comet: Erreur ! Exemple : "+prefix+"clearwarn @User <nombre | tout>");
      }
  }
}
    module.exports = warns
