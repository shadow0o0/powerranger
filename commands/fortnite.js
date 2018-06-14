const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
 let role = message.guild.roles.find("name", 'fortnite');
       if (!role) return message.reply(`:no_entry_sign: **خطأ:** ${name} هذا الرول غير موجود!`);
       message.author.addRole(role).catch(e => {
        return message.channel.send(`:no_entry_sign: **Error:**\n${e}`);
    });

}
    
module.exports.help = {
  name:"$fortnite"
}
