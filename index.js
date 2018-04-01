
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");

const prefix = 'v!';

client.on('ready', () => {
  setInterval(function(){
    guilds = ["Vaction | v!help", "Vaction | v!help | French Bot", "Vaction | by WinDino", `Vaction | ${client.guilds.size} Serveurs`, "Vaction | v!help", `Vaction | ${client.users.size} Utilisateurs`]
    lecture = Math.floor((Math.random() * guilds.length));
    client.user.setPresence({
      game:{
        name: `${guilds[lecture]}`, 
        type: 3
      }
    });
  }, 80000);  
	
});

client.login(process.env.TOKEN);

client.on('message', message => {
	
const purge = require("./commands/purge.js");
const warns = require("./commands/warns.js");
const unmute = require("./commands/unmute.js");	
const info = require("./commands/info.js");	
	
purge(message, prefix, client)
warns(message, prefix, client)	
unmute(message, prefix, client)
info(message, prefix, client)	
	
    let command = message.content.split(" ")[0];
    const args = message.content.slice(prefix.length).split(/ +/);	
    command = args.shift().toLowerCase();	
	
	
    if (command === "KickAncienPasTouche") {
	if(!message.member.hasPermission("KICK_MEMBERS")) {	
            return message.reply(":x: Vous n'avez pas la permission de faire cette commande.").catch(console.error);
        }
        if(message.mentions.users.size === 0) {
            return message.reply(":x: Vous n'avez mentionné aucun utilisateur !").catch(console.error);
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if(!kickMember) {
            return message.reply(":x: L'utilisateur est introuvable ou impossible à expulser.")
        }
        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.reply(":x: Je n'ai pas la permission \`KICK_MEMBERS\` pour faire ceci.").catch(console.error);
	}	
	if(!message.guild.channels.exists("name", "vchannel")){
	    message.guild.createChannel('vchannel');
	    message.reply(`Le channel \`vchannel\` viens d'être créer.`).catch(console.error);	
	}	
        kickMember.kick().then(member => {
            message.reply(`${member.user.username} a été expulsé avec succès.`).catch(console.error);
	    message.guild.channels.find("name", "vchannel").send(`**${member.user.username}** a été expulsé du discord par **${message.author.username}**`)
	}).catch(console.error)	
    }
	
    if (message.content === prefix + "botinfo"){	
    let bicon = client.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Information du Bot")
    .setColor("#FF9900")
    .setThumbnail(bicon)
    .addField("Ping du Bot ", + `${client.pings[0]}` + " ms",true)
    .addField("Nom du Bot", client.user.username)
    .addField("Créer le", client.user.createdAt);

    return message.channel.send(botembed);
  }	
	
  if (message.content.startsWith(prefix + "ban")) {			 
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!bUser) {	
            return message.reply(":comet: Vous n'avez mentionné aucun utilisateur ! Exemple : \`v!ban @User Insulte\`").catch(console.error);
        }	  	  
	if(!message.member.hasPermission("BAN_MEMBERS")) {	
            return message.reply(":comet: Vous n'avez pas la permission de faire cette commande.").catch(console.error);
        }
    if(!bUser) return message.channel.send(":comet: Vous n'avez mentionné aucun utilisateur ! Exemple : \`v!ban @User Insulte\`");	  	  
    let banEmbed = new Discord.RichEmbed()
    .setDescription("**Ban**")
    .setColor("#FF9900")
    .addField("Utilisateur Banni", `${bUser} ID : ${bUser.id}`)
    .addField("Ban par", `${message.author} ID : ${message.author.id}`)
    .addField("Ban depuis", message.channel)

    let incidentchannel = message.guild.channels.find(`name`, "vchannel");
    if(!incidentchannel) return message.channel.send(":comet: Impossible de trouver le canal \`vchannel\`.");

    message.guild.member(bUser);
    incidentchannel.send(banEmbed);
    bUser.ban()

    return;
  }

  if (message.content.startsWith(prefix + "kick")) {		  
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!kUser) {	
            return message.reply(":comet: Vous n'avez mentionné aucun utilisateur ! Exemple : \`v!kick @User Insulte\`").catch(console.error);
        }	  	  
	if(!message.member.hasPermission("KICK_MEMBERS")) {	
            return message.reply(":comet: Vous n'avez pas la permission de faire cette commande.").catch(console.error);
        } 
    let banEmbed = new Discord.RichEmbed()
    .setDescription("**Kick**")
    .setColor("#FF9900")
    .addField("Utilisateur Kick", `${kUser} ID : ${kUser.id}`)
    .addField("Kick par", `${message.author} ID : ${message.author.id}`)
    .addField("Kick depuis", message.channel)
	  
    let banChannel = message.guild.channels.find(`name`, "vchannel");
    if(!banChannel) return message.channel.send(":comet: Impossible de trouver le canal \`vchannel\`.");
	  

    message.guild.member(kUser);
    banChannel.send(banEmbed);
    kUser.kick()

    return;
  }
	
  if (message.content.startsWith(prefix + "kick")) {	
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!rUser) {	
            return message.reply(":comet: Vous n'avez mentionné aucun utilisateur ! Exemple : \`v!report @User Insulte\`").catch(console.error);
        }	  
    let rreason = args.join(" ").slice(20);

    let reportembed = new Discord.RichEmbed()
    .setDescription("**Report**")
    .setColor("#FF9900")
    .addField("Utilisateur Report", `${rUser} ID : ${rUser.id}`)
    .addField("Report par", `${message.author} ID : ${message.author.id}`)
    .addField("Depuis le Channel", message.channel)
    .addField("Raison", rreason)

    let reportschannel = message.guild.channels.find(`name`, "vchannel");
    if(!reportschannel) return message.channel.send(":comet: Impossible de trouver le canal \`vchannel\`.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportembed);

    return;
  }
	
  if (message.content.startsWith(prefix + "google")) {		  
    let idprefix = args.join(" ").slice(0);
    if(!idprefix) return message.reply(":comet: Il me faut une recherche. Exemple : `v!google <RECHERCHE>`");	  
    let requestembed = new Discord.RichEmbed()
    .setColor("#FF9900")
    .setDescription("**Google**")
    .addField("Recherche", "Lien [ICI](https://www.google.com/search?q=" + idprefix)
    .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)	  
    .setTimestamp()	  
	  
    let requestchannel = message.guild.channels.get("423552696411357204");
    if(!requestchannel) return message.channel.send(":comet: Impossible de trouver le canal avec l'id ``423552696411357204`` L'ID du cannal est un channel du support du bot.");	  
    
    message.delete().catch(O_o=>{});
    requestchannel.send(requestembed)
    .then(function (message) {
        message.react("〰")
    }).catch(function() {
    });
    
    return;
  }	
	
  if (message.content.startsWith(prefix + "request-bot")) {				  
    let idprefix = args.join(" ").slice(0);
    if(!idprefix) return message.reply(":comet: Il me faut l'ID/PREFIX du Bot. Exemple : `v!request-bot <ID DU BOT> <PREFIX DU BOT>`");	  
    let requestembed = new Discord.RichEmbed()
    .setColor("#FF9900")
    .setDescription("**Request-Bot**")
    .addField("Information", "Merci d'avoir soumis le bot, il sera invité sous peu. En attendant, vous pouvez lire les règles du bot dans __#rules-info__ !")       
    .addField("Owner :", `${message.author}`, true) 
    .addField("ID / Prefix", idprefix, true)
    .addField("Invitation", "Lien [ICI](https://discordapp.com/oauth2/authorize?client_id=" + message.content.split(" ")[1] + "&scope=bot&permissions=36719616)")
    .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)	  
    .setTimestamp()	  
	  
    let requestchannel = message.guild.channels.get("423552696411357204");
    if(!requestchannel) return message.channel.send(":comet: Impossible de trouver le canal avec l'id ``423552696411357204`` L'ID du cannal est un channel du support du bot.");	  
    
    message.delete().catch(O_o=>{});
    requestchannel.send(requestembed)
    .then(function (message) {
        message.react("〰")
    }).catch(function() {
    });
    
    return;
  }

  if (message.content.startsWith(prefix + "approve-bot")) {		
    let rUser = message.guild.member(message.mentions.users.first());
    if(!rUser) return message.channel.send(":x: Vous n'avez mentionné aucun utilisateur ! Exemple : \`v!approve-bot @User\`");
	if(!message.author.id== "282123215537569793") {	
            return message.reply(":comet: Vous n'avez pas la permission de faire cette commande. Seul mon créateur le peut.").catch(console.error);
        }   	  

    let approveEmbed = new Discord.RichEmbed()
    .setColor("#FF9900")
    .setDescription("**Approve-Bot**")
    .addField("Information", "Merci d'avoir soumis le bot, il est désormais __approuvé__ !")
    .addField("Owner :", rUser)
    .addField("Approuvé par :", `${message.author}`)
    message.react(":17332945_138497173341771_6515416:")
	  
	  
    let approvechannel = message.guild.channels.get("427880171672961024");
    if(!approvechannel) return message.channel.send(":comet: Impossible de trouver le canal avec l'id ``427880171672961024`` L'ID du cannal est un channel du support du bot.");	  

    message.delete().catch(O_o=>{});
    approvechannel.send(approveEmbed)
    .then(function (message) {
        message.react("✔")
    }).catch(function() {
    });	 	  

    return;
  }
	
  if (message.content.startsWith(prefix + "refuse-bot")) {	
    let rreason = args.join(" ").slice(22);	  
    let rUser = message.guild.member(message.mentions.users.first());
    if(!rUser) return message.channel.send(":x: Il me faut une raison. Exemple : `v!refuse-bot <Créateur du Bot> <Raison>`");
	if(!message.author.id== "282123215537569793") {	
            return message.reply(":comet: Vous n'avez pas la permission de faire cette commande. Seul mon créateur le peut.").catch(console.error);
        } 	  

    let RefuseEmbed = new Discord.RichEmbed()
    .setColor("#FF9900")
    .setDescription("**Refuse-Bot**")
    .addField("Information", "Merci d'avoir soumis le bot mais il a était __refusé__ ! Si vous avez envie, vous pouvez toujours retenter votre chance.")       
    .addField("Owner :", rUser)
    .addField("Refusé par :", `${message.author}`)     
    .addField("Raison :", rreason)
    message.react(":x:")    
	  
    let refusechannel = message.guild.channels.get("427880171672961024");
    if(!refusechannel) return message.channel.send(":comet: Impossible de trouver le canal avec l'id ``427880171672961024`` L'ID du cannal est un channel du support du bot.");	  

    message.delete().catch(O_o=>{});
    refusechannel.send(RefuseEmbed)
    .then(function (message) {
        message.react("❌")
    }).catch(function() {
    });		  

    return;
  }
	
  if (message.content.startsWith(prefix + "blacklist")) {	
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send(":comet: Vous n'avez mentionné aucun utilisateur ! Exemple : \`v!blacklist @User\`");
    let blacklist = args.join(" ").slice(1);
	if(!message.member.hasPermission("ADMINISTRATOR")) {	
            return message.reply(":comet: Vous n'avez pas la permission de faire cette commande.").catch(console.error);
        }	  
  
    let blacklistembed = new Discord.RichEmbed()
    .setDescription("**Blacklist**")
    .setColor("#FF9900")
    .addField("Utilisateur Blacklist", `${bUser} ID : ${bUser.id}`)
    .addField("Blacklist par", `${message.author} ID : ${message.author.id}`)
    .addField("Blacklist depuis", message.channel) 

    let blacklistchannel = message.guild.channels.find(`name`, "vchannel");
    if(!blacklistchannel) return message.channel.send(":comet: Impossible de trouver le canal \`vchannel\`.");
	  
    message.delete().catch(O_o=>{});
    message.guild.member(bUser).kick("Blacklist");	  
    blacklistchannel.send(blacklistembed);
  bUser.ban()	  	  


    return;
  }	
	
	
