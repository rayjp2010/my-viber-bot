// 'use strict';
//
const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const winston = require('winston');
const TextMessage = require('viber-bot').Message.Text;
const express = require('express')

const authToken = process.env.AUTH_TOKEN || ''
const name = process.env.BOT_NAME || ''
const avatar = process.env.BOT_AVATAR_URL || ''
// Viber will push messages sent to this URL. Web server should be internet-facing.
const webhookUrl = process.env.WEBHOOK_URL || '';
const port = process.env.PORT || 3000
console.log(`token: ${process.env.AUTH_TOKEN}`)
console.log(`name: ${process.env.BOT_NAME}`)
console.log(`avatar: ${process.env.BOT_AVATAR_URL}`)
console.log(`hook: ${process.env.WEBHOOK_URL}`)

// const logger = createLogger();
// const app = express()
//
// const bot = new ViberBot({
//     authToken,
//     name,
//     avatar, // It is recommended to be 720x720, and no more than 100kb.
//     logger,
// });
//
// function createLogger() {
//     const logger = winston.createLogger({
//         level: "debug"
//     }); // We recommend DEBUG for development
//     return logger;
// }
//
// // Perfect! Now here's the key part:
// bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
//     // Echo's back the message to the client. Your bot logic should sit here.
//     response.send(message);
// });
//
// // A simple regular expression to answer messages in the form of 'hi' and 'hello'.
// bot.onTextMessage(/^hi|hello$/i, (message, response) => {
//     console.log('test')
//     response.send(new TextMessage(`Hi there ${response.userProfile.name}. I am ${bot.name}`))
// })
//
// // app.use('/viber/webhook', bot.middleware())
//
// app.get('/', (req, res) => {
//     console.log('health check')
//     res.status(200)
//     res.end('ok')
// })
//
// app.listen(port, () => {
//     console.log(`Listening on ${port}`)
//     bot.setWebhook(webhookUrl)
// });

'use strict';

const bot = new ViberBot({
    authToken,
    name,
    avatar,
});

// Perfect! Now here's the key part:
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    // Echo's back the message to the client. Your bot logic should sit here.
    response.send(message);
});

// Wasn't that easy? Let's create HTTPS server and set the webhook:
const https = require('https');

https.createServer({}, bot.middleware()).listen(port, () => bot.setWebhook(webhookUrl));
