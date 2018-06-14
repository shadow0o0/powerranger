const Discord = require("discord.js");

    module.exports.run = async (client, msg, args) => {
        msg.delete(10000)
        if (!msg.guild.member(client.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return msg.reply(":no_entry_sign: **Error:** I don't have the **Manage Roles** permission!");
        if (!msg.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return msg.reply("روح العب بعيد!!");
        if (msg.mentions.users.size === 0) return msg.reply("الرجاء تحديد المستخدم.\nمثال: `#role @user#123 Members`").then(msg => {msg.delete(10000)});
        let member = msg.guild.member(msg.mentions.users.first());
        if (!member) return msg.reply(":no_entry_sign: **خطأ:** يبدو ان اسم المستخدم غير صحيح.").then(msg => {msg.delete(10000)});
        let name = msg.content.split(" ").splice(2).join(" ");
        let role = msg.guild.roles.find("name", name);
        if (!role) return msg.reply(`:no_entry_sign: **خطأ:** ${name} هذا الرول غير موجود!`);
        let botRolePosition = msg.guild.member(client.user).highestRole.position;
        let rolePosition = role.position;
        if (botRolePosition <= rolePosition) return msg.channel.send(":no_entry_sign: **خطأ:** Failed to add the role to the user because my highest role is lower than the specified role.");
        member.addRole(role).catch(e => {
            return msg.channel.send(`:no_entry_sign: **Error:**\n${e}`);
        });
        let addEmbed = new Discord.RichEmbed()
    .setAuthor(msg.author.username, msg.author.displayAvatarURL)
    .setColor("#C2C2C2")
    .addField("[لقد أضفت رول]", `**${name}**`, true)
    // .addField("[من قبل]", `${message.author}`, true)
    .addField("[إلى]", `<@${msg.mentions.users.first().id}>`, true)
        msg.channel.send(addEmbed).then(msg => {msg.delete(10000)});
    }
    
    exports.conf = {
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: 3
    };
    
    module.exports.help = {
      name: 'role',
      description: 'Adds a role. It\'s that simple.',
      usage: 'addrole'
    };
 

