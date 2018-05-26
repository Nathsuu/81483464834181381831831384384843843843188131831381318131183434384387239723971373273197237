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
	
    let possibleInvites = [['Utilisateur', 'Invitation']];
        invites.forEach(function(invite) { 
        possibleInvites.push([invite.inviter.username, invite.uses]); 
    })

     
    let embed = new Discord.RichEmbed()
    .setColor("#FF9900")
    .addField('Top joueurs invitation', `\`\`\`${table.table(possibleInvites)}\`\`\``);
		
    var message2 = "";
	
    for (var i = 0; i < possibleInvites.length; i++) {
		var temp = (i === 0 ? `Top joueurs\n` : "") + (i + 1) + " :small_orange_diamond: **" + possibleInvites[i] + "**\n";
    		if ((message2 + temp).length <= 2000 - 3) {
			message2 += temp;
		} else {
			message2 += "";
			message.channel.send(message2);
			message2 = "";
		}
    }
	message2 += "";
	message.channel.send(message2);
	
    send(message.channel, embed, {
        name: 'Vaction',
        icon: 'https://cdn.discordapp.com/attachments/439036803366912015/449670314192928768/Vaction_Logo.png'
    })
    
}

module.exports.help = {
  name: "top"
}
