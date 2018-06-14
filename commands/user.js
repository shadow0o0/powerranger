const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
                message.guild.fetchInvites().then(invs => {
      let member = bot.guilds.get(message.guild.id).members.get(message.author.id);
                  var mm;
                  if(!message.mentions.users.size < 1){
                    mm = message.mentions.users.first();
                  }else{
                    mm = message.author.id
                  } 
      let personalInvites = invs.filter(i => i.inviter.id === mm);
      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
      var moment = require('moment');
      var args = message.content.split(" ").slice(1);
let user = message.mentions.users.first();
var men = message.mentions.users.first();
 var heg;
 if(men) {
     heg = men
 } else {
     heg = message.author
 }
var mentionned = message.mentions.members.first();
  var h;
 if(mentionned) {
     h = mentionned
 } else {
     h = message.member
 }
        moment.locale('ar-TN');
      var id = new  Discord.RichEmbed()
       
    .setColor("#0a0909")
    .setAuthor(h.user.username, h.user.avatarURL) 
.addField(': دخولك للديسكورد قبل', `${moment(heg.createdTimestamp).format('YYYY/M/D HH:mm:ss')} **\n** \`${moment(heg.createdTimestamp).fromNow()}\`` ,true) 
.addField(': انضمامك للسيرفر قبل', `${moment(h.joinedAt).format('YYYY/M/D HH:mm:ss')} \n \`${moment(h.joinedAt).fromNow()}\``, true)
.addField(': عدد الدعوات', inviteCount,false)
.setFooter("-")  
    message.channel.send(id);
})

  
}
module.exports.help = {
  name:"#user"
}
