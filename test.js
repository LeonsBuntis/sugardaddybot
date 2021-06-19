
const { getLastTrx, tryUpdateLastTrx } = require('./pg_repo');

getLastTrx('1P5ZEDWTKTFGxQjZphgWPQUpe554WKDfHQ').then(r => console.log(r));