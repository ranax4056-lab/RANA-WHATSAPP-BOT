const os = require("os");

module.exports = {
  config: {
    name: "uptime",
    aliases: ["up"],
    permission: 0,
    prefix: true,
    description: "Check the bot's uptime.",
    categories: "Bot Management",
    credit: "Shahin Rana",
  },

  start: async ({ api, event }) => {

    const { threadId } = event;

    const uptimeMs = Date.now() - global.botStartTime;

    const days = Math.floor(uptimeMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((uptimeMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((uptimeMs / (1000 * 60)) % 60);
    const seconds = Math.floor((uptimeMs / 1000) % 60);

    const uptime = [
      days ? `${days}d` : "",
      hours ? `${hours}h` : "",
      minutes ? `${minutes}m` : "",
      `${seconds}s`
    ]
      .filter(Boolean)
      .join(" ");

    const cpuModel = os.cpus()[0].model;
    const cpuLoad = os.loadavg()[0].toFixed(2);

    const msg = `
╔═══❖•ೋ°°ೋ•❖═══╗
⚡ *𝐁ᴏᴛ 𝐔ᴘᴛɪᴍᴇ 𝐒ᴛᴀᴛᴜs*
╚═══❖•ೋ°°ೋ•❖═══╝

⏰ ⎯͢✧ 𝐎ɴʟɪɴᴇ 𝐒ɪɴᴄᴇ ꫝᥫ᭡ 🐱

🌸 *𝐃ᴀʏs:* ${days}
🌷 *𝐇ᴏᴜʀs:* ${hours}
💫 *𝐌ɪɴᴜᴛᴇs:* ${minutes}
🎧 *𝐒ᴇᴄᴏɴᴅs:* ${seconds}

━━━━━━━━━━━━━━━━━━
⏱️ *𝐓ᴏᴛᴀʟ 𝐔ᴘᴛɪᴍᴇ:* ${uptime}

🤖 *𝐁ᴏᴛ 𝐍ᴀᴍᴇ:* ${global.config.botName || "X-Shahin"}
🖥️ *𝐄ɴɢɪɴᴇ:* ${cpuModel.split("CPU")[0].trim()}
⚙️ *𝐂ᴘᴜ 𝐋ᴏᴀᴅ:* ${cpuLoad}

✅ *𝐒ᴛᴀᴛᴜs:* 𝐎ɴʟɪɴᴇ 𝐀ɴᴅ 𝐑ᴇᴀᴅʏ!

━━━━━━━━━━━━━━━━━━
*⎯͢✧🫣 𝐒ʜᴀʜɪɴ 𝐑ᴀɴᴀꫝᥫ᭡ 🐱*
`;

    await api.sendMessage(
      threadId,
      { text: msg },
      { quoted: event.message }
    );

  }
};
