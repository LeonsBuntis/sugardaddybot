const { Client } = require('pg')

const withSql = async (query, values) => {
    const config = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    };

    const client = new Client(config)

    await client.connect()

    const res = await client.query(query, values)

    await client.end()

    return res.rows;
};

const getChatIds = async () => {
    try {
        let chatIds = await withSql('SELECT "ChatId" FROM public."SugarDaddySubscribers";');
        // console.log(chatIds);
        return chatIds;
    } catch (error) {
        return [];
    }
};

const tryAddChatId = async (chatId) => {
    try {
        const query = 'INSERT into public."SugarDaddySubscribers" values ($1);';
        await withSql(query, [chatId]);

        return true;
    } catch (error) {
        console.log(error.code);

        if (error.code == 23505) {
            // already exists
            return false;
        }
        
        throw error;
    }
};

const tryRemoveChatId = async (chatId) => {
    try {
        const query = 'delete from public."SugarDaddySubscribers" where "ChatId" = $1;';
        await withSql(query, [chatId]);

        return true;
    } catch (error) {
        return false;
    }
};

const getLastTrx = async (address) => {
    try {
        let lastTrx = await withSql('SELECT "LastTrx" FROM public."LastTransactions" WHERE "Address" = $1;', [address]);
        
        //console.log(lastTrx);
        
        if (lastTrx.length > 0){
        
            return lastTrx[0].LastTrx.trim();
        }

        return null;
    } catch (error) {
        return null;
    }
}

const tryUpdateLastTrx = async (address, newTrx) => {
    try {
        let r = await withSql('update public."LastTransactions" set "LastTrx" = $1 WHERE "Address" = $2;', [newTrx, address]);
        
        console.log(r);
        
        return true;
    } catch (error) {

        console.log(error);
        return false;
    }
}

module.exports = { getChatIds, tryAddChatId, tryRemoveChatId, getLastTrx, tryUpdateLastTrx };