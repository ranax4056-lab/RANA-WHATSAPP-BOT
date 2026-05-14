module.exports = {
  event: 'add',
  handle: async ({ api, event }) => {
    const newMembers = event.participants;
    const groupInfo = await api.groupMetadata(event.id);
    const groupName = groupInfo.subject;
    const totalMembers = groupInfo.participants.length;

    for (const member of newMembers) {
      let profilePicUrl;
      try {
        profilePicUrl = await api.profilePictureUrl(member, 'image');
      } catch (error) {
        profilePicUrl = null;
      }

      const username = `@${member.split('@')[0]}`;
      const welcomeMessage = `🦢 *⎯͢✧ 𝐇ᴇʏ ${username}, ⎯͢✧𝐖ᴇʟᴄᴏᴍᴇ 𝐓ᴏ ${groupName}!* ✨\n\n` +
        `💗 *⎯͢✧𝐁ᴀᴄᴋɢʀᴏᴜɴᴅ 𝐌ᴜsɪᴄ 𝐒ᴛᴀʀᴛs 🎧...* \n` +
        `🏠 *⎯͢✧ 𝐓ᴏᴛᴀʟ 𝐌ᴇᴍʙᴇʀ𝐬:* ${totalMembers}\n` +
        `🌟 *⎯͢✧ 𝐑ᴜʟᴇs:𝐀ᴄᴛɪᴠᴇ & 𝐄ɴᴊᴏʏ*

⎯͢✧🤖 𝐁𝐨𝐭 𝐎𝐰𝐧𝐞𝐫 ⎯͢✧🐱

⎯͢✧🌷 𝐒ʜᴀʜɪɴ 𝐑ᴀɴᴀꫝᥫ᭡ 🐱`;

      if (profilePicUrl) {
        await api.sendMessage(event.id, {
          image: { url: profilePicUrl },
          caption: welcomeMessage,
          mentions: [member]
        });
      } else {
        await api.sendMessage(event.id, {
          text: welcomeMessage,
          mentions: [member]
        });
      }
    }
  }
};
