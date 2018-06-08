const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});

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
  console.log(`bot is online`);
  
});

bot.on('voiceStateUpdate',async (oldMember, newMember) => {
    let guild = bot.guilds.get("420638696258404362");
let newUserChannel = newMember.voiceChannel
let oldUserChannel = oldMember.voiceChannel

if(oldUserChannel === undefined && newUserChannel !== undefined) {
    if(newMember.voiceChannel.id === '454561357497499661'){

      await guild.createChannel(`${newMember.user.username}`,'voice').then(async (m)  => await m.overwritePermissions(newMember.user, {MANAGE_CHANNELS: true})).then(async (m)  => await m.setParent('454474664681537538')).then( async (m)  => await guild.members.get(newMember.user.id).setVoiceChannel(m))
      guild.channels.find("id",`454561357497499661`).overwritePermissions(oldMember.user, {CONNECT: false})
    }

} else if(newUserChannel === undefined){

if(oldMember.voiceChannel.name === newMember.user.username){
  
  if(oldMember.voiceChannel.parentID === '454474664681537538'){
     bot.setTimeout(() =>{
         oldMember.voiceChannel.delete()
    }, 3000)
  }
        guild.channels.find("id",`454561357497499661`).overwritePermissions(oldMember.user, {CONNECT: true})
}
}else if(oldMember.voiceChannel.name === newMember.user.username){
  
  if(oldMember.voiceChannel.parentID === '454474664681537538'){
    bot.setTimeout(() =>{
         oldMember.voiceChannel.delete()
    }, 3000)
  }
        guild.channels.find("id",`454561357497499661`).overwritePermissions(oldMember.user, {CONNECT: true})
        }
  else if(newUserChannel.id === '454561357497499661'){
   await guild.createChannel(`${newMember.user.username}`,'voice').then(async (m)  => await m.overwritePermissions(newMember.user, {MANAGE_CHANNELS: true})).then(async (m)  => await m.setParent('454474664681537538')).then( async (m)  => await guild.members.get(newMember.user.id).setVoiceChannel(m))
    guild.channels.find("id",`454561357497499661`).overwritePermissions(oldMember.user, {CONNECT: false})
  }
})


bot.on('channelUpdate', async  (oldChannel, newChannel) => {
  let guild = bot.guilds.get("420638696258404362");
       const entry = await guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'}).then(audit => audit.entries.first())
       let user = ""

    user = entry.executor
    if(oldChannel || newChannel === '454474664681537538'){
      if(newChannel.name !== oldChannel.name)
      newChannel.setName(user.username)

    }

})

bot.on("message", async message => {
if (message.author.bot) return;
if (message.channel.type ==="dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");

  if (!message.content.startsWith(prefix)) return;
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);


});


bot.login(process.env.BOT_TOKEN);
