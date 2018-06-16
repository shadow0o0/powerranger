
const fs = require("fs");
  const Discord = require("discord.js");

module.exports.run = async (bot, message, args, con) => {
    let noty = args.join(" ");
    if(message.mentions.users.size >= 1) return message.reply("خطأ بالأمر");
    if(noty.length < 1) return message.reply("الرجاء كتابة كلام مناسب عن نفسك")
    if(noty.length > 180) return message.reply("الرجاء كتابة كلام لا يزيد عن 180 حرف")

    con.query(`SELECT * FROM profile WHERE UserID = '${message.author.id}'`, (err, rows) =>{
    let sql;
    let uCoins = rows[0].coins;
    if(uCoins<200) return message.reply("لا يوجد لديك المبلغ اللازم");



    sql = `UPDATE profile SET note = "${noty}" WHERE UserID = '${message.author.id}'`;
    con.query(sql);
    sql = `UPDATE profile SET coins = ${uCoins - 200} WHERE UserID = '${message.author.id}'`;
  con.query(sql);

    return message.reply("تم تغيير المعلومات وخصم 200 ريال من رصيدك").then(msg => {msg.delete(5000)});
    });
}

module.exports.help = {
  name:"نوت"
}
