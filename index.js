// Calling Packages
const Discord = require('discord.js');
const bot = new Discord.Client();

// Global Settings
const prefix = 'v!'; // This is the prefix, you can change it to whatever you want.

// Listener Event: Runs whenever a message is received.
bot.on('message', message => {

    // Variables - Variables make it easy to call things, since it requires less typing.
    let msg = message.content.toUpperCase(); // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
    let sender = message.author; // This variable takes the message, and finds who the author is.
    let cont = message.content.slice(prefix.length).split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces
    let args = cont.slice(1); // This slices off the command in cont, only leaving the arguments.
    var input = message.content.toUpperCase();
    // Ping
    if (msg === prefix + 'PING') { // This checks if msg (the message but in all caps), is the same as the prefix + the command in all caps.

        // Now, let's send a response.
        message.delete(); // This 'sends' the message to the channel the message was in. You can change what is in the message to whatever you want.
    }
    if (message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#E2FB00')
        .addField("Description du Bot", "Le bot sert avant tout à rendre service à un joueur ou une communauté afin de les aider dans une tâche. Avec ses multiples fonctions, le Bot peut vous permettre de faire des sondages, mater des photos, faire de la musique ou tout simplement mettre des rôles automatiques pour les nouveaux.")
        .addField("Informations du Bot", "Le bot peut mettre un grade automatique au nom de \`Member\` si celuis ci est dans les rôles. Il faut avoir le rôle \`bot-commander\` pour contrôler les messages clear pour le bot (~clear <nombre>).Dites \`Vaction\`ou \`Bonjour\` et le bot vous répondra. Le bot dispose aussi d un logs join et leave de serveur (pour que les modérateurs si retrouve plus rapidement) pour celà, il suffit d avoir un channel s appellant \`logs\`.")
        .addField("-", "Pour avoir de l'aide sur une commande, faites: \`v!help\`. Mon prefix est \`v!\`.")	
        .addField(":hammer_pick: Modération", "\`clear\`, \`ban\`, \`unban\`, \`kick\`, \`mute\`, \`warn\`, \`unwarn\`")
        .addField(":gear: Configuration", "\`setchannel\`, \`setwelcome\`, \`setAutoRole\`")
        .addField(":clipboard: Utilitaire", "\`help\`, \`support\`, \`bot\`, \`youtube\`, \`invite\`")
        .addField(":sweat_drops: NSFW", "\`girl\`")
        .addField("-", "Total serveurs: \`Soon\`, Total utilisateurs: \`Soon\`")	
        .addField(":eye: Support", "[Serveur Support] (https://discord.gg/qfYACVE)", true)	
        .setFooter("VacBot | Vaction | by WinDino")	
    message.channel.sendEmbed(help_embed)
        console.log("Commande Help demandée !");
    }

    // Purge
    if (msg.startsWith(prefix + 'CLEAR')) { // This time we have to use startsWith, since we will be adding a number to the end of the command.
        // We have to wrap this in an async since awaits only work in them.
        async function purge() {
            message.delete(); // Let's delete the command message, so it doesn't interfere with the messages we are going to delete.

            // Now, we want to check if the user has the `bot-commander` role, you can change this to whatever you want.
            if (!message.member.roles.find("name", "bot-commander")) { // This checks to see if they DONT have it, the "!" inverts the true/false
                message.channel.send('Vous avez besoin du rôle \`bot-commander\` pour utiliser cette commande.'); // This tells the user in chat that they need the role.
                return; // this returns the code, so the rest doesn't run.
            }

            // We want to check if the argument is a number
            if (isNaN(args[0])) {
                // Sends a message to the channel.
                message.channel.send('Veuillez utiliser un nombre à partir de 2 comme argument. \n Usage: ' + prefix + 'clear <nombre>'); //\n means new line.
                // Cancels out of the script, so the rest doesn't run.
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]}); // This grabs the last number(args) of messages in the channel.
            console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting

            // Deleting the messages
            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.
            message.channel.send('Les messages ont bien été \`supprimés \`! :punch::skin-tone-1:');
        }

        // We want to make sure we call the function whenever the purge command is run.
        purge(); // Make sure this is inside the if(msg.startsWith)

    }
    if (message.content === "Vaction"){
        random();

        if (randnum === 3){
            console.log(randnum);
        }
        if (randnum === 1){
            message.reply("Vaction à votre service !")
            console.log(randnum);

        }
        if (randnum ===2){
            message.reply("Vaction à votre écoute !");
            console.log(randnum);
        }
    }

});

function random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(3);
    randnum = Math.floor(Math.random() * (max -min +1) +min);

}

bot.on('message',message => {
	if (message.content == ("Bonjour")){
	message.reply('Bonjour à toi !');
} else if (message.content == ("v!youtube")){
	message.reply('La chaîne youtube de WinDino est https://www.youtube.com/channel/UCVjXNqez3qK22giEHLQxpUQ');
} else if (message.content == ("v!support")){
	message.reply('Conctacte moi : WinDino, Discord Support : https://discord.gg/qfYACVE');
} else if (message.content == ("v!bot")){
	message.reply('Conctacte moi : WinDino, Discord Support : https://discord.gg/qfYACVE');
} else if (message.content == ("v!invite")){
	message.reply('Invite moi : https://discordapp.com/oauth2/authorize?client_id=417993047427776512&scope=bot&permissions=2146958583');
} else if (message.content == "v!help") {
	let m = " ";
	m += "Le bot sert avant tout à rendre service à un joueur ou une communauté afin de les aider dans une tâche. Avec ses multiples fonctions, le Bot peut vous permettre de faire des sondages, mater des photos, faire de la musique ou tout simplement mettre des rôles automatiques pour les nouveaux. \n";
	m += " \n";
	m += 'Le bot peut mettre un grade automatique au nom de \`Member\` si celuis ci est dans les rôles. Il faut avoir le rôle \`bot-commander\` pour contrôler les messages clear pour le bot (~clear <nombre>).';
	m += " \n";	
	m += 'Dites \`Vaction\`ou \`Bonjour\` et le bot vous répondra. Le bot dispose aussi d un logs join et leave de serveur (pour que les modérateurs si retrouve plus rapidement) pour celà, il suffit d avoir un channel s appellant \`logs\`.';
	m += " \n";	
	m += 'Plusieurs commandes s offre à vous pour contacter le support : \`v!youtube\`,\`v!support\` ou \`v!bot\` et \`v!invite\`.';
	message.author.sendMessage(m).catch(console.log);
}
});

// Listener Event: Runs whenever the bot sends a ready event (when it first starts for example)
bot.on('ready', () => {
    bot.user.setPresence({ game: {name: 'Vaction | v!help | by WinDino' , type: 0}});

    // We can post into the console that the bot launched.
    console.log('Bot started.');

});

bot.login(process.env.TOKEN);

bot.on("guildMemberAdd", member => {
    let role = member.guild.roles.find("name", "Member");
    member.guild.channels.find("name", "logs").send(`${member.user.username} viens de rejoindre le serveur.`)
    member.addRole(role)
})
