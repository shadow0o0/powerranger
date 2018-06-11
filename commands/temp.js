
const Discord = require("discord.js");

module.exports.run = async (bot, message, args,sql) => {


    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return;
    let rows = sql.prepare(`SELECT * FROM guilds WHERE guildID = '${message.author.guild.id}'`).get()
    if (!rows){
    return message.channel.send("Please set main category and temprary channel names first: `#setcat` , `#setchannel`")
    }else{
        let vchannel = rows.chname
        let vcat = rows.catname
    }
    
    bot.on('voiceStateUpdate',async (oldMember, newMember) => {
        let guild = message.author.guild;
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel
    let channel = guild.channels.find("name", vchannel)
    let category =guild.channels.find("name", vcat)
    if(oldUserChannel === undefined && newUserChannel !== undefined) {
    
        if(newMember.voiceChannel.id === channel.id){
    
          await guild.createChannel(`${newMember.user.username}`,'voice').then(async (m)  => await m.overwritePermissions(newMember.user, {MANAGE_CHANNELS: true})).then(async (m)  => await m.setParent(category.id)).then( async (m)  => await guild.members.get(newMember.user.id).setVoiceChannel(m))
          guild.channels.find("id",channel.id).overwritePermissions(oldMember.user, {CONNECT: false})
        }
    
    }if(newUserChannel === undefined){
    
    if(oldMember.voiceChannel.name === newMember.user.username){
      
      if(oldMember.voiceChannel.parentID === category.id){
         bot.setTimeout(() =>{
             oldMember.voiceChannel.delete()
             guild.channels.find("id",channel.id).overwritePermissions(oldMember.user).delete()
        }, 3000)
      }
            
    }
    }if(oldMember.voiceChannel.name !== newMember.voiceChannel.name){
      
      if(oldMember.voiceChannel.parentID === category.id && oldMember.voiceChannel.id !== channel.id && oldMember.voiceChannel.name === newMember.user.username){
        bot.setTimeout(() =>{
             oldMember.voiceChannel.delete()
             guild.channels.find("id",channel.id).overwritePermissions(oldMember.user).delete()
        }, 3000)
      }
            
            }
      if(newMember.voiceChannel.id === channel.id){
    
       await guild.createChannel(`${newMember.user.username}`,'voice').then(async (m)  => await m.overwritePermissions(newMember.user, {MANAGE_CHANNELS: true})).then(async (m)  => await m.setParent(category.id)).then( async (m)  => await guild.members.get(newMember.user.id).setVoiceChannel(m))
        guild.channels.find("id",channel.id).overwritePermissions(oldMember.user, {CONNECT: false})
      }
    })
    
    
    bot.on('channelUpdate', async  (oldChannel, newChannel) => {
      let guild = message.author.guild;
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
    message.channel.send("Temprary channel is on");
}

module.exports.help = {
  name:"temp"
}
