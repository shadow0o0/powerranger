
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.reply("رووح العب بعيد يا بابا!").then(msg => {msg.delete(5000)});
    let imgURL = args[0];
  
    if(!imgURL){
      let botAvatar = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setColor("#C2C2C2")
    .addField("✔ [تم تغيير صورة البوت بنجاح]", '!!')
    .setImage(message.guild.iconURL);
   await bot.user.setAvatar(message.guild.iconURL); 
      
     message.channel.send(botAvatar).then(msg => {msg.delete(5000)});
      
    
    message.delete();
      return;
    }
  let botAvatar = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setColor("#C2C2C2")
    .addField("✔ [تم تغيير صورة البوت بنجاح]", '!!')
    .setImage(imgURL);
    await bot.user.setAvatar(imgURL);
  
     message.channel.send(botAvatar).then(msg => {msg.delete(5000)});
  
 
  message.delete();
}

module.exports.help = {
  name:"proavatar"
}
