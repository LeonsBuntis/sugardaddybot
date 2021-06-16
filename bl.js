const axios = require('axios').default;
const { getLastTrx, tryUpdateLastTrx } = require('');

const sugarDaddyAddress = '1P5ZEDWTKTFGxQjZphgWPQUpe554WKDfHQ';

const getLastTransaction = async () => {
    try {
        const response = await axios.get(`https://blockchain.info/rawaddr/${sugarDaddyAddress}?limit=1`);
        let lastTx = response.data.txs[0];

        return lastTx;
    } catch (error) {
        console.log(error);

        throw error;
    }
};

const checkNewTrx = async () => {
    const latestTrx = await getLastTransaction();
    const lastKnownTrxHash = await getLastTrx(sugarDaddyAddress);

    if (latestTrx.hash === lastKnownTrxHash) {
        console.log('transactions are the same');

        return null;
    } else {
        console.log('new trx detected!');

        tryUpdateLastTrx(sugarDaddyAddress, latestTrx.hash)

        return latestTrx;
    }
};

module.exports = { checkNewTrx };