if (message.content.startsWith(prefix + "pfc")) {		
    var rps = args.join(" ");
    if (!rps || rps != "pierre" && rps != "papier" && rps != "ciseaux") {
      message.reply("S'il vous plaît entrer soit pierre, papier ou ciseaux");
    } else {
      if (rps == "pierre") {
        rps = ":right_facing_fist:"
      } else if (rps == "papier") {
        rps = ":raised_hand:"
      } else if (args == "ciseaux") {
        rps = ":v:"
      }
 
      var response = [];
      response.push(":right_facing_fist:");
      response.push(":raised_hand:");
      response.push(":v:");
 
      var responsenum = Math.floor((Math.random())*3)
      var botJanken = response[responsenum];
 
      var msgArray = [];
      msgArray.push('Joueur : ' + rps +  '\n     **VS**\nVaction : ' + botJanken);
 
      if (botJanken == rps) {
        msgArray.push("```fix\nEgalité !```");
      }
      else if (rps == ":right_facing_fist:" && botJanken == ":v:" ||
               rps == ":raised_hand:" && botJanken == ":right_facing_fist:" ||
               rps == ":v:" && botJanken == ":raised_hand:") {
        msgArray.push("```diff\nVous gagnez !```");
      }
      else if (rps == ":right_facing_fist:" && botJanken == ":raised_hand:" ||
               rps == ":raised_hand:" && botJanken == ":v:" ||
               rps == ":v:" && botJanken == ":right_facing_fist:") {
        msgArray.push("```diff\nTu as perdu !```");
      }
      else msgArray.push("```fix\nQuelque chose s'est mal passé! Réessayer !```");
 
      message.channel.send(msgArray);
    }
  }	
	
  if (message.content.startsWith(prefix + "8ball")) {		
  if(!args[2]) return message.reply(":comet: Donne moi une question. Exemple : \`v!8ball T'es beau ?\`");
  let replies = ["Oui.", "Non.", "Je ne sais pas.", "Peut-être.", "Mystère."];

  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(0).join(" ");
	
  var help_embed = new Discord.RichEmbed()
  .setAuthor("🎱 | Vaction | 8ball")
  .setColor("#FF9900")
  .addField("Question", question)
  .addField("Réponse", replies[result])
  .setFooter("Demande par " + message.author.tag, message.author.displayAvatarURL);
  message.channel.sendEmbed(help_embed)
  }
	
  if (message.content.startsWith(prefix + "flip")) {	
  if(!args[0]) return message.reply(":comet: Vous n'avez pas mentionné Pile ou Face ! Exemple : \`v!flip Face\`");	  
  let replies = ["Pile.", "Face."];

  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(0).join(" ");
	
  var help_embed = new Discord.RichEmbed()
  .setAuthor("💸 | Vaction | Flip")
  .setColor("#FF9900")
  .addField("Votre pari", question)
  .addField("Réponse", replies[result])
  .setFooter("Demande par " + message.author.tag, message.author.displayAvatarURL);
  message.channel.sendEmbed(help_embed)
  }	
	
  if (message.content.startsWith(prefix + "dé")) {	
  if(!args[0]) return message.reply(":comet: Vous n'avez pas mentionné un nombre ! Exemple : \`v!dé 5\`");	  
  let replies = ["1", "2", "3", "4", "5", "6"];

  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(0).join(" ");
	
  var help_embed = new Discord.RichEmbed()
  .setAuthor("🎲 | Vaction | dé")
  .setColor("#FF9900")
  .addField("Votre pari", question)
  .addField("Nombre gagant", replies[result])
  .setFooter("Demande par " + message.author.tag, message.author.displayAvatarURL);
  message.channel.sendEmbed(help_embed)
  }
	
  if (message.content === prefix + "fish"){
  let replies = ["🦑", "🦐", "🦀", "🐚", "🐙", "🦈", "🐡", "🐠", "🐟", "🐬", "🐋", "🐳", "🐢"];  

  let result = Math.floor((Math.random() * replies.length));
	
  var help_embed = new Discord.RichEmbed()
  .setAuthor("🐋 | Vaction | Pêche")
  .setColor("#FF9900")
  .addField("Tu as pêché", replies[result])
  .setFooter("Demande par " + message.author.tag, message.author.displayAvatarURL);	  
  message.channel.sendEmbed(help_embed)
  }

  if(message.content.startsWith(prefix + "triggered")) {
  if(!args[0]) return message.reply(":comet: Vous n'avez pas mentionné une personne ! Exemple : \`v!triggered @User\`");	  
  var image; 
  if(args){ 
  if(message.mentions.users.first()){

  var image = message.mentions.users.first().avatarURL; 

  }else{
  var image = args; 
  }
  }else{ 

  var image = message.author.avatarURL; 

  } 
  message.channel.send({ file: { attachment: "http://www.triggered-api.tk/api/v1/url=" + image + message.author.avatarURL.replace("jpg", "png"), name: "triggered.gif"  
  }}) 
  }
	
  if (message.content.startsWith(prefix + "role")) {
  let rolls = Math.floor((Math.random() * 100) + 1);  
	
  var help_embed = new Discord.RichEmbed()
  .setAuthor("🔮 | Vaction | Roll")
  .setColor("#FF9900")
  .addField("Ton roll", rolls)
  .setFooter("Demande par " + message.author.tag, message.author.displayAvatarURL);	  
  message.channel.sendEmbed(help_embed)
  }	
	
  if (command === "buildinvite") {	  
  message.guild.channels.get('341585907368984576').createInvite().then(invite =>
  message.channel.send(invite.url)
  ); 	  
  }	
	
