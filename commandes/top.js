const Discord = require('discord.js'), 
      arraySort = require('array-sort'), 
      table = require('table'); 
      send = require('quick.hook'); 
const client = new Discord.Client();

exports.run = async (client, message, args, tools) => {


    let invites = await message.guild.fetchInvites().catch(error => { 
     
        return message.channel.send('Sorry, I don\'t have the proper permissions to view invites!');
    }) 

   
    invites = invites.array();


    arraySort(invites, 'uses', { reverse: true }); 


    let possibleInvites = [['User', 'Uses']]; 
    invites.forEach(function(invite) {
        possibleInvites.push([invite.inviter.username, invite.uses]); 
    })

 
    const embed = new Discord.MessageEmbed()
        .setColor(0xCB5A5E)
        .addField('Leaderboard', `\`\`\`${table.table(possibleInvites)}\`\`\``); 
     


    send(message.channel, embed, {
        name: 'Server Invites',
        icon: 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/trophy-128.png'
    })
    
}

module.exports.help = {
  name: "top"
}
