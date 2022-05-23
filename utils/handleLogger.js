
const { IncomingWebhook } = require("@slack/webhook")
const bewHook = new IncomingWebhook(process.env.SALCK_WEB_HOOK);

const loggerStream = {
    write: message => {
        bewHook.send({
            text: message
        })
    },
};

module.exports = loggerStream;