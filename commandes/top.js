
const Discord = require('discord.js'), 
      arraySort = require('array-sort'),s
      table = require('table');
      send = require('quick.hook'); 

// We can call our command handler here
exports.run = async (client, message, args, tools) => {
 

    let invites = await message.guild.fetchInvites().catch(error => { 
        
        return message.channel.send(":comet: Vous n'avez pas la permission de faire cette commande.");
    }) 

   
    invites = invites.array();


    arraySort(invites, 'uses', { reverse: true }); // Be sure to enable 'reverse'


    let possibleInvites = [['User', 'Uses']]; 
    invites.forEach(function(invite) {
        possibleInvites.push([invite.inviter.username, invite.uses]); 
    })


    const embed = new Discord.MessageEmbed()
        .setColor("#FF9900")
        .addField('Leaderboard', `\`\`\`${table.table(possibleInvites)}\`\`\``); 
       

    
    send(message.channel, embed, {
        name: 'Serveur top Invites',
        icon: 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/trophy-128.png'
    })
    
}
