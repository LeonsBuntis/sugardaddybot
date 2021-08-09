const { tryAddChatId, tryRemoveChatId } = require('./pg_repo.js');

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

module.exports = {
    subscribe,
    unsubscribe
};