/** TRYING NODE SCHEDULE **/
const schedule = require('node-schedule');
const Transaction = require('./models/transaction');

module.exports  = schedule.scheduleJob('59 * * * *', function(){

    Transaction.find({status : 'Pending'})
    .then((transactions) => {
        console.log(transactions);
        transactions.map(transaction => {
            const day = transaction.dateTransaction.getDate();
            console.log(day);
        })
        console.log(transactions);
    })
    .catch((error) => {
        console.log(error);
    })
  console.log('The answer to life, the universe, and everything!');
});
