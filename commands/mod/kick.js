const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.delete();
    if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("لا توجد لديك صلاحية الطرد");
    if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) return message.reply("لا توجد لدي صلاحية الطرد");
    let kUser = message.mentions.users.first();
    let kReason = args.join(" ").slice(22);
    if(message.mentions.users.size < 1) return message.reply("لم يتم تحديد المستخم!");
    if(!kReason) return message.reply("يجب كتابة سبب الطرد");
    if(!message.guild.member(kUser).kickable) return message.reply("لايمكن طرد الإدارة");

    let kickEmbed = new Discord.RichEmbed()
    .setAuthor(`@${kUser.username}`, kUser.displayAvatarURL)
    .setColor("#e56b00")
    .addField("[الحساب المطرود]", `${kUser} with ID ${kUser.id}`)
    .addField("[طرد بواسطة]", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("[مكان تنفيذ الأمر]", message.channel)
    .addField("[طرد في تاريخ]", message.createdAt)
    .addField("[السبب]", kReason)
    .setFooter(`@${message.author.username} :بواسطة`, message.author.displayAvatarURL);
    
    let kickEmbed2 = new Discord.RichEmbed()
    .setAuthor(`@${kUser.username}`, kUser.displayAvatarURL)
    .setColor("#e56b00")
    .addField("[تم طرد]", `${kUser} with ID ${kUser.id}`)
    .setFooter(`@${message.author.username} :بواسطة`, message.author.displayAvatarURL);

    let kickChannel = message.guild.channels.find(`name`, "incidents");
    if(!kickChannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(kUser).kick();
    kickChannel.send(kickEmbed);
    message.channel.send(kickEmbed2);
}

module.exports.help = {
  name:"اطرد"
}
