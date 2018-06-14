
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


  let userscore = bot.getScore.get(message.author.id, message.guild.id);
  if(!userscore){
   userscore = { user: message.author.id, guild: message.guild.id, voicexp: 0, textxp: 0,points: 1, voicpoints: 1, time: Date.now()}
  }
  let user = userscore.voicexp;

  let coinEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL)
  .setColor("#00FF00")
  .addField("[Voice xp]", `${user}`);

  message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
}

module.exports.help = {
  name:"#صوت"
}
