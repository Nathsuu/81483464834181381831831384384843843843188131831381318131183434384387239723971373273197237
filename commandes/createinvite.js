const Discord = require("discord.js");

exports.run = async (anko, message, args, color) => {
  if (!message.member.hasPermission("CREATE_INSTANT_INVITE")) return;
  message.channel.createInvite({maxAge: 0}).then(invite => {
  message.reply("tiens : ${invite}, par contre tu as intérêt d'inviter des personnes !");
  });
}

exports.help = {
  name: 'createinvite',
}
