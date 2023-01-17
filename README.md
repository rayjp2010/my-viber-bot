# my-viber-bot
Viber bot that works in heroku.

## Deploy steps

```shell
# 1. create heroku account
# 2. login to heroku
heroku login # login

# 3. create app 
heroku apps:create [app_name]

# 4. add config
heroku config:set AUTH_TOKEN=[your_token]
heroku config:set WEBHOOK_URL=https://[app_name].herokuapp.com
heroku config:set port=8080
heroku config:set BOT_NAME=[your_bot_name]

# 5. deploy
git push heroku main
```
