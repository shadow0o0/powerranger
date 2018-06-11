
const Discord = require("discord.js");

module.exports.run = async (bot, message, args,sql) => {
    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return;
   let maincat = message.guild.channels.find("name",args.join(" "));
   if(!maincat) return message.channel.send("There is no category called : `"+args.join(" ")+"`")
    let rows = sql.prepare(`SELECT * FROM guilds WHERE guildID = '${message.guild.id}'`).get()
    if(!rows){
        sql.prepare(`INSERT INTO guilds (guildID, chname, catname) VALUES ('${message.guild.id}', 'إنشاء روم','${args.join(" ")}')`).run();
    }else{
        sql.prepare(`UPDATE guilds SET catname = '${args.join(" ")}' WHERE guildID = '${message.guild.id}'`).run();
    }
message.channel.send("Category successfully set to : `"+args.join(" ")+"`");
}

module.exports.help = {
  name:"#setcat"
}
