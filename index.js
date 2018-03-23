
const Discord = require('discord.js');
const client = new Discord.Client();
var fs = require('fs');

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
const unmute = require("./commands/unmute.js");
const warns = require("./commands/warns.js");	
	
purge(message, prefix, client)
unmute(message, prefix, client)
warns(message, prefix, client)	

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
	  
	
    if (command === "botinfo") {
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

  if (command === "kick") {	
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send(":x: Vous n'avez mentionné aucun utilisateur ! Exemple : \`v!kick @User Insulte\`");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: Je n'ai pas la permission \`MANAGE_MESSAGES\` pour faire ceci.");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: Vous n'avez pas la permission de faire cette commande sur lui.");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor("#FF9900")
    .addField("Utilisateur Kick", `${kUser} avec l'ID ${kUser.id}`)
    .addField("Kick par", `${message.author.id} avec l'ID ${message.author.id}`)
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
    .setColor("#FF9900")
    .addField("Utilisateur Banni", `${bUser} avec l'ID ${bUser.id}`)
    .addField("Ban par", `${message.author.id} avec l'ID ${message.author.id}`)
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
    .setColor("#FF9900")
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
    let rUserss = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUserss) return message.channel.send(":x: Vous n'avez mentionné aucun ID et prefix du bot ! Exemple : \`v!request-bot <ID DU BOT ICI> <PREFIX DU BOT ICI>\``");
    let idprefix = args.join(" ").slice(22);

    let requestEmbed = new Discord.RichEmbed()
    .setDescription("Request-Bot")
    .setColor("#FF9900")
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
		
if(command === "pfc") {
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
		
  if (command === "8ball") {
  if(!args[2]) return message.reply(":x: Donne moi une question. Exemple : \`v!8ball T'es beau ?\`");
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
	
  if (command === "flip") {
  if(!args[0]) return message.reply(":x: Vous n'avez pas mentionné Pile ou Face ! Exemple : \`v!flip Face\`");	  
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
	
  if (command === "dé") {
  if(!args[0]) return message.reply(":x: Vous n'avez pas mentionné un nombre ! Exemple : \`v!dé 5\`");	  
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
	
  if (command === "fish") {
  let replies = ["🦑", "🦐", "🦀", "🐚", "🐙", "🦈", "🐡", "🐠", "🐟", "🐬", "🐋", "🐳", "🐢"];  

  let result = Math.floor((Math.random() * replies.length));
	
  var help_embed = new Discord.RichEmbed()
  .setAuthor("🐋 | Vaction | Pêche")
  .setColor("#FF9900")
  .addField("Tu as pêché", replies[result])
  .setFooter("Demande par " + message.author.tag, message.author.displayAvatarURL);	  
  message.channel.sendEmbed(help_embed)
  }

 if (command === "triggered") {

 message.channel.send({file:{ attachment: "http://www.triggered-api.tk/api/v1/url=" + message.author.avatarURL , name: "triggered.gif"}})

 }
	
  if (command === "roll") {
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
       return message.reply(":x: Vous n'avez pas la permission de faire cette commande. Seul mon créateur le peut pour le moment.");
       }
       }
	
   if (message.content.startsWith(prefix + "logout")) {

     if(message.author.id == "282123215537569793"){

      message.reply("Arrêt en cour");

        console.log('/ Je suis désormais offline / ');

        client.destroy();

        process.exit()

    } else {

      message.channel.send(":x: Vous n'avez pas la permission de faire cette commande. Seul mon créateur le peut.")

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
        .addField(":hammer_pick: Espaces Modérations", "```v!purge \nv!ban \nv!kick \nv!mute \nv!unmute \nv!tempmute \nv!warn \nv!seewarn \nv!clearwarn \nv!report```", true)	
        .addField(":space_invader: Espaces Jeux", "```v!8ball \nv!flip \nv!dé \nv!fish \nv!roll \nv!pfc```", true)	
        .addField("💋 Espaces Nsfw", "```v!e-girl \nv!ass \nv!boobs```", true)
	.addBlankField()	
	.addField(":frame_photo: Espaces Images", "```v!random \nv!calin \nv!claque \nv!tire \nv!bisous \nv!wasted \nv!dance \nv!triggered \nv!bvn```", true)	
        .addField(":clipboard: Espaces Utiles", "```v!help \nv!prefix \nv!bot \nv!youtube \nv!invite \nv!servlist \nv!stats \nv!ping```", true)
        .addField(":gear: Espaces Configurations", "```v!setgame \nv!say \nv!channel \nv!eval \nv!logout```", true)
	.addBlankField()	
        .addField(":notepad_spiral: Support", "[[Serveur Support]](https://discord.gg/qfYACVE)")
        .addField(":paperclip:  Invitation du Bot", "[[Invitation]](https://discordapp.com/oauth2/authorize?client_id=417993047427776512&scope=bot&permissions=2146958583)")	
	.addField(":chart_with_upwards_trend: Total serveurs :", client.guilds.size)
	.addField(":chart_with_downwards_trend: Total utilisateurs :", client.users.size)
	.addField(":bar_chart:  Utilisateurs sur le Discord :", message.guild.memberCount)	
        .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)
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
	
