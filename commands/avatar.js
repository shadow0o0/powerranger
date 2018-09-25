const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let avatarUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!avatarUser) return message.reply("لم يتم العثور على المستخدم");
    let avataricon = avatarUser.user.displayAvatarURL;
    let avatarembed = new Discord.RichEmbed()
    .setColor("#15f153")
    .setImage(avataricon);

    message.channel.send(avatarembed);
}

module.exports.help = {
  name:"avatar"
}
