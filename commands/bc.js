const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return;
  let i = 0
    message.guild.members.forEach( member =>{
      if(member.user.bot) return true;
    let bcembed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setThumbnail(message.guild.iconURL)
    .addField("●[From]", message.guild.name, true)
    .addField("●[To]", `${member}` , true)
    .setColor("#525252")
    .addField("●", args.join(" "));

    //message.guild.members.forEach( member =>{  
    member.send(bcembed);
      i++
    message.delete();
        });
  message.channel.send(`**Broadcast sent to** `+"`"+i+"`"+` **user**`)
}
    
    //message.guild.members.forEach( member =>{  
    //member.send( `<@${message.author.id}> ! ` + "**" + message.guild.name + " : ** " + message.content.substr(10) + ` - ${member} ! `);
    //message.delete();
        //});
//}

module.exports.help = {
  name:"#ثضصصصصصصصصصصصصصصصصصصصصصصصص"
}
