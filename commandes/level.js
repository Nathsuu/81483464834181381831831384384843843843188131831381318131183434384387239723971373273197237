const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();

module.exports.run = async (client, message, args) => {

let points = JSON.parse(fs.readFileSync("./data/points.json", "utf8"));
const prefix = "v!";

client.on("message", message => {
  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  if (!points[message.author.id]) points[message.author.id] = {
    points: 0,
    level: 0
  };
  let userData = points[message.author.id];
  userData.points++;

  let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
  if (curLevel > userData.level) {
    // Level up!
    userData.level = curLevel;
    message.reply(`Vous avez atteint le niveau **${curLevel}** !`);
  }

  if (message.content.startsWith(prefix + "level")) {
    message.reply(`Vous êtes actuellement niveau ${userData.level}, avec ${userData.points} points.`);
  }
  fs.writeFile("./data/points.json", JSON.stringify(points), (err) => {
    if (err) console.error(err)
  });

});
}

module.exports.help = {
  name: "level"
}
