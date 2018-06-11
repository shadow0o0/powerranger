
const Discord = require("discord.js");

module.exports.run = async (bot, message, args,sql) => {
    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return;
   let maincat = message.guild.channels.find("name",args.join(" "));
   if(!maincat) return message.channel.send("There is no voice channel called : `"+args.join(" ")+"`")
    let rows = sql.prepare(`SELECT * FROM guilds WHERE guildID = '${message.author.guild.id}'`).get()
    if(!rows){
        sql.prepare(`INSERT INTO guilds (guildID, chname, catname) VALUES ('${message.author.guild.id}', '${args.join(" ")}','الرومات المؤقته')`).run();
    }else{
        sql.prepare(`UPDATE guilds SET chname = '${args.join(" ")}' WHERE guildID = '${message.author.guild.id}'`).run();
    }
message.channel.send("Voice channel successfully set to : `"+args.join(" ")+"`");
}

module.exports.help = {
  name:"#setchannel"
}
