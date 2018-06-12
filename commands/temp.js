
const Discord = require("discord.js");
let gameon = false;
module.exports.run = async (bot, message, args,sql) => {
let vchannel
let vcat
let guildid
    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return;
  if(gameon === false){
    gameon = true
  }else{
   gameon = false 
  }

    let rows = sql.prepare(`SELECT * FROM guilds WHERE guildID = '${message.guild.id}'`).get()
    if (!rows){
    return message.channel.send("Please set main category and temprary channel names first: `#setcat` , `#setchannel`")
    }else{
        vchannel = rows.chname
      let channel = message.guild.channels.find("name", vchannel)
      if(!channel)return message.channel.send("Please set a temprary voice channel with `#setchannel`")
        vcat = rows.catname
      let category = message.guild.channels.find("name", vcat)
      if(!category)return message.channel.send("Please set a temprary voice channel category with `#setcat`")
      guildid = rows.guildID
    }

    bot.on('voiceStateUpdate',async (oldMember, newMember) => {

        let guild = bot.guilds.get(guildid)
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel
    let channel = guild.channels.find("name", vchannel)
    let category =guild.channels.find("name", vcat)
    if(oldUserChannel === undefined && newUserChannel !== undefined) {
    
        if(newMember.voiceChannel.id === channel.id){
    
          await guild.createChannel(`${newMember.user.username}`,'voice').then(async (m)  => await m.overwritePermissions(newMember.user, {MANAGE_CHANNELS: true})).then(async (m)  => await m.setParent(category.id)).then( async (m)  => await guild.members.get(newMember.user.id).setVoiceChannel(m))
          guild.channels.find("id",channel.id).overwritePermissions(oldMember.user, {CONNECT: false})
        }
    
    }
    else if(newUserChannel === undefined){
      
      if(oldMember.voiceChannel.parentID === category.id && oldMember.voiceChannel.id !== channel.id && oldMember.voiceChannel.name === newMember.user.username){
        bot.setTimeout(() =>{
             oldMember.voiceChannel.delete()
             guild.channels.find("id",channel.id).overwritePermissions(oldMember.user,{CONNECT: null})
        }, 3000)
      }
            
            }else if(oldMember.voiceChannel.name !== newMember.voiceChannel.name){
              if(newMember.voiceChannel.id === channel.id){
    
       await guild.createChannel(`${newMember.user.username}`,'voice').then(async (m)  => await m.overwritePermissions(newMember.user, {MANAGE_CHANNELS: true})).then(async (m)  => await m.setParent(category.id)).then( async (m)  => await guild.members.get(newMember.user.id).setVoiceChannel(m))
        guild.channels.find("id",channel.id).overwritePermissions(oldMember.user, {CONNECT: false})
      }else if(oldMember.voiceChannel.parentID === category.id && oldMember.voiceChannel.id !== channel.id && oldMember.voiceChannel.name === newMember.user.username){
        bot.setTimeout(() =>{
             oldMember.voiceChannel.delete()
             guild.channels.find("id",channel.id).overwritePermissions(oldMember.user,{CONNECT: null})
        }, 3000)
      }
            }     
    })
    
    
    bot.on('channelUpdate', async  (oldChannel, newChannel) => {
      let guild = bot.guilds.get(guildid)
      let channel = guild.channels.find("name", vchannel)
      let category =guild.channels.find("name", vcat)
      if(newChannel.name !== oldChannel.name){
    
        if(oldChannel.parentID === category.id || newChannel.parentID === category.id){
              const entry = await guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'}).then(audit => audit.entries.first() )
          let user = ""
    
        user = entry.executor
        if(user.bot)return;
         return newChannel.setName(oldChannel.name)
    
        }
    }
    })
  if(gameon === true){
    
    message.channel.send("Temprary channel is on");
  }else{
   await message.channel.send("Temprary channel is off");
    process.exit(1);
  }
}

module.exports.help = {
  name:"#temp"
}
