const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
var Jimp = require("jimp");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profile.sqlite');
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

bot.on("ready", async () => {
  bot.user.setUsername("بروفايل");
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity('#شرح', {type: "PLAYING"});
  const profile = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'profile';").get();
  if (!profile['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE profile (UserID TEXT PRIMARY KEY, GuildID TEXT, xp INTEGER, lvl INTEGER, coins INTEGER, bg INTEGER, note TEXT, likes INTEGER, rep INTEGER, w0 INTEGER, w1 INTEGER, w2 INTEGER, w3 INTEGER, w4 INTEGER, w5 INTEGER);").run();
  }
  const rep = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'rep';").get();
  if (!rep['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE rep (UserID, LikedUser TEXT PRIMARY KEY, GuildID TEXT, Time TEXT);").run();
  }
  const daily = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'daily';").get();
  if (!daily['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE `daily` (`UserID`	TEXT PRIMARY KEY,`GuildID`	TEXT,`Time`	TEXT)").run();
  }
  const liked = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'liked';").get();
  if (!liked['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE liked (UserID, LikedUser TEXT PRIMARY KEY, GuildID TEXT, Time TEXT);").run();
  }

  const about = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'about';").get();
  if (!about['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE about (UserID TEXT PRIMARY KEY, career TEXT, age TEXT, club TEXT, model TEXT, study TEXT, future TEXT, life TEXT, words TEXT);").run();
  }

  
  bot.setInterval(() =>{
    let d = Date.now()
  
   let rep = sql.prepare(`SELECT * FROM rep`).all()
      if(!rep)return;
      for (var i = 0; i < rep.length ; i++){
        if(rep[i].Time < d){
          sql.prepare(`DELETE FROM rep WHERE UserID = '${rep[i].UserID}' AND Time = ${rep[i].Time}`).run();
          
        }
      }
    
    let daily = sql.prepare(`SELECT * FROM daily`).all()
      if(!daily)return;
      for (var i = 0; i < daily.length ; i++){
        if(daily[i].Time < d){
          sql.prepare(`DELETE FROM daily WHERE UserID = '${daily[i].UserID}' AND Time = ${daily[i].Time}`).run();
          
        }
      }
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

  let profile = sql.prepare(`SELECT * FROM profile WHERE UserID = '${message.author.id}'`).get()

  let sqlstr;

  if(!profile){
    sqlstr = `INSERT INTO profile (UserID, GuildID, xp, lvl, coins, bg, note, likes, rep, w0, w1, w2, w3, w4, w5) VALUES ('${message.author.id}', '${message.guild.id}', ${generateXp()}, '1', '0', '1', 'لايوجد', '0', '0', '1', '0', '0', '0', '0', '0')`
  }
  else if(coinAmt === baseAmt){
    let coins = profile.coins
    let xp = profile.xp
    sqlstr = `UPDATE profile SET coins = ${coins + coinAmt}, xp = ${xp + generateXp()} WHERE UserID = '${message.author.id}'`;
    sql.prepare(sqlstr).run();
  }
  else{
    let xp = profile.xp
    sqlstr = `UPDATE profile SET xp = ${xp + generateXp()} WHERE UserID = '${message.author.id}'`;
    sql.prepare(sqlstr).run();
    let curlvl = profile.lvl;
    let nxtLvl = profile.lvl * 1000;
    if(nxtLvl <= profile.xp){
      sqlstr = `UPDATE profile SET lvl = ${curlvl + 1} WHERE UserID = '${message.author.id}'`;
      sql.prepare(sqlstr).run();
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
  sql.prepare(sqlstr).run();

let about = sql.prepare(`SELECT * FROM about WHERE UserID = '${message.author.id}'`).get()



  if(!about){
    sqlstr = `INSERT INTO about (UserID, career, age, club, model, study, future, life, words) VALUES ('${message.author.id}', '#منصبي', '#عمري', '#نادي', '#قدوتي', '#تخصصي', '#طموحي', '#حكمتي', '#خاطري')`
     sql.prepare(sqlstr).run();
  }


  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  //if (message.content.startsWith("فهد")) return message.reply({files: ["https://cdn.discordapp.com/attachments/417087715444523010/430350204168962050/image.png"]});
  //if (message.content.toString()== ".") return message.channel.send("y");
  if (!message.content.startsWith(prefix)) return;
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args, sql);


});

bot.login(process.env.BOT_TOKEN);
