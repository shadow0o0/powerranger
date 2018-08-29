const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
var jimp = require("jimp");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profile.sqlite');
var Canvas = require('canvas')
const moment = require("moment")
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

fs.readdir("./commands/about/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/about/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

fs.readdir("./commands/id/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/id/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});


fs.readdir("./commands/profile/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/profile/${f}`);
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
let avoicexp;
function generateXp() {
  let min = 1
  let max = 2
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generatevoiceXp() {
  let min = 1
  let max = 1
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateXxp() {
  let min = 1
  let max = 2
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let b;

var dat = JSON.parse("{}");
function forEachObject(obj, func) {
    Object.keys(obj).forEach(function (key) { func(key, obj[key]) })
}
bot.on("ready", async () => {
  bot.setInterval(() =>{
 var exec = require('child_process').exec, child;
  child = exec('rm -rf .git')
  }, 3600000)
  
  bot.user.setUsername("TOGETHER");
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity('#help', {type: "PLAYING"});
  const profile = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'profile';").get();
  if (!profile['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE profile (UserID TEXT PRIMARY KEY, GuildID TEXT, xp INTEGER, lvl INTEGER, coins INTEGER, bg INTEGER, note TEXT, likes INTEGER, rep INTEGER, w0 INTEGER, w1 INTEGER, w2 INTEGER, w3 INTEGER, w4 INTEGER, w5 INTEGER);").run();
  }
  const rep = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'rep';").get();
  if (!rep['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE `rep` (`UserID`	TEXT,`LikedUser`	TEXT,`GuildID`	TEXT,`Time`	TEXT,PRIMARY KEY(`LikedUser`,`UserID`))").run();
  }
  const daily = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'daily';").get();
  if (!daily['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE `daily` (`UserID`	TEXT PRIMARY KEY,`GuildID`	TEXT,`Time`	TEXT)").run();
  }
  const liked = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'liked';").get();
  if (!liked['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE `liked` (`UserID`	TEXT,`LikedUser`	TEXT,`GuildID`	TEXT, `Time`	TEXT, PRIMARY KEY(`LikedUser`,`UserID`))").run();
  }

  const about = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'about';").get();
  if (!about['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE about (UserID TEXT PRIMARY KEY, career TEXT, age TEXT, club TEXT, model TEXT, study TEXT, future TEXT, life TEXT, words TEXT);").run();
  }
  
  
    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
    if (!table['count(*)']) {
      // If the table isn't there, create it and setup the database correctly.
      sql.prepare("CREATE TABLE scores (user TEXT PRIMARY KEY, guild TEXT, voicexp INTEGER, textxp INTEGER, points INTEGER, voicpoints INTEGER, time TEXT);").run();
    }
    const blockedtable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'voiceblock';").get();
    if (!blockedtable['count(*)']) {
      // If the table isn't there, create it and setup the database correctly.
      sql.prepare("CREATE TABLE voiceblock (user TEXT PRIMARY KEY, guild TEXT, time TEXT);").run();
    }
    const promote = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'promote';").get();
    if (!promote['count(*)']) {
      // If the table isn't there, create it and setup the database correctly.
      sql.prepare("CREATE TABLE `promote` (`user`	TEXT,`guild`	TEXT,`promote`	INTEGER,PRIMARY KEY(`promote`,`user`));").run();
    }
    bot.getBlock = sql.prepare("SELECT * FROM voiceblock");
    bot.setBlock = sql.prepare("INSERT OR REPLACE INTO voiceblock (user, guild, time) VALUES (@user, @guild, @time);");
    bot.getProm = sql.prepare("SELECT * FROM promote");
    bot.setProm = sql.prepare("INSERT OR REPLACE INTO promote (user, guild, promote) VALUES (@user, @guild, @promote);");
    bot.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
    bot.setScore = sql.prepare("INSERT OR REPLACE INTO scores (user, guild, voicexp, textxp, points, voicpoints, time) VALUES (@user, @guild, @voicexp, @textxp, @points, @voicpoints, @time);");
  
  
  let guild = bot.guilds.get("358330224984719370");
  let users = guild.members.map(member => member.user.id);
let userson = [];
  let i;
  b=0;
  

for (i=0 ; i < users.length ; i++) {
 let   check = guild.members.get(users[i]);
if(!check.voiceChannelID){
        continue;
}else{
  b++
}
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
  
//////////////////////////////////////////////////////////////////

avoicexp = bot.setInterval(() =>{  
  let guild = bot.guilds.get("358330224984719370");
  let channel = bot.channels.get("483140095688572948")
  let users = guild.members.map(member => member.user.id);
  let userson = [];
  let i;
  

for (i=0 ; i < users.length ; i++) {
 let   check = guild.members.get(users[i]);
if(!check.voiceChannelID){
        continue;
}else{
  if(check.user.bot) continue;
//  if(!check.roles.find("name", "إدارة")) continue;
    userson.push(check.id);
}
}
  
  for( let z = 0; z < userson.length ; z++ ){
    let ppuser = guild.members.get(userson[z])
           
        if(ppuser.selfMute === true || ppuser.serverMute === true)return;
  let score = sql.prepare(`SELECT * FROM scores WHERE user = '${ppuser.user.id}'`).get()
  if (!score) {
      score = { user: ppuser.user.id, guild: ppuser.guild.id, voicexp: 0, textxp: 0,points: 1, voicpoints: 1, time: Date.now()}
  }


  score.voicexp = score.voicexp + generatevoiceXp();
        bot.setScore.run(score);
    
        let profile = sql.prepare(`SELECT * FROM profile WHERE UserID = '${ppuser.user.id}'`).get()



  if(!profile){
    sql.prepare(`INSERT INTO profile (UserID, GuildID, xp, lvl, coins, bg, note, likes, rep, w0, w1, w2, w3, w4, w5) VALUES ('${ppuser.user.id}', '${ppuser.guild.id}', ${generateXxp()}, '1', '0', '1', 'None', '0', '0', '1', '0', '0', '0', '0', '0')`).run();
  }else{
    sql.prepare(`UPDATE profile SET xp = ${profile.xp + generateXxp()} WHERE UserID = '${ppuser.user.id}'`).run();
    sql.prepare(`UPDATE profile SET coins = ${profile.coins + generateXxp()} WHERE UserID = '${ppuser.user.id}'`).run();
    let curlvl = profile.lvl;
    let nxtLvl = profile.lvl * 1000;
    if(nxtLvl <= profile.xp){
     let sqlstr = `UPDATE profile SET lvl = ${curlvl + 1} WHERE UserID = '${ppuser.user.id}'`;
      sql.prepare(sqlstr).run();
      let lvlico = ppuser.user.displayAvatarURL;
    let lvlup = new Discord.RichEmbed()
    .setAuthor(ppuser.user.username, ppuser.user.displayAvatarURL)
    .setThumbnail(lvlico)
    .setTitle("Level Up!")
    .setColor("#6E0A51")
    .addField("Your current level", curlvl + 1);

    channel.send(lvlup).then(msg => {msg.delete(5000)});
    }
  }

    let curlvl = score.voicpoints;
    let nxtLvl = score.voicpoints * 1000;
    if(nxtLvl <= score.voicexp){
      score.voicpoints++;
    }
  bot.setScore.run(score); 
    
  }
}, 20000);

  
  
  guild.fetchInvites().then((data) => {
        data.forEach((Invite, key, map) => {
            var Inv = Invite.code;
            dat[Inv] = Invite.uses;
        })
    })
});





bot.on("message", async message => {
if (message.author.bot) return;
if (message.channel.type ==="dm") return;

let coinAmt = Math.floor(Math.random() * 3) + 1;
let baseAmt = Math.floor(Math.random() * 3) + 1;

  let profile = sql.prepare(`SELECT * FROM profile WHERE UserID = '${message.author.id}'`).get()

  let sqlstr;

  if(!profile){
    sqlstr = `INSERT INTO profile (UserID, GuildID, xp, lvl, coins, bg, note, likes, rep, w0, w1, w2, w3, w4, w5) VALUES ('${message.author.id}', '${message.guild.id}', ${generateXxp()}, '1', '0', '1', 'None', '0', '0', '1', '0', '0', '0', '0', '0')`
  }
  else if(coinAmt === baseAmt){
    let coins = profile.coins
    let xp = profile.xp
    sqlstr = `UPDATE profile SET coins = ${coins + coinAmt}, xp = ${xp + generateXxp()} WHERE UserID = '${message.author.id}'`;
    sql.prepare(sqlstr).run();
  }
  else{
    let xp = profile.xp
    sqlstr = `UPDATE profile SET xp = ${xp + generateXxp()} WHERE UserID = '${message.author.id}'`;
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
    .setTitle("Level Up!")
    .setColor("#6E0A51")
    .addField("Your current level", curlvl + 1);

    message.channel.send(lvlup).then(msg => {msg.delete(5000)});
    }
  }
  sql.prepare(sqlstr).run();

let about = sql.prepare(`SELECT * FROM about WHERE UserID = '${message.author.id}'`).get()



  if(!about){
    sqlstr = `INSERT INTO about (UserID, career, age, club, model, study, future, life, words) VALUES ('${message.author.id}', '#منصبي', '#عمري', '#نادي', '#قدوتي', '#تخصصي', '#طموحي', '#حكمتي', '#خاطري')`
     sql.prepare(sqlstr).run();
  }

  let score;
  let lvlscore;
  if (message.guild) {

   // if(!message.member.roles.find("name", "إدارة")) return;
    
    score = bot.getScore.get(message.author.id, message.guild.id);
    if (!score) {
      score = { user: message.author.id, guild: message.guild.id, voicexp: 0, textxp: 0,points: 1, voicpoints: 1, time: Date.now()}
    }
    let mes = message.content
    if(mes.length > 5){

    
     
    score.textxp = score.textxp + generateXp();
      
    }
    
    let curlvl = score.points;
    let nxtLvl = score.points * 1000;
    if(nxtLvl <= score.textxp){
     
      score.points++;
 let Image = Canvas.Image,
      canvas = new Canvas(100, 140),
      ctx = canvas.getContext('2d');
  ctx.patternQuality = 'bilinear';
  ctx.filter = 'bilinear';
  ctx.antialias = 'subpixel';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';    
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 2;
  ctx.stroke();
  ctx.beginPath();
          
  fs.readFile('./img/points.png', function (err, Background) {
      if (err) return console.log(err);
      let BG = Canvas.Image;
      let ground = new Image;
      ground.src = Background;
      ctx.drawImage(ground, 0, 0, 100, 140);

})
let url = message.author.displayAvatarURL.endsWith(".webp") ? message.author.displayAvatarURL.slice(5, -20) + ".png" : message.author.displayAvatarURL;
                jimp.read(url, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err);    
                        let Avatar = Canvas.Image;
                        let ava = new Avatar;
                        ava.src = buf;
                        ctx.beginPath();
                        ctx.arc(50, 40.8, 37, 0, Math.PI*2, true);
                        ctx.closePath();
                        ctx.clip();
                        ctx.drawImage(ava, 11, 2, 77, 77);
              
      message.channel.send(`🆙 | **${message.author.username}** Gains **1pt**`,{files: [canvas.toBuffer()]}).then(msg => {msg.delete(5000)});
                  })
  })
    }
                      if(score.points + score.voicpoints - 2 >= 15){
                        let prom = sql.prepare(`SELECT * FROM promote WHERE user = ${message.author.id} AND promote = '1'`).get()
                 if(!prom){
                    
                     let Image = Canvas.Image,
      canvas = new Canvas(1200, 500),
      ctx = canvas.getContext('2d');
  ctx.patternQuality = 'bilinear';
  ctx.filter = 'bilinear';
  ctx.antialias = 'subpixel';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';    
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 2;
  ctx.stroke();
  ctx.beginPath();
          
  fs.readFile('./img/promote.png', function (err, Background) {
      if (err) return console.log(err);
      let BG = Canvas.Image;
      let ground = new Image;
      ground.src = Background;
      ctx.drawImage(ground, 0, 0, 1200, 500);

})
let url = message.author.displayAvatarURL.endsWith(".webp") ? message.author.displayAvatarURL.slice(5, -20) + ".png" : message.author.displayAvatarURL;
                jimp.read(url, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err); 
                                                              ctx.font = '900 20px Impact';
                                                             
                                                              ctx.fillStyle = "#D2B48C";
                                                              ctx.textAlign = "center";
                                                              ctx.fillText(message.author.username, 940, 369);
                                                    ctx.font = '900 20px Impact';
                                                              
                                                              ctx.fillStyle = "#D2B48C";
                                                              ctx.textAlign = "center";
                                                              ctx.fillText(message.author.username, 275, 369);
                      
                                                                    ctx.font = '900 50px Impact';
                                                              ctx.fillStyle = "#FFFFFF";
                                                              ctx.textAlign = "center";
                                                              ctx.fillText(`.Elegant`, 650, 209);
                        let Avatar = Canvas.Image;
                        let ava = new Avatar;
                        ava.src = buf;
                                      ctx.drawImage(ava, 862, 159, 160, 160);
                                      ctx.drawImage(ava, 198, 159, 160, 160);

                                 //     pchannel.send(`🆙 | ${message.member.roles.find("name", "إدارة")} : New promotion to **${message.author.username}**`,{files: [canvas.toBuffer()]});
                      })
                  })
                        let promote = { user: message.author.id, guild: message.guild.id, promote: 1};
                        bot.setProm.run(promote)
                        }
                    
                      }
                      if(score.points + score.voicpoints - 2 >= 25){
                        let prom = sql.prepare(`SELECT * FROM promote WHERE user = ${message.author.id} AND promote = '2'`).get()
                        if(!prom){
                          
                                               let Image = Canvas.Image,
      canvas = new Canvas(1200, 500),
      ctx = canvas.getContext('2d');
  ctx.patternQuality = 'bilinear';
  ctx.filter = 'bilinear';
  ctx.antialias = 'subpixel';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';    
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 2;
  ctx.stroke();
  ctx.beginPath();
          
  fs.readFile('./img/promote.png', function (err, Background) {
      if (err) return console.log(err);
      let BG = Canvas.Image;
      let ground = new Image;
      ground.src = Background;
      ctx.drawImage(ground, 0, 0, 1200, 500);

})
let url = message.author.displayAvatarURL.endsWith(".webp") ? message.author.displayAvatarURL.slice(5, -20) + ".png" : message.author.displayAvatarURL;
                jimp.read(url, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err); 
                                                              ctx.font = '900 20px Impact';
                                                             
                                                              ctx.fillStyle = "#D2B48C";
                                                              ctx.textAlign = "center";
                                                              ctx.fillText(message.author.username, 940, 369);
                                                    ctx.font = '900 20px Impact';
                                                              
                                                              ctx.fillStyle = "#D2B48C";
                                                              ctx.textAlign = "center";
                                                              ctx.fillText(message.author.username, 275, 369);
                      
                                                                    ctx.font = '900 50px Impact';
                                                              ctx.fillStyle = "#FFFFFF";
                                                              ctx.textAlign = "center";
                                                              ctx.fillText(`.Highness`, 650, 209);
                        let Avatar = Canvas.Image;
                        let ava = new Avatar;
                        ava.src = buf;
                                      ctx.drawImage(ava, 862, 159, 160, 160);
                                      ctx.drawImage(ava, 198, 159, 160, 160);

                                  //    pchannel.send(`🆙 | ${message.member.roles.find("name", "إدارة")} : New promotion to **${message.author.username}**`,{files: [canvas.toBuffer()]});
                      })
                  })
                          
                        let promote = { user: message.author.id, guild: message.guild.id, promote: 2};
                        bot.setProm.run(promote)
                        }
                      }
                      if(score.points + score.voicpoints - 2 >= 35){
                        let prom = sql.prepare(`SELECT * FROM promote WHERE user = ${message.author.id} AND promote = '3'`).get()
                        if(!prom){
                          
                                               let Image = Canvas.Image,
      canvas = new Canvas(1200, 500),
      ctx = canvas.getContext('2d');
  ctx.patternQuality = 'bilinear';
  ctx.filter = 'bilinear';
  ctx.antialias = 'subpixel';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';    
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 2;
  ctx.stroke();
  ctx.beginPath();
          
  fs.readFile('./img/promote.png', function (err, Background) {
      if (err) return console.log(err);
      let BG = Canvas.Image;
      let ground = new Image;
      ground.src = Background;
      ctx.drawImage(ground, 0, 0, 1200, 500);

})
let url = message.author.displayAvatarURL.endsWith(".webp") ? message.author.displayAvatarURL.slice(5, -20) + ".png" : message.author.displayAvatarURL;
                jimp.read(url, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err); 
                                                              ctx.font = '900 20px Impact';
                                                             
                                                              ctx.fillStyle = "#D2B48C";
                                                              ctx.textAlign = "center";
                                                              ctx.fillText(message.author.username, 940, 369);
                                                    ctx.font = '900 20px Impact';
                                                              
                                                              ctx.fillStyle = "#D2B48C";
                                                              ctx.textAlign = "center";
                                                              ctx.fillText(message.author.username, 275, 369);
                      
                                                                    ctx.font = '900 50px Impact';
                                                              ctx.fillStyle = "#FFFFFF";
                                                              ctx.textAlign = "center";
                                                              ctx.fillText(`.Holder`, 650, 209);
                        let Avatar = Canvas.Image;
                        let ava = new Avatar;
                        ava.src = buf;
                                      ctx.drawImage(ava, 862, 159, 160, 160);
                                      ctx.drawImage(ava, 198, 159, 160, 160);

                                 //     pchannel.send(`🆙 | ${message.member.roles.find("name", "إدارة")} : New promotion to **${message.author.username}**`,{files: [canvas.toBuffer()]});
                      })
                  })
                          
                        let promote = { user: message.author.id, guild: message.guild.id, promote: 3};
                        bot.setProm.run(promote)
                        }
                      }
                      if(score.points + score.voicpoints - 2 >= 50){
                        let prom = sql.prepare(`SELECT * FROM promote WHERE user = ${message.author.id} AND promote = '4'`).get()
                        if(!prom){
                          
                                               let Image = Canvas.Image,
      canvas = new Canvas(1200, 500),
      ctx = canvas.getContext('2d');
  ctx.patternQuality = 'bilinear';
  ctx.filter = 'bilinear';
  ctx.antialias = 'subpixel';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';    
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 2;
  ctx.stroke();
  ctx.beginPath();
          
  fs.readFile('./img/promote.png', function (err, Background) {
      if (err) return console.log(err);
      let BG = Canvas.Image;
      let ground = new Image;
      ground.src = Background;
      ctx.drawImage(ground, 0, 0, 1200, 500);

})
let url = message.author.displayAvatarURL.endsWith(".webp") ? message.author.displayAvatarURL.slice(5, -20) + ".png" : message.author.displayAvatarURL;
                jimp.read(url, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err); 
                                                              ctx.font = '900 20px Impact';
                                                             
                                                              ctx.fillStyle = "#D2B48C";
                                                              ctx.textAlign = "center";
                                                              ctx.fillText(message.author.username, 940, 369);
                                                    ctx.font = '900 20px Impact';
                                                              
                                                              ctx.fillStyle = "#D2B48C";
                                                              ctx.textAlign = "center";
                                                              ctx.fillText(message.author.username, 275, 369);
                      
                                                                    ctx.font = '900 50px Impact';
                                                              ctx.fillStyle = "#FFFFFF";
                                                              ctx.textAlign = "center";
                                                              ctx.fillText(`.Founder`, 650, 209);
                        let Avatar = Canvas.Image;
                        let ava = new Avatar;
                        ava.src = buf;
                                      ctx.drawImage(ava, 862, 159, 160, 160);
                                      ctx.drawImage(ava, 198, 159, 160, 160);

                                //      pchannel.send(`🆙 | ${message.member.roles.find("name", "إدارة")} : New promotion to **${message.author.username}**`,{files: [canvas.toBuffer()]});
                      })
                  })
                          
                        let promote = { user: message.author.id, guild: message.guild.id, promote: 4};
                        bot.setProm.run(promote)
                        }
                      }
    
    
    bot.setScore.run(score);
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
////////////////////////////[  LOG  ]/////////////////////////////////////
bot.login(process.env.BOT_TOKEN);
