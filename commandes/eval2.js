const Discord = require("discord.js");

exports.run = async (client, message, args, level) => { 
  const code = args.join(" ");
  try {
    const evaled = eval(code);
    const clean = await client.clean(client, evaled);
    if (code) {
    const embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag}`, message.author.avatarURL)
    .setColor("RANDOM")
    .addField("Input\⬇", `${code}`)
    .addField("Output\⬇", `\`\`\`js\n${clean}\n\`\`\``)
    message.channel.send({embed});} else {
      const embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.tag}`, message.author.avatarURL)
      .setColor("RANDOM")
      .addField("Code", `none`)
      .addField("Output", `\`\`\`js\n${clean}\n\`\`\``)
    message.channel.send({embed});
    }
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
  }
};

exports.help = {
  name: "eval2"
};
