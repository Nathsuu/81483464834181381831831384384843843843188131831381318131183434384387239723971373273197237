
const Discord = require('discord.js');
const bot = new Discord.Client();

const prefix = 'v!'; 


bot.on('ready', () => {
  setInterval(function(){
    guilds = ["Vaction | v!help", "Vaction | v!help | French Bot", "Vaction | by WinDino"]
    lecture = Math.floor((Math.random() * guilds.length));
    bot.user.setPresence({
      game:{
        name: `${guilds[lecture]}`, 
        type: 3
      }
    });
  }, 80000);  
});

bot.on("channelCreate", async channel => {
  console.log(`${channel.name} a été créé.`);
	
  let sChannel = channel.guild.channels.find(`name`, "vchannel");
  sChannel.send(`${channel} a été créé`);

});

bot.on("channelDelete", async channel => {
  console.log(`Un channel a été supprimé.`);
	
  let sChannel = channel.guild.channels.find(`name`, "vchannel");
  sChannel.send(`Un channel a été supprimé`);

});	

bot.login(process.env.TOKEN);

bot.on('message', message => {
	
const purge = require("./commands/purge.js");
const mute = require("./commands/mute.js");
const unmute = require("./commands/unmute.js");
const warns = require("./commands/warns.js");	
	
purge(message, prefix, bot)
mute(message, prefix, bot)
unmute(message, prefix, bot)
warns(message, prefix, bot)	

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
        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
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
	  
	
    if (command === "botinfo") {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Information du Bot")
    .setColor("#E2FB00")
    .setThumbnail(bicon)
    .addField("Ping du Bot ", + `${bot.pings[0]}` + " ms",true)
    .addField("Nom du Bot", bot.user.username)
    .addField("Créer le", bot.user.createdAt);

    return message.channel.send(botembed);
  }	
	
  if (command === "servinfo") {	
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Stats du serveur")
    .setColor("#E2FB00")
    .setThumbnail(sicon)
    .setTitle ("Information du Discord")
    .addField("Nom du Discord", message.guild.name)
    .addField("Propriétaire du serveur", message.guild.owner.user.username)
    .addField("Créer le", message.guild.createdAt, true)
    .addField("Vous avez rejoint", message.member.joinedAt,true)
    .addField("Total Membre", message.guild.memberCount);

    return message.channel.send(serverembed);
  }	

  if (command === "kick") {	
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send(":x: Vous n'avez mentionné aucun utilisateur ! Exemple : \`v!kick @User Insulte\`");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: Je n'ai pas la permission \`MANAGE_MESSAGES\` pour faire ceci.");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: Vous n'avez pas la permission de faire cette commande sur lui.");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor("#E2FB00")
    .addField("Utilisateur Kick", `${kUser} avec l'ID ${kUser.id}`)
    .addField("Kick par", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kick depuis", message.channel)
    .addField("Temps", message.createdAt)
    .addField("Raison", kReason);

    let kickChannel = message.guild.channels.find(`name`, "vchannel");
    if(!kickChannel) return message.channel.send(":x:Impossible de trouver le canal \`vchannel\`.");
	  

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
	  kUser.kick()

    return;
  }	
	
  if (command === "ban") {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send(":x: Vous n'avez mentionné aucun utilisateur ! Exemple : \`v!ban @User Insulte\`");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("x: Je n'ai pas la permission \`MANAGE_MEMBERS\` pour faire ceci.");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: Vous n'avez pas la permission de faire cette commande sur lui.");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban")
    .setColor("#E2FB00")
    .addField("Utilisateur Banni", `${bUser} avec l'ID ${bUser.id}`)
    .addField("Ban par", `<@${message.author.id}> avec l'ID ${message.author.id}`)
    .addField("Ban depuis", message.channel)
    .addField("Temps", message.createdAt)
    .addField("Raison", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "vchannel");
    if(!incidentchannel) return message.channel.send(":x:Impossible de trouver le canal \`vchannel\`.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
  bUser.ban()

    return;
  }	  	
	
  if (command === "report") {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send(":x: Vous n'avez mentionné aucun utilisateur ! Exemple : \`v!report @User Insulte\`");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Report")
    .setColor("#E2FB00")
    .addField("Utilisateur Report", `${rUser} avec l'ID: ${rUser.id}`)
    .addField("Report par", `${message.author} avec l'ID: ${message.author.id}`)
    .addField("Depuis le Channel", message.channel)
    .addField("Temps", message.createdAt)
    .addField("Raison", rreason);

    let reportschannel = message.guild.channels.find(`name`, "vchannel");
    if(!reportschannel) return message.channel.send(":x: Impossible de trouver le canal \`vchannel\`.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }
	
  if (command === "request-bot") {
    let rUsers = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUsers) return message.channel.send(":x: Vous n'avez mentionné aucun ID et prefix du bot ! Exemple : \`v!request-bot <ID DU BOT ICI> <PREFIX DU BOT ICI>\``");
    let idprefix = args.join(" ").slice(22);

    let requestEmbed = new Discord.RichEmbed()
    .setDescription("Request-Bot")
    .setColor("#E2FB00")
    .addField("Salut", `${message.author}`)
    .addField("truc", "Merci d'avoir soumis le bot, il sera invité sous peu. En attendant, vous pouvez lire les règles du bot dans #rules-info !")    
    .addField("Information", "truc")    
    .addField("Username:", "truc")
    .addField("Owner:", `${message.author}`) 
    .addField("ID / Prefix", idprefix, true)
    .setFooter("VacBot | Vaction | by WinDino | Demande par " + message.author.tag, message.author.displayAvatarURL)	  
    .setTimestamp()	  
	  
    let requestchannel = message.guild.channels.get("423552696411357204");
    if(!requestchannel) return message.channel.send(":x: Impossible de trouver le canal avec l'id ``423552696411357204``.");	  

    message.delete().catch(O_o=>{});
    requestchannel.send(requestEmbed);

    return;
  }
	
  if (command === "ban") {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send(":x: Vous n'avez mentionné aucun utilisateur ! Exemple : \`v!ban @User Insulte\`");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("x: Je n'ai pas la permission \`MANAGE_MEMBERS\` pour faire ceci.");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: Vous n'avez pas la permission de faire cette commande sur lui.");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban")
    .setColor("#E2FB00")
    .addField("Utilisateur Banni", `${bUser} avec l'ID ${bUser.id}`)
    .addField("Ban par", `<@${message.author.id}> avec l'ID ${message.author.id}`)
    .addField("Ban depuis", message.channel)
    .addField("Temps", message.createdAt)
    .addField("Raison", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "vchannel");
    if(!incidentchannel) return message.channel.send(":x:Impossible de trouver le canal \`vchannel\`.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
  bUser.ban()

    return;
  }	
		
  if (command === "8ball") {
  if(!args[2]) return message.reply(":x: Donne moi une question. Exemple : \`v!8ball T'es beau ?\`");
  let replies = ["Oui.", "Non.", "Je ne sais pas.", "Peut-être.", "Mystère."];

  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(0).join(" ");
	
  var help_embed = new Discord.RichEmbed()
  .setAuthor("🎱 | Vaction | 8ball")
  .setColor("#E2FB00")
  .addField("Question", question)
  .addField("Réponse", replies[result])
  .setFooter("Demande par " + message.author.tag, message.author.displayAvatarURL);
  message.channel.sendEmbed(help_embed)
  }
	
  if (command === "flip") {
  if(!args[0]) return message.reply(":x: Vous n'avez pas mentionné Pile ou Face ! Exemple : \`v!flip Face\`");	  
  let replies = ["Pile.", "Face."];

  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(0).join(" ");
	
  var help_embed = new Discord.RichEmbed()
  .setAuthor("💸 | Vaction | Flip")
  .setColor("#E2FB00")
  .addField("Votre pari", question)
  .addField("Réponse", replies[result])
  .setFooter("Demande par " + message.author.tag, message.author.displayAvatarURL);
  message.channel.sendEmbed(help_embed)
  }
	
  if (command === "dé") {
  if(!args[0]) return message.reply(":x: Vous n'avez pas mentionné un nombre ! Exemple : \`v!dé 5\`");	  
  let replies = ["1", "2", "3", "4", "5", "6"];

  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(0).join(" ");
	
  var help_embed = new Discord.RichEmbed()
  .setAuthor(":game_die: | Vaction | dé")
  .setColor("#E2FB00")
  .addField("Votre pari", question)
  .addField("Nombre gagant", replies[result])
  .setFooter("Demande par " + message.author.tag, message.author.displayAvatarURL);
  message.channel.sendEmbed(help_embed)
  }
	
  if (command === "fish") {
  let replies = ["🦑", "🦐", "🦀", "🐚", "🐙", "🦈", "🐡", "🐠", "🐟", "🐬", "🐋", "🐳", "🐢"];  

  let result = Math.floor((Math.random() * replies.length));
	
  var help_embed = new Discord.RichEmbed()
  .setAuthor("🐋 | Vaction | Pêche")
  .setColor("#E2FB00")
  .addField("Tu as pêché", replies[result]);
  message.channel.sendEmbed(help_embed)
  }

 if (command === "triggered") {

 message.channel.send({file:{ attachment: "http://www.triggered-api.tk/api/v1/url=" + message.author.avatarURL , name: "triggered.gif"}})

 }
	
  if (command === "buildinvite") {	  
  message.guild.channels.get('341585907368984576').createInvite().then(invite =>
  message.channel.send(invite.url)
  ); 	  
  }
	
    if(command === "ping") {

    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
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
       return message.reply(":x: Vous n'avez pas la permission de faire cette commande. Seul mon créateur le peut pour le moment.");
       }
       }
	
   if (message.content.startsWith(prefix + "logout")) {

     if(message.author.id == "282123215537569793"){

      message.reply("Arrêt en cour");

        console.log('/ Je suis désormais offline / ');

        bot.destroy();

        process.exit()

    } else {

      message.channel.send(":x: Vous n'avez pas la permission de faire cette commande. Seul mon créateur le peut.")

    }
  }	

    let msg = message.content.toUpperCase(); // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
    let sender = message.author; // This variable takes the message, and finds who the author is.
    let cont = message.content.slice(prefix.length).split(" ")[0]; // This variable slices off the prefix, then puts the rest in an array based off the spaces	
    var input = message.content.toUpperCase();
			
    if (message.content == ("Bonjour")){    
	message.reply('Bonjour à toi !');    
}	
    if (message.content == ("v!youtube")){     
	message.reply('La chaîne youtube de WinDino est https://www.youtube.com/channel/UCVjXNqez3qK22giEHLQxpUQ');
}	
    if (message.content == ("v!avatar")){    
	message.reply('https://image.noelshack.com/fichiers/2018/10/2/1520355922-17332945-138497173341771-651541625360613376-n-copie.jpg');    
}	
    if (message.content == ("v!bot")){    
	message.reply('Conctacte moi : WinDino, Discord Support : https://discord.gg/qfYACVE');
}
    if (message.content == ("v!invite")){    
	message.reply('Invite moi : https://discordapp.com/oauth2/authorize?client_id=417993047427776512&scope=bot&permissions=2146958583');
}	
	
    if (message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#E2FB00')
	.setAuthor("Vaction | VacBot | French Bot", "https://image.noelshack.com/fichiers/2018/09/4/1519899146-17332945-138497173341771-651541625360613376-n-copie.jpg")
        .addField("Description du Bot", "Le bot sert avant tout à rendre service à un joueur ou une communauté afin de les aider dans une tâche. Avec ses multiples fonctions, le Bot peut vous permettre de faire des sondages, mater des photos, faire de la musique ou tout simplement mettre des rôles automatiques pour les nouveaux.")
	.addField("Informations du Bot", "Le bot peut mettre un grade automatique au nom de \`Member\` si celui-ci est dans les rôles. Le bot dispose aussi d'un logs pour que les modérateurs si retrouve plus rapidement pour celà, il suffit d'avoir un channel s'appellant \`vchannel\`.")
        .addField("-", "Pour avoir de l'aide sur une commande, faites: \`v!help\`. Mon prefix est \`v!\`.")
	.addBlankField()
        .addField(":hammer_pick: Modération", "\`purge\`, \`ban\`, \`kick\`, \`mute\`, \`unmute\`, \`warn\`, \`seewarn\`, \`clearwarn\`, \`report\`")
        .addField(":gear: Configuration - Pour mon créateur", "\`setgame\`, \`say\`, \`channel\`, \`eval\`, \`logout\`")
        .addField(":clipboard: Utilitaire", "\`help\`, \`bot\`, \`youtube\`, \`invite\`, `\servlist\`, \`botinfo\`, `\servinfo\`")
        .addField("💋 Nsfw", "\`e-girl\`")
        .addField(":space_invader: Jeux", "\`8ball\`, \`flip\`, \`dé\`, \`fish\`")
	.addField("💫 Autres", "\`random\`, \`calin\`, \`claque\`, \`tire\`, \`bisous\`, \`wasted\`, \`dance\`, \`triggered\`")
        .addField(":floppy_disk: Total serveurs:", bot.guilds.size)
	.addField(":floppy_disk: Utilisateurs sur le discord", message.guild.memberCount)
        .addField(":eye: Support", "[[Serveur Support]](https://discord.gg/qfYACVE)", true)
        .setFooter("VacBot | Vaction | by WinDino | Demande par " + message.author.tag, message.author.displayAvatarURL)
	.setTimestamp() 
    message.channel.sendEmbed(help_embed)
	    message.author.send("La commande \`v!help\` a bien été exécuté !\nPlusieurs commandes s offre à vous pour contacter le support : \`v!youtube\`, \`v!bot\` et \`v!invite\`.")
        console.log("Commande Help demandée !");
    }
	if (message.content === prefix + "servlist"){
        message.channel.send("```" + bot.guilds.array().map( g => g.name + " | " + g.id + " | " + g.members.size ).join(" membres\n") + "```")   
    }
		
	
    if(message.content.startsWith ("v!calin")) {
       var help_embed = new Discord.RichEmbed()
       .setTitle (":heart: | " + message.author.username + " fait un calin ")
       .setColor("#E2FB00")
       .setImage("https://cdn.weeb.sh/images/SyQ0_umD-.gif")
       .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)
       message.channel.sendEmbed(help_embed)

       }
	
    if(message.content.startsWith ("v!claque")) {
       var help_embed = new Discord.RichEmbed()
       .setTitle (":raised_hand: | " + message.author.username + " claque ")
       .setColor("#E2FB00")
       .setImage("https://cdn.weeb.sh/images/rJvR71KPb.gif")
       .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)
       message.channel.sendEmbed(help_embed)

       }
	
    if(message.content.startsWith ("v!tire")) {
       var help_embed = new Discord.RichEmbed()
       .setTitle (":gun: | " + message.author.username + " tire ")
       .setColor("#E2FB00")
       .setImage("http://image.noelshack.com/fichiers/2017/34/5/1503625646-a8c8c726-iloveimg-cropped-1.gif")
       .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)
       message.channel.sendEmbed(help_embed)

       }
	
    if(message.content.startsWith ("v!bisous")) {
       var help_embed = new Discord.RichEmbed()
       .setTitle (":kiss: | " + message.author.username + " donne un bisous ")
       .setColor("#E2FB00")
       .setImage("https://cdn.weeb.sh/images/SJrBZrMBz.gif")
       .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)
       message.channel.sendEmbed(help_embed)

       }
	
    if(message.content.startsWith ("v!random")) {
       var help_embed = new Discord.RichEmbed()
       .setTitle (":footprints: | Random | Encore Soon ")
       .setColor("#E2FB00")
       .setImage("https://source.unsplash.com/random")
       .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)
       message.channel.sendEmbed(help_embed)

       }
	
    if(message.content.startsWith ("v!e-girl")) {
       var help_embed = new Discord.RichEmbed()
       .setTitle (":revolving_hearts: | e-girl | Encore Soon ")
       .setColor("#E2FB00")
       .setImage("https://78.media.tumblr.com/93bc8521787c0b1dfe39293a99d18c4d/tumblr_ora9etSmp91tvq1hxo1_1280.jpg")
       .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)
       message.channel.sendEmbed(help_embed)

    }
	
    if(message.content.startsWith ("v!wasted")) {
       var help_embed = new Discord.RichEmbed()
       .setTitle (":boxing_glove: | Wasted")
       .setColor("#E2FB00")
       .setImage("https://cdn.weeb.sh/images/BJO2j1Fv-.gif")
       .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)
       message.channel.sendEmbed(help_embed)

    }
	
    if(message.content.startsWith ("v!dance")) {
       var help_embed = new Discord.RichEmbed()
       .setTitle (":headphones: | Dance")
       .setColor("#E2FB00")
       .setImage("https://cdn.discordapp.com/attachments/360034958129233930/414181135350890496/a.gif")
       .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)
       message.channel.sendEmbed(help_embed)

    }
});	
