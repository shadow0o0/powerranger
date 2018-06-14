
const Discord = require("discord.js");
var Canvas = require('canvas')
var jimp = require('jimp')
const fs = require("fs");
const talkedRecently = new Set();
let dd
module.exports.run = async (bot, message, args, sql) => {
  if (message.mentions.users.size < 1) {
 let timeoute = new Discord.RichEmbed()
    .setColor("#C2C2C2")
    .setTitle(`Wait __${((dd+20000) - Date.now())/1000}__ Seconds`);
    if (talkedRecently.has(message.author.id)) {
        
        message.channel.send(timeoute).then(msg => {msg.delete(5000)});
} else {
  
  dd = Date.now()
  let userscore = bot.getScore.get(message.author.id, message.guild.id);
  if(!userscore){
   userscore = { user: message.author.id, guild: message.guild.id, voicexp: 0, textxp: 0,points: 1, voicpoints: 1, time: Date.now()}
  }
  let user = userscore.points;
  let target = message.author;

    if(!userscore) return message.reply("حاول مرة أخرى").then(msg => {msg.delete(5000)});
  
let rankedtext = sql.prepare(`SELECT * FROM (SELECT a1.user, a1.textxp , COUNT (a2.textxp) rank 
    FROM scores a1, scores a2 
    WHERE a1.textxp < a2.textxp OR (a1.textxp=a2.textxp AND a1.user = a2.user) 
    GROUP BY a1.user, a1.textxp 
    ORDER BY a1.textxp DESC, a1.user DESC) WHERE user = '${message.author.id}'`).get()

let rankedvoice = sql.prepare(`SELECT * FROM (SELECT a1.user, a1.voicexp , COUNT (a2.voicexp) rank 
    FROM scores a1, scores a2 
    WHERE a1.voicexp < a2.voicexp OR (a1.voicexp=a2.voicexp AND a1.user = a2.user) 
    GROUP BY a1.user, a1.voicexp 
    ORDER BY a1.voicexp DESC, a1.user DESC) WHERE user = '${message.author.id}'`).get()
    let member = message.guild.member(target);
let roles = member.roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map(role => role.name);
    if (roles.length < 1) roles = ['None'];

  let curtxtxp = userscore.textxp;
  let curvoicexp = userscore.voicexp;
  let curlvl = userscore.points;
  let curvoicelvl = userscore.voicpoints;
  let nxtLvlXp = curlvl * 1000;
  let difference = nxtLvlXp - curtxtxp;
  const w = ['./img/bg/bg.png'];

  let Image = Canvas.Image,
  canvas = new Canvas(400, 200),
  ctx = canvas.getContext('2d');
ctx.patternQuality = 'bilinear';
ctx.filter = 'bilinear';
ctx.antialias = 'subpixel';
ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';    
ctx.shadowOffsetY = 2;
ctx.shadowBlur = 2;
ctx.stroke();
ctx.beginPath();
      
fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
  if (err) return console.log(err);
  let BG = Canvas.Image;
  let ground = new Image;
  ground.src = Background;
  ctx.drawImage(ground, 0, 0, 400, 200);

})
  jimp.read('./img/id.png',async function (err, ava) {
    if (err) return console.log(err);
    ava.getBuffer(jimp.MIME_PNG,async function (err, buffprof) {
        if (err) return console.log(err);

        let prof = new Image;
        prof.src = buffprof;
        await ctx.drawImage(prof, 0, 0, 400, 200);

      let url = message.author.displayAvatarURL.endsWith(".webp") ? message.author.displayAvatarURL.slice(5, -20) + ".png" : message.author.displayAvatarURL;
      jimp.read(url, (err, ava) => {
          if (err) return console.log(err);
          ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
              if (err) return console.log(err);    
                                                              //wl
                                                              
                                                              
                                                              //ur name
                                                              ctx.font = '20px Impact';
                                                              ctx.fontSize = '20px';
                                                              ctx.fillStyle = "#D2B48C";
                                                              ctx.textAlign = "left";
                                                              ctx.fillText(message.author.username, 160, 80);
                                                              ctx.font = '12px Aeland';
                                                              ctx.fontSize = '12px';
                                                              ctx.fillStyle = "#FFFFFF";
                                                              ctx.textAlign = "left";
                                                              ctx.fillText(`Text xp : `+curtxtxp, 160, 125);
                                                              ctx.font = '12px Aeland';
                                                              ctx.fontSize = '12px';
                                                              ctx.fillStyle = "#FFFFFF";
                                                              ctx.textAlign = "left";
                                                              ctx.fillText(`Voice xp : `+curvoicexp, 160, 175);
                                                              ctx.font = '900 12px Aeland';
                                                              ctx.fontSize = '12px';
                                                              ctx.fillStyle = "#FFFFFF";
                                                              ctx.textAlign = "left";
                                                              ctx.fillText(`Text rank : #${rankedtext.rank}`, 160, 109);
                                                              ctx.font = '900 12px Aeland';
                                                              ctx.fontSize = '12px';
                                                              ctx.fillStyle = "#FFFFFF";
                                                              ctx.textAlign = "left";
                                                              ctx.fillText(`Voice rank : #${rankedvoice.rank}`, 160, 159);
                                                              ctx.font = '12px Aeland';
                                                              ctx.fontSize = '12px';
                                                              ctx.fillStyle = "#FFFFFF";
                                                              ctx.textAlign = "left";
                                                              ctx.fillText(`LEVEL\n ${curlvl}`, 288, 106);
                                                              ctx.font = '12px Aeland';
                                                              ctx.fontSize = '12px';
                                                              ctx.fillStyle = "#FFFFFF";
                                                              ctx.textAlign = "left";
                                                              ctx.fillText(`LEVEL\n ${curvoicelvl}`, 288, 157);
                                                              ctx.font = '12px Aeland';
                                                              ctx.fontSize = '12px';
                                                              ctx.fillStyle = "#FFFFFF";
                                                              ctx.textAlign = "right";
            if(message.guild.members.get(message.author.id).roles.find("name", "إدارة")){
                                                              ctx.fillText(`مجموع النقاط : `+(userscore.voicpoints+userscore.points - 2), 385, 20);
            }
                                                              ctx.font = '12px Aeland';
                                                              ctx.fontSize = '12px';
                                                              ctx.fillStyle = "#FFFFFF";
                                                              ctx.textAlign = "right";
            if(message.guild.members.get(message.author.id).roles.find("name", "إدارة")){
                                                              ctx.fillText(`رتبتك الإدارية : `+(roles[0]), 385, 45);
             }
                                                              //Avatar
                                                              let Avatar = Canvas.Image;
                                                              let ava = new Avatar;
                                                              ava.src = buf;
                                                              ctx.beginPath();
                                                              ctx.arc(85, 135, 43, 0, Math.PI*2, true);
                                                              ctx.closePath();
                                                              ctx.clip();
                                                              ctx.drawImage(ava, 41, 91, 91, 91);
  message.channel.send({files: [canvas.toBuffer()]});
})
})
      })
})
  talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 20000);
}
  }else{
    let timeoute = new Discord.RichEmbed()
    .setColor("#C2C2C2")
    .setTitle(`Wait __${((dd+20000) - Date.now())/1000}__ Seconds`);
    if (talkedRecently.has(message.author.id)) {
        
        message.channel.send(timeoute).then(msg => {msg.delete(5000)});
} else {
  let target = message.mentions.users.first();
  let member = message.guild.member(target);
let roles = member.roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map(role => role.name);
    if (roles.length < 1) roles = ['None'];
  dd = Date.now()
  let userscore = bot.getScore.get(member.user.id, message.guild.id);
  if(!userscore){
  return message.channel.send("`غير مسجل بعد`")
  }

    if(!userscore) return message.reply("حاول مرة أخرى").then(msg => {msg.delete(5000)});
  
let rankedtext = sql.prepare(`SELECT * FROM (SELECT a1.user, a1.textxp , COUNT (a2.textxp) rank 
    FROM scores a1, scores a2 
    WHERE a1.textxp < a2.textxp OR (a1.textxp=a2.textxp AND a1.user = a2.user) 
    GROUP BY a1.user, a1.textxp 
    ORDER BY a1.textxp DESC, a1.user DESC) WHERE user = '${member.user.id}'`).get()
if(!rankedtext){
   return message.channel.send("`غير مسجل بعد`")
  }
let rankedvoice = sql.prepare(`SELECT * FROM (SELECT a1.user, a1.voicexp , COUNT (a2.voicexp) rank 
    FROM scores a1, scores a2 
    WHERE a1.voicexp < a2.voicexp OR (a1.voicexp=a2.voicexp AND a1.user = a2.user) 
    GROUP BY a1.user, a1.voicexp 
    ORDER BY a1.voicexp DESC, a1.user DESC) WHERE user = '${member.user.id}'`).get()
    if(!rankedvoice){
 return  message.channel.send("`غير مسجل بعد`")
  }

  let curtxtxp = userscore.textxp;
  let curvoicexp = userscore.voicexp;
  let curlvl = userscore.points;
  let curvoicelvl = userscore.voicpoints;
  let nxtLvlXp = curlvl * 1000;
  let difference = nxtLvlXp - curtxtxp;
  const w = ['./img/bg/bg.png'];

  let Image = Canvas.Image,
  canvas = new Canvas(400, 200),
  ctx = canvas.getContext('2d');
ctx.patternQuality = 'bilinear';
ctx.filter = 'bilinear';
ctx.antialias = 'subpixel';
ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';    
ctx.shadowOffsetY = 2;
ctx.shadowBlur = 2;
ctx.stroke();
ctx.beginPath();
      
fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
  if (err) return console.log(err);
  let BG = Canvas.Image;
  let ground = new Image;
  ground.src = Background;
  ctx.drawImage(ground, 0, 0, 400, 200);

})
  jimp.read('./img/id.png',async function (err, ava) {
    if (err) return console.log(err);
    ava.getBuffer(jimp.MIME_PNG,async function (err, buffprof) {
        if (err) return console.log(err);

        let prof = new Image;
        prof.src = buffprof;
        await ctx.drawImage(prof, 0, 0, 400, 200);

      let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(5, -20) + ".png" : member.user.displayAvatarURL;
      jimp.read(url, (err, ava) => {
          if (err) return console.log(err);
          ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
              if (err) return console.log(err);    
                                                              //wl
                                                              
                                                              
                                                              //ur name
                                                              ctx.font = '20px Impact';
                                                              ctx.fontSize = '20px';
                                                              ctx.fillStyle = "#D2B48C";
                                                              ctx.textAlign = "left";
                                                              ctx.fillText(member.user.username, 160, 80);
                                                              ctx.font = '12px Aeland';
                                                              ctx.fontSize = '12px';
                                                              ctx.fillStyle = "#FFFFFF";
                                                              ctx.textAlign = "left";
                                                              ctx.fillText(`Text xp : `+curtxtxp, 160, 125);
                                                              ctx.font = '12px Aeland';
                                                              ctx.fontSize = '12px';
                                                              ctx.fillStyle = "#FFFFFF";
                                                              ctx.textAlign = "left";
                                                              ctx.fillText(`Voice xp : `+curvoicexp, 160, 175);
                                                              ctx.font = '900 12px Aeland';
                                                              ctx.fontSize = '12px';
                                                              ctx.fillStyle = "#FFFFFF";
                                                              ctx.textAlign = "left";
                                                              ctx.fillText(`Text rank : #${rankedtext.rank}`, 160, 109);
                                                              ctx.font = '900 12px Aeland';
                                                              ctx.fontSize = '12px';
                                                              ctx.fillStyle = "#FFFFFF";
                                                              ctx.textAlign = "left";
                                                              ctx.fillText(`Voice rank : #${rankedvoice.rank}`, 160, 159);
                                                              ctx.font = '12px Aeland';
                                                              ctx.fontSize = '12px';
                                                              ctx.fillStyle = "#FFFFFF";
                                                              ctx.textAlign = "left";
                                                              ctx.fillText(`LEVEL\n ${curlvl}`, 288, 106);
                                                              ctx.font = '12px Aeland';
                                                              ctx.fontSize = '12px';
                                                              ctx.fillStyle = "#FFFFFF";
                                                              ctx.textAlign = "left";
                                                              ctx.fillText(`LEVEL\n ${curvoicelvl}`, 288, 157);
                                                              ctx.font = '12px Aeland';
                                                              ctx.fontSize = '12px';
                                                              ctx.fillStyle = "#FFFFFF";
                                                              ctx.textAlign = "right";
            if(message.guild.members.get(member.user.id).roles.find("name", "إدارة")){
                                                              ctx.fillText(`مجموع النقاط : `+(userscore.voicpoints+userscore.points - 2), 385, 20);
            }
                                                              ctx.font = '12px Aeland';
                                                              ctx.fontSize = '12px';
                                                              ctx.fillStyle = "#FFFFFF";
                                                              ctx.textAlign = "right";
            if(message.guild.members.get(member.user.id).roles.find("name", "إدارة")){
                                                              ctx.fillText(`رتبتك الحالية : `+(roles[0]), 385, 45);
            }
                                                              //Avatar
                                                              let Avatar = Canvas.Image;
                                                              let ava = new Avatar;
                                                              ava.src = buf;
                                                              ctx.beginPath();
                                                              ctx.arc(85, 135, 43, 0, Math.PI*2, true);
                                                              ctx.closePath();
                                                              ctx.clip();
                                                              ctx.drawImage(ava, 41, 91, 91, 91);
  message.channel.send({files: [canvas.toBuffer()]});
})
})
      })
})
  talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 20000);
    
  }
    }
}

module.exports.help = {
  name:"#id"
}
