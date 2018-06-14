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

 jimp.read("./img/colors.jpg", (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err);

                       let ava = new Image;
                        ava.src = buf;
                        ctx.drawImage(ava, 0, 0, 600, 800); 

   
  
  for(let i=0;i<filenum;i++){


    fs.readFile(path.join(__dirname, '../profile/img/bg') + `/${i+1}.jpg`,async function (err, Background) {
    if (err) return console.log(err);
    let ground = new Image;
    ground.src = Background;
    ctx.drawImage(ground, 0, 0, 50, 50);

})


   }
    
     return  message.channel.send({files: [canvas.toBuffer()]});
});
      
});
   
      
  
        }
module.exports.help = {
  name:"خلفيات"
}
