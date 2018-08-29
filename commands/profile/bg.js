const {Discord, MessageAttachment} = require("discord.js");
var jimp = require("jimp");
var Canvas = require('canvas')
const fs = require('fs');
var path = require('path');
let filenum = 0
let z = 0;
let prof
module.exports.run = async (bot, message, args, sql) => {

let jsfile;

  fs.readdirSync('./img/bg/').forEach(file => {
 filenum=filenum+1
})
  //console.log(filenum)

  let Image = Canvas.Image,
  canvas = new Canvas(600, 800),
  ctx = canvas.getContext('2d');
  ctx.patternQuality = 'bilinear';
      ctx.filter = 'bilinear';
      ctx.antialias = 'subpixel';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 2;
  
fs.readFile("./img/colors.jpg",async function (err, buf) {

                       let ava = new Image;
                        ava.src = buf;
                        ctx.drawImage(ava, 0, 0, 600, 800); 
 for(let i=0;i<filenum;i++){
jimp.read('./img/bg/1.jpg', (err, ground) => {
                    if (err) return console.log(err);
                    ground.getBuffer(jimp.MIME_PNG, (err, Background) => {
    let ground = new Image;
    ground.src = Background;
    ctx.drawImage(ground, 25, 120, 50, 50);
if(i = 13){
  return message.channel.send({files: [canvas.toBuffer()]});
}

})

})
  }
    })
   


      

   
      
  
        }
module.exports.help = {
  name:"خلفيات"
}
