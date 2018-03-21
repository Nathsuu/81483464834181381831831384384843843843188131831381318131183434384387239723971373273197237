
const Discord = require('discord.js');
const client = new Discord.Client();
var fs = require('fs');
const prefix = 'v!'; 


client.on('ready', () => {
  setInterval(function(){
    guilds = ["Vaction | v!help", "Vaction | v!help | French Bot", "Vaction | by WinDino"]
    lecture = Math.floor((Math.random() * guilds.length));
    bot.user.setPresence({
      game:{
        name: `${guilds[lecture]}`, 
        type: 3
      }
    });
  }, 80000);  
});

client.on("channelCreate", async channel => {
  console.log(`${channel.name} a été créé.`);
	
  let sChannel = channel.guild.channels.find(`name`, "vchannel");
  sChannel.send(`${channel} a été créé`);

});

client.on("channelDelete", async channel => {
  console.log(`Un channel a été supprimé.`);
	
  let sChannel = channel.guild.channels.find(`name`, "vchannel");
  sChannel.send(`Un channel a été supprimé`);

});	

client.login(process.env.TOKEN);

client.on('message', message => {
	
const purge = require("./commands/purge.js");
const mute = require("./commands/mute.js");
const unmute = require("./commands/unmute.js");
const warns = require("./commands/warns.js");	
	
purge(message, prefix, bot)
mute(message, prefix, bot)
unmute(message, prefix, bot)
warns(message, prefix, bot)	


        if (message.author.bot) return;
        if (message.content.indexOf(prefix) !== 0) return;
        if (message.channel.type === "dm") return;
   
        try {
            let commandFile = require(`./commands/nsfw/${command}.js`);
            commandFile.run(bot, message, args);
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
	
