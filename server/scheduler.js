/** TRYING NODE SCHEDULE **/
const schedule = require('node-schedule');
const Transaction = require('./models/transaction');
const Account = require('./models/account');

module.exports = schedule.scheduleJob('01 * * * *', async () => {
  try {
    const transactions = await Transaction.find({
      status: 'Pending'
      /*dateTransaction: { $lt: new Date() }*/
    });

    for (const transaction of transactions) {
      const accountIDFrom = transaction.accountIDFrom;
      const accountIDTo = transaction.accountIDTo;
      const amount = transaction.totalAmount;

      const accountFrom = await Account.findById(accountIDFrom);
      const accountTo = await Account.findById(accountIDTo);

      const balanceFrom = accountFrom.balance;
      const balanceTo = accountTo.balance;
      const minusBalance = balanceFrom - Number(amount);
      const addBalance = Number(balanceTo) + Number(amount);

      await Transaction.findOneAndUpdate(
        {
          _id: transaction._id
        },
        {
          status: minusBalance >= 0 ? 'Executed' : 'Failed'
        }
      );

      if (minusBalance > 0) {
        await Account.findByIdAndUpdate({ _id: accountIDFrom }, { balance: minusBalance });
        await Account.findByIdAndUpdate({ _id: accountIDTo }, { balance: addBalance });
      }
    }
  } catch (error) {
    console.log('There was an error processing the transaction', error);
  }
});
