const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
var Jimp = require("jimp");
const mysql = require("mysql");
bot.commands = new Discord.Collection();




fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

fs.readdir("./others/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./others/${f}`);
    console.log(`${f} loaded!`);
  });
});

var con = mysql.createConnection({
  host: "",
    user: "",
    password: "",
    database: ""

});

con.connect(err =>{
if(err) throw err;
console.log("Connected to database!")
})

bot.on("ready", async () => {
  bot.user.setUsername("Hey Guys - بروفايل");
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity('Hey Guys | #بروفايل', {type: "PLAYING"});

  bot.setInterval(() =>{
    let d = Date.now()
  
    con.query(`SELECT * FROM rep`, (err, rows) =>{
      if (err) throw err;
      
      for (var i = 0; i < rows.length ; i++){
        if(rows[i].Time < d){
          con.query(`DELETE FROM rep WHERE UserID = '${rows[i].UserID}' AND Time = ${rows[i].Time}`)
          
        }
      }
    });
  }, 5000)
  
});


function generateXp() {
  let min = 2
  let max = 7
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



bot.on("message", async message => {
if (message.author.bot) return;
if (message.channel.type ==="dm") return;

let coinAmt = Math.floor(Math.random() * 3) + 1;
let baseAmt = Math.floor(Math.random() * 3) + 1;
con.query(`SELECT * FROM profile WHERE UserID = '${message.author.id}'`, (err, rows)=>{
  if(err) throw err;

  let sql;

  if(rows.length < 1){
    sql = `INSERT INTO profile (UserID, GuildID, xp, lvl, coins, bg, note, likes, rep, w0, w1, w2, w3, w4, w5) VALUES ('${message.author.id}', '${message.guild.id}', ${generateXp()}, '1', '0', '1', 'لايوجد', '0', '0', '1', '0', '0', '0', '0', '0')`
  }
  else if(coinAmt === baseAmt){
    let coins = rows[0].coins
    let xp = rows[0].xp
    sql = `UPDATE profile SET coins = ${coins + coinAmt}, xp = ${xp + generateXp()} WHERE UserID = '${message.author.id}'`;
    con.query(sql);
  }
  else{
    let xp = rows[0].xp
    sql = `UPDATE profile SET xp = ${xp + generateXp()} WHERE UserID = '${message.author.id}'`;
    con.query(sql);
    let curlvl = rows[0].lvl;
    let nxtLvl = rows[0].lvl * 1000;
    if(nxtLvl <= rows[0].xp){
      sql = `UPDATE profile SET lvl = ${curlvl + 1} WHERE UserID = '${message.author.id}'`;
      con.query(sql);
      let lvlico = message.author.displayAvatarURL;
    let lvlup = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setThumbnail(lvlico)
    .setTitle("إرتقاء بالمستوى!")
    .setColor("#6E0A51")
    .addField("مستواك الحالي", curlvl + 1);

    message.channel.send(lvlup).then(msg => {msg.delete(5000)});
    }
  }
  con.query(sql);
});
con.query(`SELECT * FROM about WHERE UserID = '${message.author.id}'`, (err, rows)=>{
  if(err) throw err;

  let sql;

  if(rows.length < 1){
    sql = `INSERT INTO about (UserID, career, age, club, model, study, future, life, words) VALUES ('${message.author.id}', '#منصبي', '#عمري', '#نادي', '#قدوتي', '#تخصصي', '#طموحي', '#حكمتي', '#خاطري')`
     con.query(sql);
  }
});


  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  //if (message.content.startsWith("فهد")) return message.reply({files: ["https://cdn.discordapp.com/attachments/417087715444523010/430350204168962050/image.png"]});
  //if (message.content.toString()== ".") return message.channel.send("y");
  if (!message.content.startsWith(prefix)) return;
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args,con);


});

bot.login("");