if (message.content.startsWith(prefix + "eval")) {
var util = require("util");
let args = message.content.split(" ").slice(1);   
let code = args.join(' ');
  if (message.author.id != '282123215537569793') return;  
    try {
  let ev = eval(code)
                let str = util.inspect(ev, {
                    depth: 1
                })
                 str = `${str.replace(new RegExp(`${bot.token}|${process.env.TOKEN}`, "g"), "nop?")}`;
                if(str.length > 1800) {
                    str = str.substr(0, 1800)
                    str = str + "..."
                }
                message.delete(); 
message.react("✅");
    message.channel.send("", { embed: { 
      color: 16758725,      
  fields: [{        
    name: '📥 **Input**',     
      value: '\`\`\`' + code + '\`\`\`'         
},{     
      name: '📤 **Output**', 
          value: '\`\`\`' + str + '\`\`\`'  
        }], 
      footer: {     
    text: `Demande par @${message.author.username}`    }     }});} catch (err) {   message.react("❌");
message.channel.send("", { embed: { 
      color: 16758725,      
  fields: [{        
    name: '📥 **Input**',     
      value: '\`\`\`' + code + '\`\`\`'         
},{     
      name: '📤 **Output**', 
          value: '\`\`\`' + err + '\`\`\`'  
        }], 
      footer: {     
    text: `Demande par @${message.author.username}`    }     }});    } }    
	
	
    if(message.content.startsWith(prefix + "say")){
       let args = message.content.split(` `).slice(1);
       message.delete()
       if (!args){
       args = null;
        }
       if(message.author.id == "282123215537569793"){
     
       message.channel.send(args.join(` `))
       }else{
       return message.reply(":comet: Vous n'avez pas la permission de faire cette commande. Seul mon créateur le peut pour le moment.");
       }
       }
	
   if (message.content.startsWith(prefix + "logout")) {

     if(message.author.id == "282123215537569793"){

      message.reply("Arrêt en cour");

        console.log('/ Je suis désormais offline / ');

        client.destroy();

        process.exit()

    } else {

      message.channel.send(":comet: Vous n'avez pas la permission de faire cette commande. Seul mon créateur le peut.")

    }
  } 
	  

    let msg = message.content.toUpperCase(); // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
    let sender = message.author; // This variable takes the message, and finds who the author is.
    let cont = message.content.slice(prefix.length).split(" ")[0]; // This variable slices off the prefix, then puts the rest in an array based off the spaces	
    var input = message.content.toUpperCase();
				
    if (message.content == ("v!youtube")){     
	message.reply('La chaîne youtube de WinDino est https://www.youtube.com/channel/UCVjXNqez3qK22giEHLQxpUQ');
}		
    if (message.content == ("v!bot")){    
	message.reply('Conctacte moi : WinDino, Discord Support : https://discord.gg/qfYACVE');
}
    if (message.content == ("v!invite")){    
	message.reply('Invite moi : https://discordapp.com/oauth2/authorize?client_id=417993047427776512&scope=bot&permissions=2146958583');
}
    if (message.content == ("v!prefix")){    
	message.reply('Mon prefix est \`v!\`.');
}	
	
    if (message.content === prefix + "help"){	    
        var help_embed = new Discord.RichEmbed()
        .setColor('#FF9900')
	.addField("Vaction | VacBot | French Bot", ":notepad_spiral: Mes listes de mes commandes :")
	.addBlankField()	
        .addField(":hammer_pick: Espaces Modérations", "```v!purge \nv!ban \nv!blacklist \nv!kick \nv!mute \nv!unmute \nv!tempmute \nv!warn \nv!seewarn \nv!clearwarn \nv!report```", true)	
        .addField(":space_invader: Espaces Jeux", "```v!8ball \nv!flip \nv!dé \nv!fish \nv!roll \nv!pfc```", true)	
        .addField("💋 Espaces Nsfw", "```v!e-girl \nv!ass \nv!boobs```", true)
	.addBlankField()	
	.addField(":frame_photo: Espaces Images", "```v!random \nv!calin \nv!claque \nv!tire \nv!bisous \nv!wasted \nv!dance \nv!triggered \nv!bvn```", true)	
        .addField(":clipboard: Espaces Utiles", "```v!help \nv!stats \nv!prefix \nv!bot \nv!youtube \nv!invite \nv!servlist \nv!ping \nv!request-bot```", true)
        .addField(":gear: Espaces Configurations", "```v!setgame \nv!say \nv!channel \nv!eval \nv!logout \nv!approve-bot \nv!refuse-bot```", true)
	.addBlankField()	
        .addField(":notepad_spiral: Support", "[[Serveur Support]](https://discord.gg/qfYACVE)", true)
        .addField(":paperclip:  Invitation du Bot", "[[Invitation]](https://discordapp.com/oauth2/authorize?client_id=417993047427776512&scope=bot&permissions=2146958583)", true)
	.addBlankField()	
        .setFooter("© VacBot | © Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)
	.setTimestamp() 
    message.channel.sendEmbed(help_embed)
        console.log("Commande Help demandée !");
    }
	if (message.content === prefix + "servlist"){
        message.channel.send("```" + client.guilds.array().map( g => g.name + " | " + g.id + " | " + g.members.size ).join(" membres\n") + "```")   
    }
		
	
    if(message.content.startsWith ("v!calin")) {
       var help_embed = new Discord.RichEmbed()
       .setTitle (":heart: | " + message.author.username + " fait un calin ")
       .setColor("#FF9900")
       .setImage("https://cdn.weeb.sh/images/SyQ0_umD-.gif")
       .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)
       message.channel.sendEmbed(help_embed)

       }
	
    if(message.content.startsWith ("v!claque")) {
       var help_embed = new Discord.RichEmbed()
       .setTitle (":raised_hand: | " + message.author.username + " claque ")
       .setColor("#FF9900")
       .setImage("https://cdn.weeb.sh/images/rJvR71KPb.gif")
       .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)
       message.channel.sendEmbed(help_embed)

       }
	
    if(message.content.startsWith ("v!tire")) {
       var help_embed = new Discord.RichEmbed()
       .setTitle (":gun: | " + message.author.username + " tire ")
       .setColor("#FF9900")
       .setImage("http://image.noelshack.com/fichiers/2017/34/5/1503625646-a8c8c726-iloveimg-cropped-1.gif")
       .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)
       message.channel.sendEmbed(help_embed)

       }
	
    if(message.content.startsWith ("v!bisous")) {
       var help_embed = new Discord.RichEmbed()
       .setTitle (":kiss: | " + message.author.username + " donne un bisous ")
       .setColor("#FF9900")
       .setImage("https://cdn.weeb.sh/images/SJrBZrMBz.gif")
       .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)
       message.channel.sendEmbed(help_embed)

       }
	
    if(message.content.startsWith ("v!random")) {
       var help_embed = new Discord.RichEmbed()
       .setTitle (":footprints: | Random | Encore Soon ")
       .setColor("#FF9900")
       .setImage("https://source.unsplash.com/random")
       .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)
       message.channel.sendEmbed(help_embed)

       }
	
    if(message.content.startsWith ("v!girl")) {
       var help_embed = new Discord.RichEmbed()
       .setTitle (":revolving_hearts: | girl | Encore Soon ")
       .setColor("#FF9900")
       .setImage("https://78.media.tumblr.com/93bc8521787c0b1dfe39293a99d18c4d/tumblr_ora9etSmp91tvq1hxo1_1280.jpg")
       .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)
       message.channel.sendEmbed(help_embed)

    }
	
    if(message.content.startsWith ("v!wasted")) {
       var help_embed = new Discord.RichEmbed()
       .setTitle (":boxing_glove: | Wasted")
       .setColor("#FF9900")
       .setImage("https://cdn.weeb.sh/images/BJO2j1Fv-.gif")
       .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)
       message.channel.sendEmbed(help_embed)

    }
	
    if(message.content.startsWith ("v!dance")) {
       var help_embed = new Discord.RichEmbed()
       .setTitle (":headphones: | Dance")
       .setColor("#FF9900")
       .setImage("https://cdn.discordapp.com/attachments/360034958129233930/414181135350890496/a.gif")
       .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)
       message.channel.sendEmbed(help_embed)

    }
	
    if(message.content.startsWith ("v!bvn")) {
       var help_embed = new Discord.RichEmbed()
       .setTitle (":speech_left:  | Welcome")
       .setColor("#FF9900")
       .setImage("https://petitponey.owns-this.site/0f55e45a.gif")
       .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)
       message.channel.sendEmbed(help_embed)

    }	
	
        if (message.author.bot) return;
        if (message.content.indexOf(prefix) !== 0) return;
        if (message.channel.type === "dm") return;
   
        try {
            let commandFile = require(`./commands/nsfw/${command}.js`);
            commandFile.run(client, message, args);
        } catch (err) {
            //console.error(err);
        }

});	
	
client.commands = new Discord.Collection();

fs.readdir("./commandes/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Aucunes commandes trouvées :/");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commandes/${f}`);
    console.log(`${f} commande chargée!`);
    client.commands.set(props.help.name, props);
  });
});


client.on("message", async msg => {
  if(msg.author.bot) return;
  if(msg.channel.type === "dm") return;

  let messageArray = msg.content.toLowerCase().split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = client.commands.get(cmd.split("v!")[1]);
  if(commandfile) commandfile.run(client,msg,args);

});
