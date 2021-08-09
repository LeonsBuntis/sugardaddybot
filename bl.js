const axios = require('axios').default;
const { getLastTrx, tryUpdateLastTrx } = require('./pg_repo');

const getLastTransaction = async (sugarDaddyAddress, limit = 20) => {
    try {
        const response = await axios.get(`https://blockchain.info/rawaddr/${sugarDaddyAddress}?limit=${limit}`);

        console.log(response);

        return response.data.txs;
    } catch (error) {
        console.log(error);

        throw error;
    }
};

const isLatestTrx = async (latestTrx, lastKnownTrxHash) => latestTrx.hash.trim() == lastKnownTrxHash;

const checkNewTrx = async (sugarDaddyAddress) => {
    const latestTrxs = await getLastTransaction(sugarDaddyAddress);
    const lastKnownTrxHash = (await getLastTrx(sugarDaddyAddress)).trim();

    const newTrxs = [];

    for (let i = 0; i < latestTrxs.length; i++) {
        const latestTrx = latestTrxs[i];

        if (!isLatestTrx(latestTrx, lastKnownTrxHash)) {
            newTrxs.push(latestTrx);
        } else {
            break;
        }
    }

    // console.log(`latest trx -> ${latestTrx.hash}`);
    // console.log(`last known trx -> ${lastKnownTrxHash}`);

    if (newTrxs.length === 0) {
        console.log('transactions are the same');
        return null;
    } else {
        console.log('new trx detected!');

        const trxsAmounts = [];

        newTrxs.forEach(newTrx => {

            tryUpdateLastTrx(sugarDaddyAddress, newTrx.hash);

            let latestAmount = latestTrx.result / 100000000;

            if (Math.round(latestAmount) != 0) {
                trxsAmounts.push(latestAmount);
            }
        });

        return trxsAmounts;
    }
};

const getBtcPrice = async () => {
    try {
        const response = await axios.get(`https://api.blockchain.com/v3/exchange/tickers/BTC-USD`);

        console.log(response);

        return response.data.last_trade_price;
    } catch (error) {
        console.log(error);

        throw error;
    }
};

module.exports = { checkNewTrx, getBtcPrice };