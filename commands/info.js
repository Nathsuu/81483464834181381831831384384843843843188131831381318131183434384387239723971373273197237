function info(message, prefix, client){
     if (message.content.startsWith(prefix + "info")) {
  var memberavatar = message.author.avatarURL
  var membername = message.author.username
  var mentionned = message.mentions.users.first();
    var getvalueof;
    if(mentionned){
    var getvalueof = mentionned;
    }else {
    var getvalueof = message.author;
    }
    if(getvalueof.bot == true){
        var checkbot = "L'utilisateur est un bot";
    } else {
        var checkbot = "N'est pas un bot";
    }
  if (getvalueof.presence.status == 'online') {
        var etat = "En Ligne";
    } else if (getvalueof.presence.status == "offline"){
        var etat = "Invisible";
    } else if (getvalueof.presence.status == "idle"){
        var etat = "Inactif";
    } else if(getvalueof.presence.status == "dnd"){
        var etat = "Ne pas déranger";
    }
  if(getvalueof.presence.game === null) {
        var gamepresence = "Il ne joue pas actuellement"
     } else {
        var gamepresence = getvalueof.presence.game.name
    }        
              message.channel.send({embed: {
                color: Math.floor(Math.random()*16777216),
                author: {
                  name: client.user.username,
                  icon_url: client.user.avatarURL
                },
              type: 'rich',
              description: '',
              title : "Information de l\'utilisateur",
              fields: [{
                name: 'Pseudo:',
                value: getvalueof.username,
                inline: true
              }, {
                name: 'Discriminateur:',
                value: getvalueof.discriminator,
                inline: true
              },{
              name: "Pseudo Serveur:",
              value: getvalueof + " ",
              inline: true          },{        
             name: "ID:",
             value: getvalueof.id,
             inline: true      
         },{        
            name: "Joue à:",
            value: gamepresence,
            inline: true  
         },{
           name: "Statut:",
           value: etat,
           inline: true
        },{
          name: "description des rôles :",
          value: "`\n" + message.guild.members.get(getvalueof.id).roles.array().map(g => "" + g.name + "").join(', ') + " `\n",
          inline: true
}],
},
footer: {
    icon_url: client.user.avatarURL,
    text: "©️ Mickael Peterson"
  }
})

}
    }

module.exports = info
