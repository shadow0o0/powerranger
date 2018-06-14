const Discord = require("discord.js");
const linkRecently = new Set();
module.exports.run = async (bot, message, args) => {
  
  if (linkRecently.has(message.author.id)) {
      message.delete();
      let timeoute = new Discord.RichEmbed()
    .setColor("#C2C2C2")
    .setTitle("wait 60 Seconds");
      message.channel.send(timeoute).then(msg => {msg.delete(3000)});
} else {
let colors = message.guild.roles.filter(role => role.name.startsWith("#"));
if(colors.size< 1) return message.channel.send("No colors available");
  //message.channel.send("");
await message.channel.send(`**اختر أحد الألوان الموجودة:** \n\n\n `+colors.array().sort((a, b) => a.comparePositionTo(b)).reverse().join('|')+` \n\n\n`+"**__مثال : __** `لون 1`");
//await message.channel.send("`#لون red` : مثال");
}
  linkRecently.add(message.author.id);
        setTimeout(() => {
          linkRecently.delete(message.author.id);
        }, 60000);
}
module.exports.help = {
  name:"ثضصقضصفق##1"
}
