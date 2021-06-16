console.log(`Run job on -> ${new Date()}`);

const { Telegram } = require('micro-bot');
const { getChatIds } = require('./pg_repo.js');

const { checkNewTrx } = require('./bl');

const bot = new Telegram(process.env.BOT_TOKEN);

(async () => {
    const sugarDaddyAddress = '1P5ZEDWTKTFGxQjZphgWPQUpe554WKDfHQ';

    const newTrx = await checkNewTrx(sugarDaddyAddress);

    console.log(`new trx amount => ${newTrx}`);

    let msg = '';

    if (newTrx) {
        if (Math.round(newTrx) == 0) {
            msg = `daddy got his %%% feels good +${newTrx} BTC`;
        } else if (Math.round(newTrx) > 0) {
            msg = `Sugar daddy BOUGHT something +${newTrx} BTC!!!! GOGOGO BUY`;
        } else {
            msg = `DADDY !!!SOLD!!! ABANDON THE SHIP -${newTrx} BTC`;
        }
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