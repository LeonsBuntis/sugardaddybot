const { Composer, Stage, Scene, session } = require('micro-bot');
const { checkNewTrx } = require('./bl');
const axios = require('axios').default;

const bot = new Composer();

bot.start(({ reply }) => {
    // let msg = 'Welcome! 💪\nAvailable commands:';
    // for (let cmd of commands) {
    //     msg += `\n${cmd}`;
    // }

    let msg = 'Hi!💋';
    reply(msg);
});

bot.command('last_balance', async (ctx) => await GetLastBalance(ctx.update.message.chat.id, ctx.reply));

bot.hears('h', (ctx) => ctx.reply('42'));

const GetLastBalance = async (chatId, reply) => {
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
};

module.exports = bot;