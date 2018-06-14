const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let colors = message.guild.roles.filter(role => role.name.startsWith("#"));
if(colors.size< 1) return message.channel.send("No colors available");

let str = args.join(" ");
let role = colors.find(role => role.name.slice(1).toLowerCase() === str.toLowerCase());

if(!role) return message.channel.send("This color does not exist!").then(msg => {msg.delete(3000)});

try{
	await message.member.removeRoles(colors);
	await message.member.addRole(role);
  let colorembed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setColor(role.hexColor)
    .setDescription(`** تم تغيير اللون بنجاح **`)
	message.channel.send(colorembed)
}catch(e){
	message.channel.send(`Error: ${e.message}`);
}
}



module.exports.help = {
  name:"لون"
}
