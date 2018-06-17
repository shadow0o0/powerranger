
const fs = require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args, con) => {
  let note = args.join(" ");
  if(message.mentions.users.size >= 1) return message.reply("خطأ بالأمر");
  if(note.length < 1) return message.reply("`الرجاء كتابة قدوتك`")
  if(note.length > 20) return message.reply("الرجاء كتابة كلام لا يزيد عن 20 حرف")

  con.query(`SELECT * FROM about WHERE UserID = '${message.author.id}'`, (err, rows) =>{
  let sql;
  let age = rows[0].age;

  sql = `UPDATE about SET model = "${note}" WHERE UserID = '${message.author.id}'`;
  con.query(sql);

  return message.reply("تم تحدث معلوماتك بنجاح").then(msg => {msg.delete(5000)});
  });
}

module.exports.help = {
name:"قدوتي"
}
