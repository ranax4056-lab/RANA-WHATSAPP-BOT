module.exports = {
  event: 'remove',

  handle: async ({ api, event }) => {

    const removedMembers = event.participants;

    for (const member of removedMembers) {

      const numberTag = member.split('@')[0];

      await api.sendMessage(event.id, {
        text:
`╔═══❖•ೋ°°ೋ•❖═══╗
👋 *𝐆ᴏᴏᴅʙʏᴇ @${numberTag}*
╚═══❖•ೋ°°ೋ•❖═══╝

🤗 *আমাদের ছোট্ট পরিবার তুমাকে মিস করবে..!!! 😅*🫰😌

*⎯͢✧🫣 𝐒ʜᴀʜɪɴ 𝐑ᴀɴᴀꫝᥫ᭡*🐱`,
        mentions: [member]
      });

    }
  }
};
