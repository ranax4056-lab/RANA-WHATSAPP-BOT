const fs = require("fs");
const path = require("path");
const os = require("os");

function getFolderSize(folderPath) {

  let totalSize = 0;

  function calculate(dir) {

    const files = fs.readdirSync(dir);

    for (const file of files) {

      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {

        calculate(filePath);

      } else {

        totalSize += stats.size;

      }
    }
  }

  calculate(folderPath);

  return totalSize;
}

function getCacheSize() {

  const cachePath = path.join(process.cwd(), "plugins", "cache");

  if (!fs.existsSync(cachePath)) return 0;

  return getFolderSize(cachePath);
}

module.exports = {
  config: {
    name: 'ping',
    aliases: ['p'],
    permission: 0,
    prefix: 'both',
    categories: 'system',
    description: 'Check bot response time',
    credit: "Shahin Rana"
  },

  start: async ({ event, api }) => {

    const { threadId, message } = event;

    const start = Date.now();

    const ping = Date.now() - start;

    const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);

    const rootSize = getFolderSize(process.cwd());
    const cacheSize = getCacheSize();

    const rootMB = (rootSize / 1024 / 1024).toFixed(2);
    const cacheMB = (cacheSize / 1024 / 1024).toFixed(2);

    let status = "🚀 𝐒ᴜᴘᴇʀ 𝐅ᴀsᴛ";

    if (ping > 500) {
      status = "🐢 𝐒ʟᴏᴡ";
    } else if (ping > 200) {
      status = "⚠️ 𝐍ᴏʀᴍᴀʟ";
    }

    const box = `
╔═══❖•ೋ°°ೋ•❖═══╗
🏓 *𝐒ʏsᴛᴇᴍ 𝐏ɪɴɢ*
╚═══❖•ೋ°°ೋ•❖═══╝

⚡ ⎯͢✧ 𝐏ɪɴɢ ꫝᥫ᭡ 🐱
💫 *${ping}ms*

📊 ⎯͢✧ 𝐒ᴛᴀᴛᴜs ꫝᥫ᭡ 🐱
${status}

🧠 ⎯͢✧ 𝐑ᴀᴍ ꫝᥫ᭡ 🐱
💾 *${freeMem}/${totalMem} GB*

📦 ⎯͢✧ 𝐏ʀᴏᴊᴇᴄᴛ 𝐒ɪᴢᴇ ꫝᥫ᭡ 🐱
📂 *${rootMB} MB*

🗂️ ⎯͢✧ 𝐂ᴀᴄʜᴇ 𝐒ɪᴢᴇ ꫝᥫ᭡ 🐱
📁 *${cacheMB} MB*

━━━━━━━━━━━━━━━━━━
*⎯͢✧🫣 𝐒ʜᴀʜɪɴ 𝐑ᴀɴᴀꫝᥫ᭡ 🐱*
`;

    await api.sendMessage(
      threadId,
      { text: box },
      { quoted: message }
    );
  }
};
