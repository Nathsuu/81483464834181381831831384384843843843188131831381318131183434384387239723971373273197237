
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const db = require("quick.db");

const prefix = 'v!';

client.on('ready', () => {
  setInterval(function(){
    guilds = ["Vaction | v!help", "Vaction | v!help | French Bot", "Vaction | by WinDino#3781", `Vaction | ${client.guilds.size} Serveurs`, "Vaction | v!help", `Vaction | ${client.users.size} Utilisateurs`]
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


client.on("guildCreate", async guild => {
  const invite = await guild.channels.first().createInvite({
    maxAge: 0
  });
  console.log(`Joined a new guild named: ${guild.name} with invite: https://discord.gg/${invite.code}`)
  client.guilds.get('341585907368984576').channels.get(`445636074501439498`).send('__**Invitation :**__ \n '+invite);	
});

client.on('guildCreate', (guild) => {
    const channel = client.guilds.get('341585907368984576').channels.get(`445636074501439498`).send('**Un Serveur viens de m ajouter !** \n '+guild.name+', **Propriétaire : **'+guild.owner.user.username+', **Nombre de membres : **'+guild.memberCount);
	
});

client.on('guildRemove', (guild) => {
    const channel = client.guilds.get('341585907368984576').channels.get(`445636074501439498`).send('**Un Serveur viens de me retirer !** \n '+guild.name+', **Propriétaire : **'+guild.owner.user.username+', **Nombre de membres : **'+guild.memberCount);
});




client.on('guildMemberAdd', async member => {
	
 let fetchPchannel = await db.fetch(`wPchannel_${member.guild.id}`);
 let fetchP = await db.fetch(`wPsg_${member.guild.id}`);	
 let fetchwelcome = await db.fetch(`wmsg_${member.guild.id}`);
 let fetchchannel = await db.fetch(`wchannel_${member.guild.id}`);	
 let fetchautorole = await db.fetch(`autorole_${member.guild.id}`);
	
 let Pchannel;
 let partners;	
 let welcome;
 let channel;
 let autorole;
 
 if(fetchPchannel === null) return;
 else Pchannel = fetchPchannel
	
 if(fetchP === null) return;
 else partners = fetchP	
	
 if(fetchwelcome === null) welcome = "Bienvenue dans {server}, {user}!";
 else welcome = fetchwelcome
 
 if(fetchchannel === null) return;
 else channel = fetchchannel
 
 if(fetchautorole === null) return;
 else autorole = fetchautorole
 
 try {
   
   let role = member.guild.roles.get(autorole);
   if(!role) return
   else member.addRole(role);
   
   member.guild.channels.get(channel).send(welcome.replace('{user}', member.user).replace('{members}', member.guild.memberCount).replace('{server}', member.guild.name));
   member.guild.channels.get(Pchannel).send(Pchannel.replace('{user}', member.user).replace('{members}', member.guild.memberCount).replace('{server}', member.guild.name));	 
 } catch(e) {
   console.log(e)
 }
 
});
client.on('guildMemberRemove', async member => {

 let fetchleave = await db.fetch(`lmsg_${member.guild.id}`);
 let fetchchannel = await db.fetch(`wchannel_${member.guild.id}`);
 let fetchPchannel = await db.fetch(`wPchannel_${member.guild.id}`);	
 
 let leave;
 let channel;
 let Pchannel;	
 
 if(fetchleave === null) leave = "{user} viens de quitter le serveur {server}!";
 else leave = fetchleave
 
 if(fetchchannel === null) return;
 else channel = fetchchannel
	
 if(fetchPchannel === null) return;
 else Pchannel = fetchPchannel	
 
 
 try {
   member.guild.channels.get(channel).send(leave.replace('{user}', member.user).replace('{members}', member.guild.memberCount).replace('{server}', member.guild.name));
 } catch(e) {
   console.log(e)
 }
 
});



client.on('message', message => {
	
const warns = require("./commands/warns.js");
const info = require("./commands/info.js");	
	
warns(message, prefix, client)	
info(message, prefix, client)	
	
    let command = message.content.split(" ")[0];
    const args = message.content.slice(prefix.length).split(/ +/);	
    command = args.shift().toLowerCase();	
			
	

	
  let points = JSON.parse(fs.readFileSync("./data/points.json", "utf8"));


  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  if (!points[message.author.id]) points[message.author.id] = {
    points: 0,
    level: 0
  };
  let userData = points[message.author.id];
  userData.points++;

  let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
  if (curLevel > userData.level) {
    // Level up!
    userData.level = curLevel;
    message.reply(`Vous avez atteint le niveau **${curLevel}** !`);
  }

  if (message.content.startsWith(prefix + "level")) {
    message.reply(`Vous êtes actuellement niveau ${userData.level}, avec ${userData.points} points.`);
  }
  fs.writeFile("./data/points.json", JSON.stringify(points), (err) => {
    if (err) console.error(err)
  });



    if(message.content.startsWith(prefix + "setgame")){
       let game = message.content.split(` `).slice(1);
       message.delete()
       if (!game){
       game = null;
        }
       if(message.author.id == "282123215537569793"){
       client.user.setGame('' + game + '')
       message.channel.send("Game changé !")
       }else{
       return message.reply(":comet: Vous n'avez pas la permission de faire cette commande. Seul mon créateur le peut.");
       }
       }
		
	
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
	
    if (message.content === "v!loop") { 
      var interval = setInterval (function () {
        message.channel.send("123")
      }, 1 * 80000); 
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
    console.log("Commande v!botinfo demandé !");	    
  }	

	
  if (message.content.startsWith(prefix + "love")) {
  let lUser = message.content.split(` `).slice(1);
	if(!lUser) {	
            return message.reply(":comet: Vous n'avez mentionné aucun utilisateur ! Exemple/Usage : \`v!love @User @User2\`").catch(console.error);
        }	  
  let rolls = Math.floor((Math.random() * 100) + 1); 	  
  return message.reply("Le taux d'amour avec " + lUser + " est de " + rolls + "%")
  console.log("Commande v!love demandé !");	  
  }
  if (message.content.startsWith(prefix + "ban")) {			 
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!bUser) {	
            return message.reply(":comet: Vous n'avez mentionné aucun utilisateur ! Exemple/Usage : \`v!ban @User Insulte\`").catch(console.error);
        }	  	  
	if(!message.member.hasPermission("BAN_MEMBERS")) {	
            return message.reply(":comet: Vous n'avez pas la permission ``BAN_MEMBERS`` pour faire cette commande.").catch(console.error);
        }
    if(!bUser) return message.channel.send(":comet: Vous n'avez mentionné aucun utilisateur ! Exemple/Usage : \`v!ban @User Insulte\`");	  	  
    let banEmbed = new Discord.RichEmbed()
    .setDescription("Sanction de niveau III")
    .setColor("#FF9900")
    .addField("Utilisateur :", `${bUser} (${bUser.id})`, true)
    .addField("Modérateur :", `${message.author} (${message.author.id})`, true)
    .addField("Sanction", "Ban")

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
            return message.reply(":comet: Vous n'avez mentionné aucun utilisateur ! Exemple/Usage : \`v!kick @User Insulte\`").catch(console.error);
        }	  	  
	if(!message.member.hasPermission("KICK_MEMBERS")) {	
            return message.reply(":comet: Vous n'avez pas la permission ``KICK_MEMBERS`` pour faire cette commande.").catch(console.error);
        } 
    let banEmbed = new Discord.RichEmbed()
    .setDescription("Sanction de niveau II")
    .setColor("#FF9900")
    .addField("Utilisateur :", `${kUser} (${kUser.id})`, true)
    .addField("Modérateur :", `${message.author} (${message.author.id})`, true)
    .addField("Sanction", "Kick")
	  
    let banChannel = message.guild.channels.find(`name`, "vchannel");
    if(!banChannel) return message.channel.send(":comet: Impossible de trouver le canal \`vchannel\`.");
	  

    message.guild.member(kUser);
    banChannel.send(banEmbed);
    kUser.kick()

    return;
  }
	
  if (message.content.startsWith(prefix + "google")) {				  
    let idprefix = args.join(" ").slice(0);
    if(!idprefix) return message.reply(":comet: Il me faut une petite recherche. Exemple/Usage : `v!google <RECHERCHE>`. Pas d'espace dans la recherche.");	  
    let requestembed = new Discord.RichEmbed()
    .setColor("#FF9900")
    .setDescription("**Google**")
    .addField("Votre recherche à bien été effectué : " + idprefix, "Lien [ICI](https://www.google.com/search?q=" + idprefix + " )")
    .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)	  
    .setTimestamp()	  
	  
    message.delete().catch(O_o=>{});
    message.channel.send(requestembed);
    console.log("Commande v!google demandé !");	  
    
    return;
  }
	
  if (message.content.startsWith(prefix + "twitter")) {				  
    let idprefix = args.join(" ").slice(0);
    if(!idprefix) return message.reply(":comet: Il me faut une petite recherche. Exemple/Usage : `v!twitter <RECHERCHE>`. Pas d'espace dans la recherche.");	  
    let requestembed = new Discord.RichEmbed()
    .setColor("#FF9900")
    .setDescription("**Twitter**")
    .addField("Votre recherche à bien été effectué : " + idprefix, "Lien [ICI](https://twitter.com/search?q=" + idprefix + "&src=typd)")    
    .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)	  
    .setTimestamp()	  
	  
    message.delete().catch(O_o=>{});
    message.channel.send(requestembed);
    console.log("Commande v!twitter demandé !");	  
    
    return;
  }
	
  if (message.content.startsWith(prefix + "youtube")) {				  
    let idprefix = args.join(" ").slice(0);
    if(!idprefix) return message.reply(":comet: Il me faut une petite recherche. Exemple/Usage : `v!youtube <RECHERCHE>`. Pas d'espace dans la recherche.");	  
    let requestembed = new Discord.RichEmbed()
    .setColor("#FF9900")
    .setDescription("**Youtube**")
    .addField("Votre recherche à bien été effectué : " + idprefix, "Lien [ICI](https://www.youtube.com/results?search_query=" + idprefix + " )")    
    .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)	  
    .setTimestamp()	  
	  
    message.delete().catch(O_o=>{});
    message.channel.send(requestembed);
    console.log("Commande v!youtube demandé !");	  
    
    return;
  }	
		
	
	
  if (message.content.startsWith(prefix + "request-bot")) {				  
    let idprefix = args.join(" ").slice(0);
    if(!idprefix) return message.reply(":comet: Il me faut l'ID/PREFIX du Bot. Exemple/Usage : `v!request-bot <ID DU BOT> <PREFIX DU BOT>`");	  
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
    if(!rUser) return message.channel.send(":x: Vous n'avez mentionné aucun utilisateur ! Exemple/Usage : \`v!approve-bot @User\`");
	if(!message.member.roles.has('430105539775823882')) {	
            return message.reply(":comet: Vous n'avez pas le grade ``VACJURY`` pour de faire cette commande.").catch(console.error);
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
    if(!rUser) return message.channel.send(":x: Il me faut une raison. Exemple/Usage : `v!refuse-bot <Créateur du Bot> <Raison>`");
	if(!message.member.roles.has('430105539775823882')) {	
            return message.reply(":comet: Vous n'avez pas le grade ``VACJURY`` pour de faire cette commande.").catch(console.error);
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
	
	
  if (message.content.startsWith(prefix + "seen")) {
	let user = message.mentions.users.first() || message.author;
	let servers = client.guilds.filter(g => g.members.has(user.id));
	var message2 = "```";
	for (var i = 0; i < servers.map(g => g.name).length; i++) {
		var temp = (i === 0 ? `Guilds en commun avec ${user.tag}\n` : "") + (i + 1) + ". " + servers.map(g => g.name)[i] + "\n";
		if ((message2 + temp).length <= 2000 - 3) {
			message2 += temp;
		} else {
			message2 += "```";
			message.channel.send(message2);
			message2 = "```";
		}
	}
	message2 += "```";
	message.channel.send(message2);
  }	  
	  
	  
  if (message.content.startsWith(prefix + "blacklist")) {	
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send(":comet: Vous n'avez mentionné aucun utilisateur ! Exemple/Usage : \`v!blacklist @User\`");
    let blacklist = args.join(" ").slice(1);
	if(!message.member.hasPermission("ADMINISTRATOR")) {	
            return message.reply(":comet: Vous n'avez pas la permission ``ADMINISTRATOR`` pour faire cette commande.").catch(console.error);
        }	  
  
    let blacklistembed = new Discord.RichEmbed()
    .setDescription("Sanction de niveau IV")
    .setColor("#FF9900")
    .addField("Utilisateur :", `${bUser} (${bUser.id})`, true)
    .addField("Modérateur :", `${message.author} (${message.author.id})`, true)
    .addField("Sanction", "Blacklist")

    let blacklistchannel = message.guild.channels.find(`name`, "vchannel");
    if(!blacklistchannel) return message.channel.send(":comet: Impossible de trouver le canal \`vchannel\`.");
	  
    message.delete().catch(O_o=>{});
    message.guild.member(bUser).kick("Blacklist");	  
    blacklistchannel.send(blacklistembed);
    console.log("Commande v!blacklist demandé !");	  
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
      console.log("Commande v!pfc demandé !");    
    }
  }	
	
  if (message.content.startsWith(prefix + "8ball")) {		
  if(!args[2]) return message.reply(":comet: Donne moi une question. Exemple/Usage : \`v!8ball T'es beau ?\`");
  let replies = ["Oui.", "Non.", "Je ne sais pas.", "Peut-être.", "Mystère.", "T'as cru quoi ? Je ne vais pas te dire la réponse.", "Bon, laisse moi tranquille j'en ai marre de tes questions."];

  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(0).join(" ");
	
  var help_embed = new Discord.RichEmbed()
  .setAuthor("🎱 | Vaction | 8ball")
  .setColor("#FF9900")
  .addField("Question", question)
  .addField("Réponse", replies[result])
  .setFooter("Demande par " + message.author.tag, message.author.displayAvatarURL);
  message.channel.sendEmbed(help_embed)
  console.log("Commande v!8ball demandé !");	  
  }
	
  if (message.content.startsWith(prefix + "fakeip")) {
  let iUser = message.guild.member(message.mentions.users.first());
  if(!iUser) return message.channel.send(":comet: Vous n'avez mentionné aucun utilisateur ! Exemple/Usage : \`v!fakeip @User\`");	  
  let replies = ["151.80.140.233", "162.246.200.100", "198.50.243.147", "218.50.2.102", "147.135.210.114", "197.97.138.21", "147.135.210.114", "128.199.199.41", "88.99.149.188", "104.46.34.250", "162.246.200.100", "210.152.139.40"];

  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(0).join(" ");
	
  message.channel.send('*Discord Résolver...*').then(m => m.edit(`:comet: L'adresse ip de `+ iUser +` est ` +replies[result]));
  console.log("Commande v!ip demandé !");	  
  }	
	
  if (message.content.startsWith(prefix + "flip")) {	
  if(!args[0]) return message.reply(":comet: Vous n'avez pas mentionné Pile ou Face ! Exemple/Usage : \`v!flip Face\`");	  
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
  console.log("Commande v!flip demandé !");	  
  }	
	
  if (message.content.startsWith(prefix + "dé")) {	
  if(!args[0]) return message.reply(":comet: Vous n'avez pas mentionné un nombre ! Exemple/Usage : \`v!dé 5\`");	  
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
  console.log("Commande v!dé demandé !");	  
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
  console.log("Commande v!fish demandé !");	  
  }

	
	
	
	
	
	
	
 if(message.content.startsWith(prefix + "pat")) {	
 const snek = require("snekfetch");
 let image = "pat";

 snek.get(`http://www.triggered-api.tk/api/images/${image}`).set({ Authorization: (process.env.TOKENAPI) }).then(response => {

 message.channel.send('Vaction - **pat**',{
       files:[{
         attachment: response.body,
         name: 'pat.png'
       }]
     })

 }).catch(err => {
 if(err) return console.log(":x: Une erreur s'est produite.");
 });
 }
	
 if(message.content.startsWith(prefix + "hug")) {	
 const snek = require("snekfetch");
 let image = "hug";

 snek.get(`http://www.triggered-api.tk/api/images/${image}`).set({ Authorization: (process.env.TOKENAPI) }).then(response => {

 message.channel.send('Vaction - **hug**',{
       files:[{
         attachment: response.body,
         name: 'hug.png'
       }]
     })

 }).catch(err => {
 if(err) return console.log(":x: Une erreur s'est produite.");
 });
 }
	
 if(message.content.startsWith(prefix + "kiss")) {	
 const snek = require("snekfetch");
 let image = "kiss";

 snek.get(`http://www.triggered-api.tk/api/images/${image}`).set({ Authorization: (process.env.TOKENAPI) }).then(response => {

 message.channel.send('Vaction - **kiss**',{
       files:[{
         attachment: response.body,
         name: 'kiss.png'
       }]
     })

 }).catch(err => {
 if(err) return console.log(":x: Une erreur s'est produite.");
 });
 }
	
 if(message.content.startsWith(prefix + "slap")) {	
 const snek = require("snekfetch");
 let image = "slap";

 snek.get(`http://www.triggered-api.tk/api/images/${image}`).set({ Authorization: (process.env.TOKENAPI) }).then(response => {

 message.channel.send('Vaction - **slap**',{
       files:[{
         attachment: response.body,
         name: 'slap.png'
       }]
     })

 }).catch(err => {
 if(err) return console.log(":x: Une erreur s'est produite.");
 });
 }	
	
	
 if(message.content.startsWith(prefix + "triggered")) {	
 const snek = require("snekfetch");
 let type = "triggered";
 let url = `${message.author.displayAvatarURL}`;

 snek.get(`http://www.triggered-api.tk/api/v2/${type}?url=${url}`).set({ Authorization: (process.env.TOKENAPI) }).then(response => {

 message.channel.send('Vaction - **triggered**',{
       files:[{
         attachment: response.body,
         name: 'triggered.gif'
	       
       }]
     })        

 }).catch(err => {
 if(err) return console.log(":x: Une erreur s'est produite.");
 });
 }	

 if(message.content.startsWith(prefix + "wasted")) {	
 const snek = require("snekfetch");
 let type = "wasted";
 let url = `${message.author.displayAvatarURL}`;

 snek.get(`http://www.triggered-api.tk/api/v2/${type}?url=${url}`).set({ Authorization: (process.env.TOKENAPI) }).then(response => {

 message.channel.send('Vaction - **wasted**',{
       files:[{
         attachment: response.body,
         name: 'wasted.png'
       }]
     })

 }).catch(err => {
 if(err) return console.log(":x: Une erreur s'est produite.");
 });
 }	
	     
 if(message.content.startsWith(prefix + "illuminati")) {	
 const snek = require("snekfetch");
 let type = "illuminati";
 let url = `${message.author.displayAvatarURL}`;

 snek.get(`http://www.triggered-api.tk/api/v2/${type}?url=${url}`).set({ Authorization: (process.env.TOKENAPI) }).then(response => {

 message.channel.send('Vaction - **illuminati**',{
       files:[{
         attachment: response.body,
         name: 'illuminati.gif'
       }]
     })

 }).catch(err => {
 if(err) return console.log(":x: Une erreur s'est produite.");
 });
 }
	
 if(message.content.startsWith(prefix + "invert")) {	
 const snek = require("snekfetch");
 let type = "invert";
 let url = `${message.author.displayAvatarURL}`;

 snek.get(`http://www.triggered-api.tk/api/v2/${type}?url=${url}`).set({ Authorization: (process.env.TOKENAPI) }).then(response => {

 message.channel.send('Vaction - **invert**',{
       files:[{
         attachment: response.body,
         name: 'invert.png'
       }]
     })

 }).catch(err => {
 if(err) return console.log(":x: Une erreur s'est produite.");
 });
 }	

 if(message.content.startsWith(prefix + "convmatrix")) {	
 const snek = require("snekfetch");
 let type = "convmatrix";
 let url = `${message.author.displayAvatarURL}`;

 snek.get(`http://www.triggered-api.tk/api/v2/${type}?url=${url}`).set({ Authorization: (process.env.TOKENAPI) }).then(response => {

 message.channel.send('Vaction - **convmatrix**',{
       files:[{
         attachment: response.body,
         name: 'convmatrix.png'
       }]
     })

 }).catch(err => {
 if(err) return console.log(":x: Une erreur s'est produite.");
 });
 }	

 if(message.content.startsWith(prefix + "tobecontinued")) {	
 const snek = require("snekfetch");
 let type = "tobecontinued";
 let url = `${message.author.displayAvatarURL}`;

 snek.get(`http://www.triggered-api.tk/api/v2/${type}?url=${url}`).set({ Authorization: (process.env.TOKENAPI) }).then(response => {

 message.channel.send('Vaction - **tobecontinued**',{
       files:[{
         attachment: response.body,
         name: 'tobecontinued.png'
       }]
     })

 }).catch(err => {
 if(err) return console.log(":x: Une erreur s'est produite.");
 });
 }
		
 if(message.content.startsWith(prefix + "beautiful")) {	
 const snek = require("snekfetch");
 let type = "beautiful";
 let url = `${message.author.displayAvatarURL}`;

 snek.get(`http://www.triggered-api.tk/api/v2/${type}?url=${url}`).set({ Authorization: (process.env.TOKENAPI) }).then(response => {

 message.channel.send('Vaction - **beautiful**',{
       files:[{
         attachment: response.body,
         name: 'beautiful.png'
       }]
     })

 }).catch(err => {
 if(err) return console.log(":x: Une erreur s'est produite.");
 });
 }	

 if(message.content.startsWith(prefix + "blood")) {	
 const snek = require("snekfetch");
 let type = "blood";
 let url = `${message.author.displayAvatarURL}`;

 snek.get(`http://www.triggered-api.tk/api/v2/${type}?url=${url}`).set({ Authorization: (process.env.TOKENAPI) }).then(response => {

 message.channel.send('Vaction - **blood**',{
       files:[{
         attachment: response.body,
         name: 'blood.png'
       }]
     })

 }).catch(err => {
 if(err) return console.log(":x: Une erreur s'est produite.");
 });
 }
	
 if(message.content.startsWith(prefix + "bob")) {	
 const snek = require("snekfetch");
 let type = "bob";
 let url = `${message.author.displayAvatarURL}`;

 snek.get(`http://www.triggered-api.tk/api/v2/${type}?url=${url}`).set({ Authorization: (process.env.TOKENAPI) }).then(response => {

 message.channel.send('Vaction - **bob**',{
       files:[{
         attachment: response.body,
         name: 'bob.png'
       }]
     })

 }).catch(err => {
 if(err) return console.log(":x: Une erreur s'est produite.");
 });
 }
	
 if(message.content.startsWith(prefix + "magik")) {	
 const snek = require("snekfetch");
 let type = "magik";
 let url = `${message.author.displayAvatarURL}`;

 snek.get(`http://www.triggered-api.tk/api/v2/${type}?url=${url}`).set({ Authorization: (process.env.TOKENAPI) }).then(response => {

 message.channel.send('Vaction - **magik**',{
       files:[{
         attachment: response.body,
         name: 'magik.png'
       }]
     })

 }).catch(err => {
 if(err) return console.log(":x: Une erreur s'est produite.");
 });
 }
	
 if(message.content.startsWith(prefix + "distortion")) {	
 const snek = require("snekfetch");
 let type = "distortion";
 let url = `${message.author.displayAvatarURL}`;

 snek.get(`http://www.triggered-api.tk/api/v2/${type}?url=${url}`).set({ Authorization: (process.env.TOKENAPI) }).then(response => {

 message.channel.send('Vaction - **distortion**',{
       files:[{
         attachment: response.body,
         name: 'distortion.png'
       }]
     })

 }).catch(err => {
 if(err) return console.log(":x: Une erreur s'est produite.");
 });
 }	
	
		
		
	
	
	
	
	
	
	  
	
  if (message.content === 'v!image404') {
  const embed = new Discord.RichEmbed()
  .setTitle("")
  .setAuthor("Image 404")
  .setColor("#FF9900")
  .addField("Test", "Test", true)
  .setImage(`https://cdn.discordapp.com/attachments/395910811379564555/427452249216778246/404.png`, true)
  .setFooter("")
  message.channel.send({embed});
  }	
	
  if (message.content === prefix + "role"){
  let rolls = Math.floor((Math.random() * 100) + 1);  
	
  var help_embed = new Discord.RichEmbed()
  .setAuthor("🔮 | Vaction | Roll")
  .setColor("#FF9900")
  .addField("Ton roll", rolls)
  .setFooter("Demande par " + message.author.tag, message.author.displayAvatarURL);	  
  message.channel.sendEmbed(help_embed)
  console.log("Commande v!role demandé !");	  
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
	
  if (message.content.startsWith(prefix + "fakehacker")) {	
	if(!message.member.hasPermission("ADMINISTRATOR")) {	
            return message.reply(":comet: Vous n'avez pas la permission ``ADMINISTRATOR`` pour faire cette commande.").catch(console.error);
        }
	message.channel.send('**:x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning:**')
        message.channel.send('**:x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning:**')  
  	message.channel.send("LE DISCORD VIENS DE SE FAIRE HACKé !", {
        tts: true
        })    		    
	message.channel.send('**__[HACKING]__** **LANCEMENT DU PROCESSEUR**')
	message.channel.send('**__[HACKING]__** **486846868486464868468464864846846846868468448468686864846864846846446665765476547657465476547657**')
	message.channel.send('**__[HACKING]__** **PIRATAGE EN COURS......**') 
	message.channel.send('**__[HACKING]__** **SUPPRESSION DES DONNEES**') 
	message.channel.send('**__[HACKING]__** **10%**')
	message.channel.send('**__[HACKING]__** **20%**')
	message.channel.send('**__[HACKING]__** **30%**')
	message.channel.send('**__[HACKING]__** **40%**')
	message.channel.send('**__[HACKING]__** **50%**')
	message.channel.send("50 % RESTANTS", {    
        tts: true
        }) 	    
	message.channel.send('**__[HACKING]__** **MODIFICATION DU DISCORD.....**')
	message.channel.send('**__[HACKING]__** **.........................**')
	message.channel.send('**__[HACKING]__** **LANCEMENT DE VAC.EXE**')
	message.channel.send('**__[HACKING]__** **60%**')
	message.channel.send('**__[HACKING]__** **70%**')
	message.channel.send('**__[HACKING]__** **80%**')
	message.channel.send('**__[HACKING]__** **90%**')
	message.channel.send('**__[HACKING]__** **100%**')
	message.channel.send('**__[HACKING]__** **LE PIRATAGE EST UN SUCCES !**')
	message.channel.send("LE DISCORD A BIEN ETE HACKé !", {
        tts: true
        })
        message.channel.send('**:x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning:**')
        message.channel.send('**:x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning:**')   
        message.delete()	  
        console.log("Commande v!fakehacker demandé !");	  	  	  

  return;
  }	
	  

    let msg = message.content.toUpperCase(); // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
    let sender = message.author; // This variable takes the message, and finds who the author is.
    let cont = message.content.slice(prefix.length).split(" ")[0]; // This variable slices off the prefix, then puts the rest in an array based off the spaces	
    var input = message.content.toUpperCase();

    if (message.content == ("v!topinvite")){  		    
	client.fetchInvite(("qfYACVE")).then(invite => message.channel.send(invite.inviter.username))
}	
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
	.addField("Vaction | VacBot | French Bot", ":notepad_spiral: Voici la liste de mes commandes :")
	.addBlankField()	
        .addField(":hammer_pick: Espaces Modérations", "```v!clear \nv!ban \nv!blacklist \nv!kick \nv!mute \nv!unmute \nv!tempmute \nv!warn \nv!seewarn \nv!clearwarn```", true)	
        .addField(":space_invader: Espaces Fun", "```v!8ball \nv!flip \nv!dé \nv!fish \nv!roll \nv!pfc \nv!fakehacker \nv!fakeip \nv!chat \nv!love```", true)	
        .addField("💋 Espaces Nsfw", "```v!e-girl \nv!ass \nv!boobs```", true)
	.addBlankField()	
	.addField(":frame_photo: Espaces Images", "```v!pat \nv!hug \nv!kiss \nv!slap \nv!bvn \nv!triggered  \nv!illuminati \nv!invert \nv!convmatrix \nv!tobecontinued \nv!wasted \nv!beautiful \nv!blood \nv!bob ```", true)	
        .addField(":clipboard: Espaces Utiles", "```v!help \nv!stats \nv!bot \nv!invite \nv!servlist \nv!ping \nv!seen \nv!setwelcome \nv!setleave \nv!setrole \nv!setchannel \nv!top \nv!createinvite```", true)
        .addField(":gear: Espaces Créateurs", "```v!setgame \nv!say \nv!eval \nv!logout \nv!approve-bot \nv!refuse-bot \nv!request-bot```", true)
	.addBlankField()
	.addField(":globe_with_meridians: Recherches", "```v!google \nv!twitter \nv!youtube```", true)
	.addField(":sparkles: News", "```Nouvelles commandes \nv!top (encore soon) \nv!magik \nv!distortion```", true)	
	.addBlankField()	
        .addField(":notepad_spiral: Support", "[[Serveur Support]](https://discord.gg/qfYACVE)", true)
        .addField(":paperclip: Invitation du Bot", "[[Invitation]](https://discordapp.com/oauth2/authorize?client_id=417993047427776512&scope=bot&permissions=2146958583)", true)
	.addBlankField()	
        .setFooter("© VacBot | © Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)
	.setTimestamp() 
    message.channel.sendEmbed(help_embed)
        console.log("Commande v!help demandé !");
    }
	if (message.content === prefix + "servlist"){
        message.channel.send("```" + client.guilds.array().map( g => g.name + " | " + g.id + " | " + g.members.size ).join(" membres\n") + "```")   
    }	
	
	
    if(message.content.startsWith ("v!bvn")) {
       var help_embed = new Discord.RichEmbed()
       .setTitle (":speech_left:  | Welcome")
       .setColor("#FF9900")
       .setImage("https://petitponey.owns-this.site/0f55e45a.gif")
       .setFooter("VacBot | Vaction | Demande par " + message.author.tag, message.author.displayAvatarURL)
       message.channel.sendEmbed(help_embed)
       console.log("Commande v!bvn demandé !");	    

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
	
