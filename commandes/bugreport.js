const superagent = require('superagent');
module.exports.run = async (client, message, args) => {

try {
   function clean(text) {
      if (typeof(text) === 'string')
        return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
      else
        return text;
    }
    const bug = args.join(" ")
    if (!bug) return message.channel.send(':comet: S il vous plaît spécifier un bug !')
    const content = clean(`**${message.author.username}**#${message.author.discriminator} (${message.author.id}) a rapporté un bug :\n${bug}\nServer: **${message.guild.name}**\nID: **${message.guild.id}**`);
    const id = 'channel_id';
    new Promise((resolve, reject) => {
      superagent.post(`https://discordapp.com/api/channels/${id}/messages`)
        .set('Authorization', `Bot ${client.token}`).send({ content })
        .end((err, res) => {
          if (err) {
            reject(err);
            message.reply('Une erreur s est produite lors de l envoi de votre rapport à Vaction Support. Veuillez réessayer plus tard.');
          } else {
            resolve(res);
            message.channel.send(`:white_check_mark: **${message.author.username}**, votre rapport a été soumis à l'assistance de Vaction pour examen. Je vous remercie !`);
          }
        });
    });
}  catch (err) {
console.log(err)
}
}
module.exports.help = {
  name: "bugreport"
}
