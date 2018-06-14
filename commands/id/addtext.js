
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.reply("رووح العب بعيد يا بابا!").then(msg => {msg.delete(5000)});
  let target = message.mentions.users.first();
  let member = message.guild.member(target);
  if(!member) return message.channel.send("`Please mention a user`").then(msg => {msg.delete(5000)});
  if(!parseInt(args[1])) return message.reply("غلط");
  if(parseInt(args[1]) < 0) return message.reply("غلط");
  if(isNaN(args.join(" ").slice(22))) return message.reply("غلط");
  let userscore = bot.getScore.get(member.user.id, message.guild.id);
  if(!userscore){
  return message.channe.send("`غير مسجل بعد`").then(msg => {msg.delete(5000)});
  }
  let userxp = userscore.textxp;
  let userpt = userscore.points;

  userscore.points = userscore.points + parseInt(args[1]);
  userscore.textxp = userscore.textxp + parseInt(args[1])*1000;
  bot.setScore.run(userscore);
  
  message.channel.send(`successfully adding **${args[1]}** to text xp`).then(msg => {msg.delete(5000)});
}

module.exports.help = {
  name:"#addtext"
}
