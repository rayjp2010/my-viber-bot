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
const port = process.env.PORT || 8080
const boturl = '/bot'
const hookurl = '/hook'

console.log(`name: ${process.env.BOT_NAME}`)
console.log(`avatar: ${process.env.BOT_AVATAR_URL}`)
console.log(`hook: ${process.env.WEBHOOK_URL}`)
console.log(`port: ${process.env.PORT}`)

const logger = createLogger();
const app = express()

const bot = new ViberBot({
    authToken,
    name,
    avatar, // It is recommended to be 720x720, and no more than 100kb.
    logger,
});

function createLogger() {
    const logger = winston.createLogger({
        level: "debug"
    }); // We recommend DEBUG for development
    return logger;
}

// Perfect! Now here's the key part:
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    // Echo's back the message to the client. Your bot logic should sit here.
    response.send(message);
});

app.use(boturl, bot.middleware())

app.get(hookurl, (req, res) => {
    res.status(200)
    res.send('ok')
})

app.listen(port, () => {
    bot.setWebhook(webhookUrl + boturl)
    console.log(`Listening on ${port}`)
});

