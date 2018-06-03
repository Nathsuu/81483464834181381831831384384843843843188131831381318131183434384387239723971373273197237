const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {


case "restart":
       resetBot(message.channel);
            function resetBot(channel) {
                message.react('✅')
                    .then(message => client.destroy())
                    .then(() => client.login(process.env.TOKEN));
                message.channel.send("``Ayerety is sucessfully restarted!``")
            }
            break;
}            
module.exports.help = {
  name: "reboot"
}            
