console.log(`Run job on -> ${new Date()}`);

const { Telegram } = require('micro-bot');
const { getChatIds } = require('./pg_repo.js');

const { checkNewTrx, getBtcPrice } = require('./bl');

const bot = new Telegram(process.env.BOT_TOKEN);

(async () => {
    const sugarDaddyAddress = '1P5ZEDWTKTFGxQjZphgWPQUpe554WKDfHQ';

    const newTrxs = await checkNewTrx(sugarDaddyAddress);

    console.log(`new trxs => ${newTrxs}`);

    let msg = '';

    if (newTrxs && newTrxs.length > 0) {
        const lastPrice = await getBtcPrice();

        msg = `New transactions detected at ${Math.round(lastPrice)} BTC-USD:`;
        newTrxs.forEach(newTrx => {
            if (newTrx > 0) {
                msg += `\r\n+${newTrx} BTC`;
            } else {
                msg += `\r\n${newTrx} BTC`;
            }
        });
    }

    if (!msg) {
        return;
    }

    let chatIds = await getChatIds();

    for (const { ChatId } of chatIds) {
        console.log(`sending to -> ${ChatId}`);

        await bot.sendMessage(ChatId, msg);
    }
})();