const Discord = require("discord.js");


module.exports.run = async (client, msg) => {

  var startTime = Date.now();

msg.channel.send('*Calcul du ping...*').then(m => m.edit(`**:ping_pong: Ping = ${Date.now() - startTime} ms**`));

}


module.exports.help = {
  name:"ping"
}
