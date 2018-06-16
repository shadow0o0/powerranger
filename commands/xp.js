const Discord = require("discord.js");


module.exports.run = async (bot, message, args, con) => {

  let target = message.author;

  con.query(`SELECT * FROM profile WHERE UserID = '${target.id}'`, (err, rows) =>{
    if (err) throw err;

    if(rows.length < 1) return message.reply("حاول مرة أخرى").then(msg => {msg.delete(5000)});
  

  let curxp = rows[0].xp;
  let curlvl = rows[0].lvl;
  let nxtLvlXp = curlvl * 1000;
  let difference = nxtLvlXp - curxp;

  let lvlEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("RANDOM")
  .addField("مستواك", curlvl, true)
  .addField("خبرتك", curxp, true)
  .setFooter(`${difference} XP til level up`, message.author.displayAvatarURL);

  message.channel.send(lvlEmbed).then(msg => {msg.delete(5000)});
});
}

module.exports.help = {
  name: "لفل"
}