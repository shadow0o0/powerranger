
const Discord = require("discord.js");
const mylikesRecently = new Set();
module.exports.run = async (bot, message, args, con) => {
    message.delete(5000)
    let timeoute = new Discord.RichEmbed()
    .setColor("#C2C2C2")
    .setTitle("إنتظر 20 ثانية");
    if (mylikesRecently.has(message.author.id)) {
        
        message.channel.send(timeoute).then(msg => {msg.delete(5000)});
} else {
    message.reply( "`تم إرسال قائمة الفانزات بالخاص`").then(msg => {msg.delete(5000)});
        let names = '';
      let sql;
      con.query(`SELECT * FROM liked WHERE LikedUser = '${message.author.id}'`, (err, rows) =>{
        if (err) throw err;
        
        if(rows.length < 1) return message.reply("`للأسف لا توجد لديك لايكات`").then(msg => {msg.delete(5000)});
          
            for(let i = 0 ; i < rows.length ; i++){
             let puser = bot.users.get(rows[i].UserID);
              if(!puser) return 'UNDEFIEND';
                names = names + `${puser.username}` + `\n`

            }

  let likesEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("RANDOM")
  .setTitle(rows.length + ` : قائمة فانزاتك`)
  .setDescription(`${names}`)
  .setTimestamp()
            message.author.send(likesEmbed);
          });
          mylikesRecently.add(message.author.id);
          setTimeout(() => {
            mylikesRecently.delete(message.author.id);
          }, 20000);
        }
  }
module.exports.help = {
name:"فانزاتي"
}
