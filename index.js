// Calling Packages
const Discord = require('discord.js');
const bot = new Discord.Client();

// Global Settings
const prefix = 'v!'; // This is the prefix, you can change it to whatever you want. 

// Listener Event: Runs whenever the bot sends a ready event (when it first starts for example)
bot.on('ready', () => {
    bot.user.setActivity("Vaction | v!help", {type: "WATCHING"});	

    // We can post into the console that the bot launched.
    console.log('Bot started.');

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
	
    if (command === "8ball") {
    if(!args[2]) return message.reply("Donne moi une question");
    let replies = ["Oui.", "Non.", "Je ne sais pas", "Redonne moi une question"];
	    
    let result = Math.floor((Math.random() * replies.lenght));
    let question = args.slice(1).join(" ");
	    
    let ballembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor("#FF9900")
    .addField("Question", question)
    .addField("Réponse", replies[result]);
    message.channel.send(ballembed);	 
    }
	
    if (command === "botinfo") {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Information du Bot")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Nom du Bot", bot.user.username)
    .addField("Créer le", bot.user.createdAt);

    return message.channel.send(botembed);
  }	
	
  if (command === "servinfo") {	
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Information du Discord")
    .setColor("#E2FB00")
    .setThumbnail(sicon)
    .addField("Nom du Discord", message.guild.name)
    .addField("Créer le", message.guild.createdAt)
    .addField("Vous avez rejoint", message.member.joinedAt)
    .addField("Total Membre", message.guild.memberCount);

    return message.channel.send(serverembed);
  }	

  if (command === "kick") {	
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send(":x: Vous n'avez mentionné aucun utilisateur !");
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
    if(!bUser) return message.channel.send(":x: Vous n'avez mentionné aucun utilisateur !");
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
    if(!rUser) return message.channel.send(":x: Vous n'avez mentionné aucun utilisateur !");
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
    name: ':inbox_tray: **Input**',     
      value: '\`\`\`' + code + '\`\`\`'         
},{     
      name: ':outbox_tray: **Output**', 
          value: '\`\`\`' + str + '\`\`\`'  
        }], 
      footer: {     
    text: `request by @${message.author.username}`    }     }});} catch (err) {   message.react("❌");
message.channel.send("", { embed: { 
      color: 16758725,      
  fields: [{        
    name: ':inbox_tray: **Input**',     
      value: '\`\`\`' + code + '\`\`\`'         
},{     
      name: ':outbox_tray: **Output**', 
          value: '\`\`\`' + err + '\`\`\`'  
        }], 
      footer: {     
    text: `request by @${message.author.username}`    }     }});    } }})  
	
	
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

    let msg = message.content.toUpperCase(); // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
    let sender = message.author; // This variable takes the message, and finds who the author is.
    let cont = message.content.slice(prefix.length).split(" ")[0]; // This variable slices off the prefix, then puts the rest in an array based off the spaces	
    var input = message.content.toUpperCase();
	
    // Ping
    if (msg === prefix + 'PING') { // This checks if msg (the message but in all caps), is the same as the prefix + the command in all caps.

        // Now, let's send a response.
        message.delete(); // This 'sends' the message to the channel the message was in. You can change what is in the message to whatever you want.
        message.channel.send("pong!");    
    }	

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
	.addField("Informations du Bot", "Le bot peut mettre un grade automatique au nom de \`Member\` si celuis ci est dans les rôles. Le bot dispose aussi d'un logs pour que les modérateurs si retrouve plus rapidement pour celà, il suffit d'avoir un channel s'appellant \`vchannel\`.")
        .addField("-", "Pour avoir de l'aide sur une commande, faites: \`v!help\`. Mon prefix est \`v!\`.")	
        .addField(":hammer_pick: Modération", "\`clear-soon\`, \`ban\`, \`kick\`, \`mute-soon\`, \`warn-soon\`, \`report\`")
        .addField(":gear: Configuration", "\`setgame\`, \`say\`, \`channel\`")
        .addField(":clipboard: Utilitaire", "\`help\`, \`bot\`, \`youtube\`, \`invite\`, `\servlist\`, \`botinfo\`, `\servinfo\`")
        .addField("💋 Nsfw", "\`e-girl\`")
        .addField(":space_invader: Jeux", "\`8ball-soon\`, \`random-soon\`")	
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

});	

