const Discord = require("discord.js");

module.exports.run = async (bot, message, args, con) => {

  con.query(`SELECT * FROM profile WHERE UserID = '${message.author.id}'`, (err, rows) =>{
    if (err) throw err;
    if(rows.length < 1) return message.reply("حاول مرة أخرى").then(msg => {msg.delete(5000)});
  let uCoins = rows[0].coins;

  let coinEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL)
  .setColor("#00FF00")
  .addField("[💸 في رصيدك]", `${uCoins} ريال`);

  message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
  });
}

module.exports.help = {
  name: "رصيدي"
}