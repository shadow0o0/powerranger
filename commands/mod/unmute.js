const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
 if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("لا توجد لديك الصلاحية للإسكات");
let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   let muterole = message.guild.roles.find(`name`, "muted");
  if(message.guild.member(tomute).roles.has(muterole.id)){
       tomute.removeRole(muterole.id);
        let muteEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setColor("#C2C2C2")
    .addField("[لقد تم إزالة الإسكات!]", `<@${tomute.id}>`)
   return message.channel.send(muteEmbed).then(msg => {msg.delete(5000)});
    }
    }

module.exports.help = {
  name:"تكلم"
}
