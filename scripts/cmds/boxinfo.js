const fs = require("fs-extra");
const request = require("request");

module.exports = {
config: {
    name: "boxinfo",
    aliases: ['boxinfo'],
    version: "1.0",
    author: "xemon",
    countDown: 5,
    role: 0,
    shortDescription: "See Box info",
    longDescription: "",
    category: "box chat",
    guide: {
      en: "{p} [groupinfo|boxinfo]",
    }
  },

 onStart: async function ({ api, event, args }) {
  let threadInfo = await api.getThreadInfo(event.threadID);
  var memLength = threadInfo.participantIDs.length;
  let threadMem = threadInfo.participantIDs.length;
  var nameMen = [];
    var gendernam = [];
    var gendernu = [];
    var nope = [];
     for (let z in threadInfo.userInfo) {
      var gioitinhone = threadInfo.userInfo[z].gender;
      var nName = threadInfo.userInfo[z].name;
        if(gioitinhone == "MALE"){gendernam.push(z+gioitinhone)}
        else if(gioitinhone == "FEMALE"){gendernu.push(gioitinhone)}
            else{nope.push(nName)}
    };
  var nam = gendernam.length;
    var nu = gendernu.length;
   var listad = '';
   var qtv2 = threadInfo.adminIDs;
  let qtv = threadInfo.adminIDs.length;
  let sl = threadInfo.messageCount;
  let u = threadInfo.nicknames;
  let icon = threadInfo.emoji;
  let threadName = threadInfo.threadName;
  let id = threadInfo.threadID;
   for (let i = 0; i < qtv2.length; i++) {
const infu = (await api.getUserInfo(qtv2[i].id));
const name = infu[qtv2[i].id].name;
    listad += '•' + name + '\n';
  }
  let sex = threadInfo.approvalMode;
      var pd = sex == false ? 'Turned off' : sex == true ? 'Turned on' : 'Kh';
      var callback = () =>
        api.sendMessage(
          {
            body: `╭━━━━━━━━━━━◆\n│🌺∘❀🍀𝗦𝗛𝗜𝗭𝗨𝗞𝗔🍀❀∘🌺\n├━━━━━━━━━━━◆\n│𝘕𝘖𝘔 𝘋𝘜 𝘎𝘙𝘖𝘜𝘗𝘌\n│${threadName}\n├━━━━━━━━━━━◆\n│𝘎𝘙𝘖𝘜𝘗 𝘐𝘋\n│${id}\n├━━━━━━━━━━━◆\n│ 𝐀𝐩𝐩𝐫𝐨𝐯𝐚𝐥 : ${pd}\n├━━━━━━━━━━━◆\n│𝘙𝘦́𝘢𝘤𝘵𝘪𝘰𝘯 𝘳𝘢𝘱𝘪𝘥𝘦: ${icon}\n╰━━━━━━━━━━━◆\n╭━━━━━━━━━━━◆\n│「 𝑰𝑵𝑭𝑶𝑹𝑴𝑨𝑻𝑰𝑶𝑵」\n├───────────\n│ 𝘐𝘭 𝘢 ${threadMem} 𝘮𝘦𝘮𝘣𝘳𝘦𝘴\n│𝘥𝘢𝘯𝘴 𝘤𝘦 𝘨𝘳𝘰𝘶𝘱𝘦.\n│𝘓𝘦 𝘯𝘰𝘮𝘣𝘳𝘦 𝘵𝘰𝘵𝘢𝘭\n│𝘥𝘦 𝘨𝘢𝘳𝘤̧𝘰𝘯 𝘦𝘴𝘵 𝘥𝘦 ${nam}\n│𝘓𝘦 𝘯𝘰𝘮𝘣𝘳𝘦 𝘵𝘰𝘵𝘢𝘭\n│𝘥𝘦 𝘧𝘪𝘭𝘭𝘦 𝘦𝘴𝘵 𝘥𝘦 ${nu}\n│𝘐𝘭 𝘢 ${qtv} 𝘢𝘥𝘮𝘪𝘯(𝘴)\n│𝘥𝘢𝘯𝘴 𝘤𝘦 𝘨𝘳𝘰𝘶𝘱𝘦\n├━━━━━━━━━━━◆\n│𝘓𝘪𝘴𝘵𝘦 𝘥𝘦𝘴 𝘢𝘥𝘮𝘪𝘯𝘪𝘴𝘵𝘳𝘢𝘵𝘦𝘶𝘳𝘴\n├───────────\n│${listad}\n╰━━━━━━━━━━━◆\n╭━━━━━━━━━━━◆\n│𝘓𝘦 𝘯𝘰𝘮𝘣𝘳𝘦 𝘵𝘰𝘵𝘢𝘭 𝘥𝘦\n│𝘮𝘦𝘴𝘴𝘢𝘨𝘦 𝘦𝘯𝘷𝘰𝘺𝘦́ 𝘦𝘴𝘵\n│𝘥𝘦 ${sl} msgs\n╰━━━━━━━━━━━◆\n╭━━━━━━━━━━━◆\n│✧.(⊃^ ω ^)🍀(.• ⁠ᴗ⁠ •⊂).\n╰━━━━━━━━━━━◆\n\n🌺𝗔𝗦𝗦𝗜𝗦𝗧𝗔𝗡𝗧 𝗦𝗛𝗜𝗭𝗨𝗞𝗔 ...
𝘮𝘢𝘥𝘦 𝘣𝘺..𝘚𝘏𝘐𝘡𝘜𝘒𝘈 𝘑𝘜𝘕𝘐𝘖𝘙...`,
            attachment: fs.createReadStream(__dirname + '/cache/1.png')
          },
          event.threadID,
          () => fs.unlinkSync(__dirname + '/cache/1.png'),
          event.messageID
        );
      return request(encodeURI(`${threadInfo.imageSrc}`))
        .pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
        .on('close', () => callback());
 }
};
