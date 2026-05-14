module.exports = {
  event: 'promote',
  handle: async ({ api, event }) => {
    const promotedMembers = event.participants;
    console.log(event);
    for (const member of promotedMembers) {
      await api.sendMessage(event.id, {
        text: `🎉⎯͢✧🫰 𝐂ᴏɴɢʀᴀᴛᴜʟᴀᴛɪᴏɴꜱᥫ᭡  @${member.split('@')[0]}! You are now an admin!`,
        mentions: [member]
      });
    }
  }
};
