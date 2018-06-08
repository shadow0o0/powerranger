
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
message.channel.send('وش اسمك؟')
      .then(function(){
        message.channel.awaitMessages(response => message.content, {
          max: 1,
          time: 15000,
          errors: ['time'],
        })
        .then((collected) => {
            message.channel.send(`رح العب بعيد يا ${collected.first().content}`);
          })
          .catch(function(){
            message.channel.send('تخاف تكتب اسمك ؟');
          });
      });

}

module.exports.help = {
  name:"nhelp"
}
