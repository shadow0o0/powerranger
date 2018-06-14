const Discord = require("discord.js");
const linkRecently = new Set();
module.exports.run = async (bot, message, args) => {
  message.delete(1000);
  if (linkRecently.has(message.author.id)) {
      message.delete();
      let timeoute = new Discord.RichEmbed()
    .setColor("#C2C2C2")
    .setTitle("إنتظر دقيقة");
      message.channel.send(timeoute).then(msg => {msg.delete(3000)});
} else {
message.guild.channels.find('id','426385552204627990').createInvite({
        unique: true,
        maxUses: 1,
        maxAge: 3600,
    }).then(invite =>
            
      message.author.send(invite.url),
    )
    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
          .setDescription(" تم أرسال الرابط برسالة خاصة ")
           .setAuthor(bot.user.username, bot.user.avatarURL)
            .setAuthor(bot.user.username, bot.user.avatarURL)
                .setFooter('طلب بواسطة: ' + message.author.tag)

      message.channel.send(embed).then(message => {message.delete(10000)})
              const Embed11 = new Discord.RichEmbed()
        .setColor("RANDOM")
        
    .setDescription(" مدة الرابط : ساعه  عدد استخدامات الرابط : 1 ")
      message.author.send(Embed11)
  
    }
    linkRecently.add(message.author.id);
        setTimeout(() => {
          linkRecently.delete(message.author.id);
        }, 60000);
}
module.exports.help = {
  name:"رابط"
}
