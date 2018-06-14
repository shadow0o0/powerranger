const Discord = require("discord.js");
let role =[]
let myRole 
module.exports.run = async (bot, message, args) => {

    if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return;

  var roles = message.guild.roles.map(role => role.id);
    if(roles){
        for(let i=0;i<roles.length;i++){
         myRole = message.guild.roles.get(roles[i])
        if(myRole.name.startsWith("#")){
          role.push(myRole.id)
        }
        }
           
    }
if(role){
  for(let i=0;i<role.length;i++){
    myRole = message.guild.roles.get(role[i])
    myRole.delete()
    
  }
  {
  await message.channel.send(`**Deleting **`+"`"+role.length+"`"+`** Color.**`)
  
  }
}

}
    
module.exports.help = {
  name:"#dc"
}
