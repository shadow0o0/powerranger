
const fs = require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args, con) => {
  let career = args.join(" ");
  if(message.mentions.users.size >= 1) return message.reply("خطأ بالأمر");
  if(career.length < 1) return message.reply("`الرجاء كتابة منصبك`")
  if(career.length > 20) return message.reply("الرجاء كتابة كلام لا يزيد عن 20 حرف")

  con.query(`SELECT * FROM about WHERE UserID = '${message.author.id}'`, (err, rows) =>{
  let sql;
  let uCoins = rows[0].career;

  sql = `UPDATE about SET career = "${career}" WHERE UserID = '${message.author.id}'`;
  con.query(sql);

  return message.reply("تم تحديث معلوماتك بنجاح").then(msg => {msg.delete(5000)});
  });
}

module.exports.help = {
name:"منصبي"
}
