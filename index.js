'use strict';

const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const winston = require('winston');
const TextMessage = require('viber-bot').Message.Text;
const express = require('express')

function createLogger() {
    const logger = winston.createLogger({
        level: "debug"
    }); // We recommend DEBUG for development
    return logger;
}

const logger = createLogger();

const bot = new ViberBot({
    authToken: '',
    name: '',
    avatar: "http://viber.com/avatar.jpg", // It is recommended to be 720x720, and no more than 100kb.
    logger: logger
});

// Perfect! Now here's the key part:
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    // Echo's back the message to the client. Your bot logic should sit here.
    response.send(message);
});

// A simple regular expression to answer messages in the form of 'hi' and 'hello'.
bot.onTextMessage(/^hi|hello$/i, (message, response) => {
    console.log('test')
    response.send(new TextMessage(`Hi there ${response.userProfile.name}. I am ${bot.name}`))
})

// Wasn't that easy? Let's create HTTPS server and set the webhook:
const port = process.env.PORT || 8080;

// Viber will push messages sent to this URL. Web server should be internet-facing.
const webhookUrl = process.env.WEBHOOK_URL;

const app = express()
// app.use('/viber/webhook', bot.middleware())
app.get('/', (req, res) => {
    res.status(200)
    res.send('ok')
})

app.listen(port, () => {
    // bot.setWebhook(webhookUrl)
    console.log(`this bot is listening on port: ${port}`)
})
