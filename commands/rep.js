const ms = require("ms");
const fs = require("fs");
const Discord = require("discord.js");
const prettyMs = require('pretty-ms');
module.exports.run = async (bot, message, args, con) => {
  let currentTime = Date.now()
let LUser;
  message.delete(5000);
  let pUser = message.mentions.users.first();
  if(message.mentions.users.size < 1) return message.channel.send("`#سمعة @user#123`").then(msg => {msg.delete(5000)});
  con.query(`SELECT * FROM profile WHERE UserID = '${pUser.id}'`, (err, rows) =>{
    if (err) throw err;
    if(rows.length < 1) return message.reply("`غير مسجل بعد`").then(msg => {msg.delete(5000)});
    let LUser  = rows[0].rep;
    
  });
    
    
      let sql;
      con.query(`SELECT * FROM rep WHERE UserID = '${message.author.id}'`, (err, rows) =>{
        if (err) throw err;
        
        if(rows.length < 1) {
          
          con.query(`SELECT * FROM profile WHERE UserID = '${pUser.id}'`, (err, rows) =>{
    if (err) throw err;
    if(rows.length < 1) return message.reply("`غير مسجل بعد`").then(msg => {msg.delete(5000)});
    let LUser  = rows[0].rep;
            sql = `INSERT INTO rep (UserID, LikedUser, GuildID, Time) VALUES ('${message.author.id}', '${pUser.id}', '${message.guild.id}', '${currentTime + 43200000}')`
          con.query(sql);
          if(args[1] === '-'){
          sql = `UPDATE profile SET rep = ${LUser - 1} WHERE UserID = '${pUser.id}'`;
          con.query(sql);
           return message.reply("تم خفض السمعة").then(msg => {msg.delete(5000)});
          }else{
            sql = `UPDATE profile SET rep = ${LUser + 1} WHERE UserID = '${pUser.id}'`;
            con.query(sql);
             return message.reply("تم رفع السمعة").then(msg => {msg.delete(5000)});
           }
            });
        }else{
          for (var i = 0; i < rows.length;i++){
            
          if(rows[i].LikedUser === pUser.id){
            if(rows[i].LikedUser !== pUser.id) continue;
            let timeleft = rows[i].Time - Date.now()
            return message.channel.send(`__${prettyMs((timeleft), {verbose: true})}__** من قبل حاول بعد <@${pUser.id}>  تم إعطاء سمعة لـ **`).then(msg => {msg.delete(10000)});
        
        }
          }
       
          
          
          con.query(`SELECT * FROM profile WHERE UserID = '${pUser.id}'`, (err, rows) =>{
    if (err) throw err;
    if(rows.length < 1) return message.reply("`غير مسجل بعد`").then(msg => {msg.delete(5000)});
    let LUser  = rows[0].rep;
    sql = `INSERT INTO rep (UserID, LikedUser, GuildID, Time) VALUES ('${message.author.id}', '${pUser.id}', '${message.guild.id}', '${currentTime + 43200000}')`
           con.query(sql);
           if(args[1] === '-'){
            sql = `UPDATE profile SET rep = ${LUser - 1} WHERE UserID = '${pUser.id}'`;
            con.query(sql);
             return message.reply("تم خفض السمعة").then(msg => {msg.delete(5000)});
            }else{
              sql = `UPDATE profile SET rep = ${LUser + 1} WHERE UserID = '${pUser.id}'`;
              con.query(sql);
               return message.reply("تم رفع السمعة").then(msg => {msg.delete(5000)});
             }
          });
            
        }  
              
          });
            
  
  
        
        

    
  }
module.exports.help = {
name:"سمعه"
}
