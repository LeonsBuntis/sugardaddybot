const { Composer, Stage, Scene, session } = require('micro-bot');
const Commands = require('./commands');

const bot = new Composer();

const commands = [
    '/subscribe - Subscribes',
    '/unsubscribe - Unsubscribes',
    // '/check_new_trx - Checks new trx pls dont spam more than 1 a minute'
]

bot.start(({ reply }) => {
    let msg = 'Welcome! 😘\nAvailable commands:';
    for (let cmd of commands) {
        msg += `\n${cmd}`;
    }

    reply(msg);
});

bot.command('subscribe', (ctx) => Commands.subscribe(ctx.update.message.chat.id, ctx.reply));
bot.command('unsubscribe', (ctx) => Commands.unsubscribe(ctx.update.message.chat.id, ctx.reply));
// bot.command('check_new_trx', async (ctx) => await Commands.lookForNewTrx(ctx.reply));

bot.hears('h', (ctx) => ctx.reply('42'));

module.exports = bot;