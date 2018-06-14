const Discord = require("discord.js");
const fs = require("fs");
const prettyMs = require('pretty-ms');
let currentTime = Date.now()
function gcoins() {
  let min = 200
  let max = 350
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.run = async (bot, message, args, sql) => {
  let newgift = gcoins()
  
  if(message.mentions.users.size < 1){
    {
    let rows = sql.prepare(`SELECT * FROM profile WHERE UserID = '${message.author.id}'`).get()
    if(rows.length < 1) return message.reply("`غير مسجل بعد`").then(msg => {msg.delete(5000)});
    }
    let allrep = sql.prepare(`SELECT * FROM daily WHERE UserID = '${message.author.id}'`).get()
    if(!allrep) {
      let pUser = message.author;
      let rows = sql.prepare(`SELECT * FROM profile WHERE UserID = '${message.author.id}'`).get()
    if(rows.length < 1) return message.reply("`غير مسجل بعد`").then(msg => {msg.delete(5000)});
      let sCoins = rows.coins;
      sql.prepare(`UPDATE profile SET coins = ${sCoins + newgift} WHERE UserID = '${message.author.id}'`).run()
      sql.prepare(`INSERT INTO daily (UserID, GuildID, Time) VALUES ('${message.author.id}', '${message.guild.id}', '${currentTime + 43200000}')`).run()
      message.channel.send(`🏧** | ${message.author.username}, you received your 💴${newgift} daily credits!**`);
    }else{
 let timeleft = allrep.Time - Date.now()
          return message.channel.send(`__${prettyMs((timeleft), {verbose: true})}__ ** حاول بعد **`).then(msg => {msg.delete(10000)});
    }
    
  }else{
    {
      let pUser = message.mentions.users.first();
    let rows = sql.prepare(`SELECT * FROM profile WHERE UserID = '${pUser.id}'`).get()
    if(!rows) return message.channel.send("غير مسجل بعد").then(msg => {msg.delete(5000)});
    }
    let allrep = sql.prepare(`SELECT * FROM daily WHERE UserID = '${message.author.id}'`).get()
    if(!allrep) {
      let pUser = message.mentions.users.first();
      let rows = sql.prepare(`SELECT * FROM profile WHERE UserID = '${message.author.id}'`).get()
    if(rows.length < 1) return message.reply("`غير مسجل بعد`").then(msg => {msg.delete(5000)});
      let sCoins = rows.coins;
      sql.prepare(`UPDATE profile SET coins = ${sCoins + newgift} WHERE UserID = '${pUser.id}'`).run()
      sql.prepare(`INSERT INTO daily (UserID, GuildID, Time) VALUES ('${message.author.id}', '${message.guild.id}', '${currentTime + 43200000}')`).run()
      message.channel.send(`🏧** | ${pUser.username}, received 💴${newgift} daily credits from ${message.author.username}!**`);
    }else{
let timeleft = allrep.Time - Date.now()
          return message.channel.send(`__${prettyMs((timeleft), {verbose: true})}__ ** حاول بعد **`).then(msg => {msg.delete(10000)});
    }

  }

}

module.exports.help = {
  name: "#هدية"
}
