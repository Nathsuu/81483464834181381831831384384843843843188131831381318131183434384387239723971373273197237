const Discord = require('discord.js');
const arraySort = require('array-sort');
const table = require('table'); 
const send = require('quick.hook'); 
const client = new Discord.Client();

exports.run = async (client, message, args, tools) => {


    let invites = await message.guild.fetchInvites().catch(error => { 
     
        return message.channel.send(":comet: Je n'est pas la permission de voir la liste d'invitation.");
    }) 

   
    invites = invites.array();


    arraySort(invites, 'uses', { reverse: true }); 


    let possibleInvites = [['Utilisateur', 'Utilisation']]; 
    invites.forEach(function(invite) {
        possibleInvites.push([invite.inviter.username, invite.uses]); 
    })

     
    let embed = new Discord.RichEmbed()
    .setColor("#FF9900")
    .addField('Top joueurs', `\`\`\`${table(possibleInvites)}\`\`\``);  



    send(message.channel, embed, {
        name: 'Vaction',
        icon: 'https://cdn.discordapp.com/attachments/439036803366912015/449670314192928768/Vaction_Logo.png'
    })
    
}

module.exports.help = {
  name: "top"
}
