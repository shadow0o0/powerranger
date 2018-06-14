const Discord = require("discord.js");

    module.exports.run = async (client, msg, args) => {
        msg.delete(10000)
        if (!msg.guild.member(client.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return msg.reply(":no_entry_sign: **Error:** I don't have the **Manage Roles** permission!");
        if (!msg.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return msg.reply("روح العب بعيد !");
        if (msg.mentions.users.size === 0) return msg.reply(":no_entry_sign: الرجاء تحديد المستخدم.");
        let member = msg.guild.member(msg.mentions.users.first());
        if (!member) return msg.reply(":no_entry_sign: **خطأ:** يبدو أن إسم المستخدم غير صحيح.");
        let name = msg.content.split(" ").splice(2).join(" ");
        let role = msg.guild.roles.find("name", name);
        member.removeRole(role).catch(e => {
            msg.channel.send(":no_entry_sign: There was an error! It most likely is that the role you are trying to add is higher than the the role I have!");
        });
      let addEmbed = new Discord.RichEmbed()
    .setAuthor(msg.author.username, msg.author.displayAvatarURL)
    .setColor("#C2C2C2")
    .addField("[لقد أزلت رول]", `**${name}**`, true)
    // .addField("[من قبل]", `${message.author}`, true)
    .addField("[من]", `<@${msg.mentions.users.first().id}>`, true)
        msg.channel.send(addEmbed).then(msg => {msg.delete(10000)});
    }
    
    exports.conf = {
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: 3
    };
    
    module.exports.help = {
      name: 'remove',
      description: 'Adds a role. It\'s that simple.',
      usage: 'addrole'
    };
 

