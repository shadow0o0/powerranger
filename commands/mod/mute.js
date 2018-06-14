const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //!tempmute @user 1s/m/h/d
  if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("لا توجد لديك الصلاحية للإسكات");
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("لم يتم العثور على المستخدم.");
  //if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("لا أستطيع إسكات الإدارة!");
  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          //SPEAK: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  
  if(!mutetime) {
       tomute.addRole(muterole.id);
        let muteEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setColor("#C2C2C2")
    .addField("[قام بإسكات]", `<@${tomute.id}>`)
   return message.channel.send(muteEmbed).then(msg => {msg.delete(5000)});

  }
  if(!parseInt(mutetime))return;
  await(tomute.addRole(muterole.id));
  
     let muteEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setColor("#C2C2C2")
    .addField("[قام بإسكات]", `<@${tomute.id}>`, true)
    // .addField("[من قبل]", `${message.author}`, true)
    .addField("[لمدة]", `${ms(ms(mutetime)*1000)}`, true)
  
    message.channel.send(muteEmbed).then(msg => {msg.delete(5000)});
  //message.reply(`<@${tomute.id}> لقد تم إسكاته لمدة : ${ms(ms(mutetime)*1000)}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> لقد تم إزالة الإسكات!`).then(msg => {msg.delete(5000)});
  }, ms(mutetime)*1000);


//end of module
}

module.exports.help = {
  name: "اسكت"
}
