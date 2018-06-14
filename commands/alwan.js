const {Discord, MessageAttachment} = require("discord.js");
var Jimp = require("jimp");
var Canvas = require('canvas')
const fs = require('fs');

module.exports.run = async (bot, message, args, sql) => {
let role =[]
let myRole 
    var roles = message.guild.roles.map(role => role.id);
    if(roles){
        for(let i=0;i<roles.length;i++){
         myRole = message.guild.roles.get(roles[i])
          
        if(myRole.name.startsWith("#")){
          role.push(myRole.id)
        }
        }
      role.sort(function(a, b){return a - b})  
     // role = role.sort((a, b) => a - b);
    }
if(role){
  for(let i=0;i<role.length;i++){
    myRole = message.guild.roles.get(role[i])
    
  }
}
  let x = 25;
  let y = 120;
  let tx = 50
  let ty = 150;
  let ten = 10
  
  let Image = Canvas.Image,
  canvas = new Canvas(600, 800),
  ctx = canvas.getContext('2d');
fs.readFile("./img/colors.jpg", function (err, Background) {
  if (err) return console.log(err);
  let ground = new Image;
  ground.src = Background;
  ctx.drawImage(ground, 0, 0, 600, 800);
      ctx.patternQuality = 'bilinear';
      ctx.filter = 'bilinear';
      ctx.antialias = 'subpixel';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 2;
  
                        
if(role){
  for(let i=0;i<role.length;i++){
    myRole = message.guild.roles.get(role[i])
    if(i>=ten ){
      y=y+55
      ty=ty+55
x = 25;
ten = ten+10
tx = 50

    }

   ctx.fillStyle=myRole.hexColor
  ctx.fillRect(x , y , 50 , 50);

    ctx.font = '20px Arial';
    ctx.fontSize = '20px';
    ctx.textAlign = "center";
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${myRole.name.slice(1)}`, tx, ty);
    
tx=tx+55    
x=x+55
  }
}


       return message.channel.send({files: [canvas.toBuffer()]});
});

        }
module.exports.help = {
  name:"الوان"
}
