// Calling Packages
const Discord = require('discord.js');
const bot = new Discord.Client();
// This command requires the package 'fortnite'.
const Fortnite = require('fortnite');
const stats = new Fortnite(process.env.TRN); // This will be your API key from the description in replace of 'process.env.TRN'

// Global Settings
const prefix = 'v!'; // This is the prefix, you can change it to whatever you want.

  let platform;
  let username;

exports.run = (client, message, args, tools) => {
  // There are only 3 platform options: pc, xbl, psn. We need to make sure they are typing one of these.
 
  // Also, make sure you are using return statements when something evaluates to false and you want it to exit,
 
  // Since args contains the message contents, we can get the first item in the array to be the platform
  if (!['pc','xbl','psn'].includes(args[0])) return message.channel.send('**Please Include the platform: `!fortnite [ pc | xbl | psn ] <username>`**');
  // We also need the username, which would be args[1] & on...
  if (!args[1]) return message.channel.send('**Please Include the username: `!fortnite [ pc | xbl | psn ] <username>`**');
 
  // Assign Values
  platform = args.shift(); // This will shift the first item in the args array into platform.
  username = args.join(' '); // Now, we can combine args to form the username.
 
  // Fetch Data
  stats.getInfo(username, platform).then( data => { // Data will now hold the response, the full JSON tree can be found in the description.
   
    // Now, since we have all the correct data, we can output an error message, or the user stats.
    // We can form an embed to respond in chat, make sure you require Discord to form these.
    const embed = new Discord.MessageEmbed() // On the stable branch, this will be new Discord.RichEmbed()
      .setColor(0xffffff) // You can change the color, or anything in this file to what you want it to look like
      .setTitle(`Stats for ${data.username}`) // This will set the title of the emebd as the username
      .setDescription(`**Top Placement**\n\n**Top 3s:** *${data.lifetimeStats[0].value}*\n**Top 5s:** *${data.lifetimeStats[1].value}*\n**Top 6s:** *${data.lifetimeStats[3].value}*\n**Top 12s:** *${data.lifetimeStats[4].value}*\n**Top 25s:** *${data.lifetimeStats[5].value}*`, true) // We can have other information look different, in fields or in the description.
      .setThumbnail('https://vignette.wikia.nocookie.net/fortnite/images/d/d8/Icon_Founders_Badge.png') // Fortnite Logo
      .addField('Total Score', data.lifetimeStats[6].value, true)
      .addField('Matches Played', data.lifetimeStats[7].value, true)
      .addField('Wins', data.lifetimeStats[8].value, true)
      .addField('Win Percentage', data.lifetimeStats[9].value, true)
      .addField('Kills', data.lifetimeStats[10].value, true)
      .addField('K/D Ratio', data.lifetimeStats[11].value, true)
      .addField('Kills Per Minute', data.lifetimeStats[12].value, true)
      .addField('Time Played', data.lifetimeStats[13].value, true)
      .addField('Average Survival Time', data.lifetimeStats[14].value, true)
   
    // Now, we can test this command! Remeber, you can modify the output to what you think looks best.
    message.channel.send(embed)
     
  // All `data` can be found in the description.
   
  })
  .catch(error => { // We can start with the error, an error will return if the username is not found.
   
    message.channel.send('Username not found!');
 
  })
} 

// Listener Event: Runs whenever the bot sends a ready event (when it first starts for example)
bot.on('ready', () => {
    bot.user.setPresence({ game: {name: 'Vaction | v!help | by WinDino' , type: 0}});	

    // We can post into the console that the bot launched.
    console.log('Bot started.');

});

bot.login(process.env.TOKEN);


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
        message.channel.send("pong!");    
    }	

    if (message.content == ("Bonjour")){
	message.reply('Bonjour à toi !');
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
	
    if (message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#E2FB00')
	.setAuthor("Vaction | VacBot", "https://image.noelshack.com/fichiers/2018/09/4/1519899146-17332945-138497173341771-651541625360613376-n-copie.jpg")
        .addField("Description du Bot", "Le bot sert avant tout à rendre service à un joueur ou une communauté afin de les aider dans une tâche. Avec ses multiples fonctions, le Bot peut vous permettre de faire des sondages, mater des photos, faire de la musique ou tout simplement mettre des rôles automatiques pour les nouveaux.")
        .addField("Informations du Bot", "Le bot peut mettre un grade automatique au nom de \`Member\` si celuis ci est dans les rôles. Il faut avoir le rôle \`bot-commander\` pour contrôler les messages clear pour le bot \`~clear <nombre>\`. Dites \`Vaction\`ou \`Bonjour\` et le bot vous répondra. Le bot dispose aussi d un logs join et leave de serveur (pour que les modérateurs si retrouve plus rapidement) pour celà, il suffit d avoir un channel s appellant \`logs\`.")
        .addField("-", "Pour avoir de l'aide sur une commande, faites: \`v!help\`. Mon prefix est \`v!\`.")	
        .addField(":hammer_pick: Modération", "\`clear\`, \`ban\`, \`unban\`, \`kick\`, \`mute\`, \`warn\`, \`unwarn\`")
        .addField(":gear: Configuration", "\`setchannel\`, \`setwelcome\`, \`setAutoRole\`")
        .addField(":clipboard: Utilitaire", "\`help\`, \`bot\`, \`youtube\`, \`invite\`")
        .addField(":sweat_drops: NSFW", "\`girl\`")
        .addField("-", "Total serveurs: \`Soon\`, Total utilisateurs: \`Soon\`")	
        .addField(":eye: Support", "[[Serveur Support]](https://discord.gg/qfYACVE)", true)
        .setFooter("VacBot | Vaction | by WinDino | Demande par " + message.author.tag, message.author.displayAvatarURL)
	.setTimestamp() 
    message.channel.sendEmbed(help_embed)
	    message.author.send("La commande \`v!help\` a bien été exécuté !\nPlusieurs commandes s offre à vous pour contacter le support : \`v!youtube\`, \`v!bot\` et \`v!invite\`.")
        console.log("Commande Help demandée !");
    }
	
});	

