const Discord = require("discord.js");
const talkedRecently = new Set();
module.exports.run = async (bot, message, args) => {

  if (talkedRecently.has(message.author.id)) {
            
    let timeoute = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("إنتظر 60 ثانية");
            message.channel.send(timeoute).then(msg => {msg.delete(5000)});
    } else {
      message.delete(2000)
    let helpembed1 = new Discord.RichEmbed()
    .setAuthor(bot.user.username, bot.user.displayAvatarURL)
    .setDescription("~ أوامر بوت البروفايل ~")
    .setColor("RANDOM")
    
    .addField("#بروفايل", '● [لعرض البروفايل الخاص]')
    .addField("#متجر", '● [لعرض متجر الخلفيات]')
    .addField("#شراء", '● [لشراء خلفية من المتجر 100 ريال]')
    .addField("#نوت", '● [لكتابة كلام في خانة المعلومات 200 ريال]')
    .addField("#لايك", '● [للإعجاب بشخص داخل السيرفر كل 12 ساعة]')
    .addField("#تحويل", '● [تحويل مبلغ مالي لأحد الأعضاء]')
    .setFooter(`@${message.author.username} :المرسل`, message.author.displayAvatarURL);
    message.channel.send(helpembed1);
    }
  talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 60000);
}
module.exports.help = {
  name:"مساعدة"
}
