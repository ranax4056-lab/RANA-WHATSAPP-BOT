const os = require('os');

module.exports = {
  config: {
    name: 'info',
    aliases: ['about', 'admininfo', 'serverinfo'],
    permission: 0,
    prefix: 'both',
    categorie: 'Utilities',
    credit: 'Shahin Rana',
    usages: [`${global.config.PREFIX}info - Show admin and server information.`],
  },

  start: async ({ event, api, message }) => {

    try {

      const uptimeSeconds = process.uptime();

      const uptime = new Date(uptimeSeconds * 1000)
        .toISOString()
        .substr(11, 8);

      const infoMessage = `
╔═══❖•ೋ°°ೋ•❖═══╗
🫣 *𝐗-𝐒ʜꫝʜɪɴ 𝐑ᴀɴꫝ*
╚═══❖•ೋ°°ೋ•❖═══╝

🌸 *𝐍ᴀᴍᴇ:* 𝐒ʜᴀʜɪɴ 𝐑ᴀɴᴀ
💫 *𝐅ᴀᴄᴇʙᴏᴏᴋ:* 𝐗-𝐒ʜꫝʜɪɴ
🕌 *𝐑ᴇʟɪɢɪᴏɴ:* 𝐈sʟᴀᴍ
🏠 *𝐀ᴅᴅʀᴇss:* 𝐒ʏʟʜᴇᴛ, 𝐁ᴀɴɢʟᴀᴅᴇsʜ
👑 *𝐆ᴇɴᴅᴇʀ:* 𝐌ᴀʟᴇ
🎂 *𝐀ɢᴇ:* 18+
💝 *𝐑ᴇʟᴀᴛɪᴏɴsʜɪᴘ:* 𝐒ɪɴɢʟᴇ
📚 *𝐖ᴏʀᴋ:* 𝐒ᴛᴜᴅᴇɴᴛ

━━━━━━━━━━━━━━━━━━
🖥️ *𝐒ᴇʀᴠᴇʀ 𝐈ɴғᴏ*

⚙️ *𝐏ʟᴀᴛғᴏʀᴍ:* ${os.platform()}
🖥️ *𝐂ᴘᴜ:* ${os.cpus()[0].model}
🌐 *𝐍ᴏᴅᴇ 𝐕ᴇʀsɪᴏɴ:* ${process.version}
⏰ *𝐔ᴘᴛɪᴍᴇ:* ${uptime}
💾 *𝐓ᴏᴛᴀʟ 𝐌ᴇᴍᴏʀʏ:* ${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB
📂 *𝐅ʀᴇᴇ 𝐌ᴇᴍᴏʀʏ:* ${(os.freemem() / (1024 ** 3)).toFixed(2)} GB

━━━━━━━━━━━━━━━━━━
*⎯͢✧🫣 𝐒ʜᴀʜɪɴ 𝐑ᴀɴᴀꫝᥫ᭡ 🐱*
`;

      await api.sendMessage(
        event.threadId,
        {
          image: {
            url: "https://i.postimg.cc/2y9bTqv6/retouch-2025071913433217.jpg"
          },
          caption: infoMessage || ''
        },
        {
          quoted: event.message
        }
      );

    } catch (error) {

      console.error(error);

      await api.sendMessage(
        event.threadId,
        {
          text: '❌ 𝐅ᴀɪʟᴇᴅ 𝐓ᴏ 𝐅ᴇᴛᴄʜ 𝐈ɴғᴏ 🐱'
        },
        {
          quoted: event.message
        }
      );
    }
  },
};
