const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return;

  if(!parseInt(args[0])) return message.reply("`#cc 120 or less`");
if(parseInt(args[0]) < 0) return message.reply("`#cc 120 or less`");
if(isNaN(args.join(" ").slice(22))) return message.reply("`#cc 120 or less`");
 if(parseInt(args[0]) > 120) return message.reply("`#cc 120 or less`"); 
 
       for(let x = 1; x < `${parseInt(args[0])+1}`; x++){
           await message.guild.createRole({name:'#'+x,
              color: 'RANDOM',
              permissions:[]})
              }
  {
  await message.channel.send("`"+args[0]+"`"+`** Colors created.**`)
  
  }

}
    


module.exports.help = {
  name:"#cc"
}
