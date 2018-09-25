
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.roles.find("name", "▢")) return message.reply("رووح العب بعيد يا بابا!");
    let imgURL = args[0];
  
    if(!imgURL){
      let botAvatar = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setColor("#C2C2C2")
    .addField("✔ [تم تغيير صورة البوت بنجاح]", '!!')
    .setImage(message.guild.iconURL);
   await bot.user.setAvatar(message.guild.iconURL); 
      
     message.channel.send(botAvatar);
      
    
    message.delete();
      return;
    }
  let botAvatar = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setColor("#C2C2C2")
    .addField("✔ [تم تغيير صورة البوت بنجاح]", '!!')
    .setImage(imgURL);
    await bot.user.setAvatar(imgURL);
  
     message.channel.send(botAvatar);
  
 
  message.delete();
}

module.exports.help = {
  name:"dosetavatar"
}
