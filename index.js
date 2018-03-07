// Calling Packages
const Discord = require('discord.js');
const bot = new Discord.Client();
// This command requires the package 'fortnite'.

// Global Settings
const prefix = 'v!'; // This is the prefix, you can change it to whatever you want. 

// Listener Event: Runs whenever the bot sends a ready event (when it first starts for example)
bot.on('ready', () => {
    bot.user.setPresence({ game: {name: 'Vaction | v!help | by WinDino' , type: 0}});	

    // We can post into the console that the bot launched.
    console.log('Bot started.');

});

bot.login(process.env.TOKEN);

bot.on('message', message => {
    let command = message.content.split(" ")[0];
    const args = message.content.slice(prefix.length).split(/ +/);
    command = args.shift().toLowerCase();
 
    if (command === "kick") {
	if(!message.member.roles.has(modRole.id)) {
        if (!message.member.permissions.has('KICK_MEMBERS'))
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
       
        
 
    if (command === "ban") {
        if (!message.member.permissions.has('BAN_MEMBERS'))
        if(!message.member.roles.has(modRole.id)) {
            return message.reply(":x: Vous n'avez pas la permission de faire cette commande.").catch(console.error);
        }
	if(!message.guild.channels.exists("name", "vchannel")){
	    message.guild.createChannel('vchannel');
	    message.reply(`Le channel \`vchannel\` viens d'être créer.`).catch(console.error);	
	}	    
        const member = message.mentions.members.first();
        if (!member) return message.reply(":x: Vous n'avez mentionné aucun utilisateur !");	
        member.ban().then(member => {
            message.reply(`${member.user.username} a été banni :boot:`).catch(console.error);
            message.guild.channels.find("name", "vchannel").send(`**${member.user.username}** a été banni du discord par **${message.author.username}** :boot:`)	
        }).catch(console.error)
    }
    if(message.content === prefix + "setgame"){
        if(message.author.id == '282123215537569793'){
        let args2 = message.content.split(" ").slice(1);
        bot.user.setGame(args2.join(" "))
message.channel.send("Jeux changé")
        }else{
		     message.reply("No")
        return;
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
    if (message.content == ("v!image")){    
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
        .addField("Informations du Bot", "Le bot peut mettre un grade automatique au nom de \`Member\` si celuis ci est dans les rôles. Il faut avoir le rôle \`bot-commander\` pour contrôler les messages clear pour le bot \`~clear <nombre>\`. Dites \`Vaction\`ou \`Bonjour\` et le bot vous répondra. Le bot dispose aussi d un logs join et leave de serveur (pour que les modérateurs si retrouve plus rapidement) pour celà, il suffit d avoir un channel s appellant \`logs\`.")
        .addField("-", "Pour avoir de l'aide sur une commande, faites: \`v!help\`. Mon prefix est \`v!\`.")	
        .addField(":hammer_pick: Modération", "\`clear\`, \`ban\`, \`unban\`, \`kick\`, \`mute\`, \`warn\`, \`unwarn\`")
        .addField(":gear: Configuration", "\`setchannel\`, \`setwelcome\`, \`setAutoRole\`")
        .addField(":clipboard: Utilitaire", "\`help\`, \`bot\`, \`youtube\`, \`invite\`, `\servlist\`")
        .addField(":sweat_drops: NSFW", "\`girl\`")	
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
        message.channel.send("```" + bot.guilds.array().map( g => g.name + " | " + g.members.size ).join(" membres\n") + "```")   
    }

});	

