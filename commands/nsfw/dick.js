const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const fs = require("fs");

exports.run = (client, message, args) => {
if (!message.channel.nsfw) return message.channel.send("Cette commande n'est exécutable que dans un channel NSFW :underage:") 
var subreddits = [ 'dickpic' ] 
var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))]; randomPuppy(sub) .then(url => { request.get(url).then(r => { fs.writeFile(`dick.jpg`, r.body) 
message.channel.sendFile(r.body) fs.unlink(`./dick.jpg`) }) })
