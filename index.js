const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
// Path where the session data will be stored
const SESSION_FILE_PATH = './session.json';
const { MessageMedia } = require('whatsapp-web.js');

let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

// Use the saved values
const client = new Client({
    session: sessionData,
    puppeteer: {
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    }
})

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        }
    });
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, {small: true});
});


client.on('ready', () => {
    console.log('ready');
});

client.on('message', msg => {
; (async () => {

    var phrase = await fs.readFileSync('phrase.txt').toString();
    var arr = phrase.split('|');
    var length = arr.length;
    var text = msg.body.toLowerCase();
    for(x = 0; x<length; x++)
    {
        if(text.includes(arr[x]) == 1)
        {
            const media = MessageMedia.fromFilePath('engga.mp3');
            msg.reply(media, null, { sendAudioAsVoice: true })
            break;
        }
        else
        {
            console.log("tidak ada " + arr[x])
        }
    }

})();
});

client.initialize();

// User feed by username
