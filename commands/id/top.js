
const Discord = require("discord.js");
var Canvas = require('canvas')
var jimp = require('jimp')
const fs = require("fs");
var AsciiTable = require('ascii-data-table').default
module.exports.run = async (bot, message, args, sql) => {

  let userscore = bot.getScore.get(message.author.id, message.guild.id);
  if(!userscore){
   userscore = { user: message.author.id, guild: message.guild.id, voicexp: 0, textxp: 0,points: 1, voicpoints: 1, time: Date.now()}
  }
  let user = userscore.points;
  let target = message.author;

    if(!userscore) return message.reply("حاول مرة أخرى").then(msg => {msg.delete(5000)});
  {


  let rankedtext = sql.prepare(`SELECT a1.user, a1.textxp , COUNT (a2.textxp) rank 
    FROM scores a1, scores a2 
    WHERE a1.textxp < a2.textxp OR (a1.textxp=a2.textxp AND a1.user = a2.user) 
    GROUP BY a1.user, a1.textxp 
    ORDER BY a1.textxp DESC, a1.user DESC LIMIT 10`).all()
let data = []
for(let i =0;i<rankedtext.length;i++){
data.push([`\n    **#${rankedtext[i].rank}**   -   ${bot.users.get(rankedtext[i].user).username}   :   __${rankedtext[i].textxp}__  \n`])
  
  
  }
  message.channel.send(`╔═══════════════════╗\n                     __**TOP 10 TEXT**__\n${data}╚═══════════════════╝`).then(msg => {msg.delete(10000)});
  }
  let rankedtext = sql.prepare(`SELECT a1.user, a1.voicexp , COUNT (a2.voicexp) rank 
    FROM scores a1, scores a2 
    WHERE a1.voicexp < a2.voicexp OR (a1.voicexp=a2.voicexp AND a1.user = a2.user) 
    GROUP BY a1.user, a1.voicexp 
    ORDER BY a1.voicexp DESC, a1.user DESC LIMIT 10`).all()
let data = []
for(let i =0;i<rankedtext.length;i++){
  let puser=bot.users.get(rankedtext[i].user)
  if(!puser) continue;
data.push([`\n    **#${rankedtext[i].rank}**   -   ${bot.users.get(rankedtext[i].user).username}   :   __${rankedtext[i].voicexp}__  \n`])
  
  
  }
  message.channel.send(`╔═══════════════════╗\n                     __**TOP 10 VOICE**__\n${data}╚═══════════════════╝`).then(msg => {msg.delete(10000)});
}

module.exports.help = {
  name:"#top"
}
