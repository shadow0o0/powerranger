const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
         if(!message.author.id === '222790506906648576') return;
var gimg;
var gname;
var gmemb;
var gbots;
var groles;
var servers = bot.guilds;
servers.forEach((g)=>{
gname = g.name;
gimg = g.iconURL;
gmemb = g.members.size;
gbots = g.members.filter(m=>m.bot).size;
groles = g.roles.map(r=> {return r.name});
let serv = new Discord.RichEmbed()
.setAuthor(gname,gimg)
.setThumbnail(gimg)
.addField('Server bots',gbots)
.addField('Server Member Count',gmemb = g.members.size)
.setColor('RANDOM')
message.channel.send(`
Server Name : **${gname}**
Server MemberCount : **${gmemb} **
        `);
      message.channel.sendEmbed(serv);
  
})
                }
module.exports.help = {
  name:"servers"
}
