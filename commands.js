const { tryAddChatId, tryRemoveChatId } = require('./pg_repo.js');
const { checkNewTrx } = require('./bl');

const subscribe = async (chatId, reply) => {
    if (await tryAddChatId(chatId)) {
        reply('Subscribed! 💪');
    }
    else {
        reply('You are already subscribed! 🤘');
    }
};

const unsubscribe = async (chatId, reply) => {
    if (await tryRemoveChatId(chatId)) {
        reply('💩');
    }
    else {
        reply('something went wrong u\'re still subbed 💩');
    }
};

const lookForNewTrx = async (reply) => {
    const sugarDaddyAddress = '1P5ZEDWTKTFGxQjZphgWPQUpe554WKDfHQ';

    const newTrx = await checkNewTrx(sugarDaddyAddress);

    console.log(`new trx amount => ${newTrx}`);

    if (newTrx) {
        if (Math.round(newTrx) == 0) {
            await reply(`daddy got his %%% feels good +${newTrx} BTC`);
        } else if (Math.round(newTrx) > 0) {
            await reply(`Sugar daddy BOUGHT something +${newTrx} BTC!!!! GOGOGO BUY`);
        } else {
            await reply(`DADDY !!!SOLD!!! ABANDON THE SHIP -${newTrx} BTC`);
        }
    }
    else{
        await reply(`no new trx detected`);
    }
};

module.exports = {
    subscribe,
    unsubscribe,
    lookForNewTrx
};