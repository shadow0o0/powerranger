exports.run = async (bot, message, args) => {
    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES"))return;
  //if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return;
  const user = (message.mentions.users.first() || bot.users.get(args[0]) || null);
  let amount = !!user ? parseInt(message.content.split(" ")[2], 10) : parseInt(message.content.split(" ")[1], 10);
  //if (!amount) return message.channel.send("Must specify an amount to delete!").then(message.delete(2000));
 // if (!amount && !user) message.channel.send("Must specify a user and amount, or just an amount, of messages to purge!").then(message.delete(2000));
  let meesagedeleted ;
  await message.delete();
  if (!amount){
    amount= 100
    }
  let messages = await message.channel.fetchMessages({limit: amount});
  if(user) {
    messages = messages.array().filter(m=>m.author.id === user.id);
    message.channel.send(`**${messages.length}** Deleted message for **${user.username}** .`).then(msg => {msg.delete(3000)});

  } else {
      messages = messages.array();
    message.channel.send(`**${messages.length}** Deleted message .`).then(msg => {msg.delete(3000)});
  }
  message.channel.bulkDelete(messages)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'امسح',
  description: 'Deletes messages from anyone in the channel (requires Manage Messages)',
  usage: 'purge [number of messages]'
};