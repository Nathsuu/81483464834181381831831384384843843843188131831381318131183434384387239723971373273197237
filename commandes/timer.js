const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (client, message, args, level) => {

let Timer = args[0];

if(!args[0]){
  return message.channel.send("Vous n'avez pas mentionné de temps ! Exemple/Usage : ``v!timer 50s/m/h``");
}

if(args[0] <= 0){
  return message.channel.send("Vous n'avez pas mentionné de temps ! Exemple/Usage : ``v!timer 50s/m/h``");
}

message.channel.send("La minuterie a été définie pour : " + `${ms(ms(Timer), {long: true})}`)

setTimeout(function(){
  message.channel.send(`La minuterie est terminée, cela a duré : ${ms(ms(Timer), {long: true})}`)

}, ms(Timer));
}
module.exports.help = {
  name: "timer"
}
