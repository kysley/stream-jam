# Testing events locally:

## Prereqs
1. Install twitch CLI and configure it for your app
2. Install and configure ngrok to use used for twitch webhooks


## Setup
TESjs looks for a port in several places. `this.port = port || process.env.PORT || 8080;`. `port` is optionally specified when initializing the `listener` field. Make sure you know which port to make available to ngrok.

Currently the app requires scopes:

```
channel:read:subscriptions
channel:read:predictions
moderator:read:followers
```

When setting up subscriptions, I believe that the broadcaster id provided needs to be authenticated with stream-jam, otherwise there will be an error. For easy testing, my id is `"39726444"`.

Depending on the library, the id needs to be a string. TES wants a string, but twurple doesn't.

## Testing events

1. Run the dev server. `$ yarn dev`
2. Run ngrok on the port of the **TES port**. `$ ngrok http <port>`.
3. Send a test event with Twitch CLI: `twitch event trigger subscribe -F <ephemeral ngrok url>/teswh/event -s <secret> -t 39726444c`

- -F: The web server address to send the mock events to.
- -s: The secret that is set when initializing TES
- -t: The user that is receiving the event. In this case its me

## Notes
Ngrok gives you a new url each time you run it. **You need to update the twitch event command and url for TES when initializing.**

You need to match the `-s <secret>` option with what you have in your .env for `TES_WEBHOOK_SECRET`
