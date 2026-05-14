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
      const welcomeMessage = `🎉✨ *⎯͢✧🫣 𝐇ᴇʏ* ${username}, *⎯͢✧𝐖ᴇʟᴄᴏᴍᴇ 𝐓ᴏ* ${groupName}!* ✨🎉\n\n` +
        `*⎯͢✧🐱 আমাদের ছোট্ট পরিবার এ আপনাকে স্বাগতম ᥫ᭡*!\n` +
        `👥 *⎯͢✧ 𝐓ᴏᴛᴀʟ 𝐌ᴇᴍʙᴇʀ𝐬:* ${totalMembers}\n` +
        `📢 *⎯͢✧ 𝐑ᴜʟᴇs:* *𝐀ᴄᴛɪᴠᴇ & 𝐄ɴᴊᴏʏ*`;

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
