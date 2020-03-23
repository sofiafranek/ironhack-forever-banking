/** TRYING NODE SCHEDULE **/
const schedule = require('node-schedule');
const Transaction = require('./database/models/transaction');
const Account = require('./database/models/account');
const Credit = require('./database/models/credit');
const Notification = require('./database/models/notification');
const UserAccount = require('./database/models/userAccount');
const getSymbolFromCurrency = require('currency-symbol-map');

module.exports = schedule.scheduleJob('0 * * *', async () => {
  try {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const status = 'Pending';

    const transactions = await Transaction.aggregate([
        {$addFields: 
            {
                "month" : {$month: '$dateTransaction'},
                "day" : {$dayOfMonth: '$dateTransaction'},
                "year" : {$year: '$dateTransaction'}
            }
        },
        {$match: 
            {
                status,
                month,
                day,
                year
            }
        }
    ]);

    for (const transaction of transactions) {
      let accountFrom = null, accountTo = null, balanceFrom = 0, balanceTo = 0, type = '', typeAccTo = '', userFrom = null, userTo = null, messageFrom = '', messageTo = '';
      let accountIDFrom = transaction.accountIDFrom;
      let accountIDTo = transaction.accountIDTo;
      const amount = transaction.totalAmount;

      if (!accountIDFrom) {
        accountIDFrom = transaction.creditFrom;
        accountFrom = await Credit.getAccountById(accountIDFrom);
        balanceFrom = accountFrom.current;
        type = 'Credit';
        userFrom = await Credit.getUser(accountIDFrom);
      }
      else {
        accountFrom = await Account.getAccountById(accountIDFrom);
        balanceFrom = accountFrom.balance;
        userFrom = await UserAccount.getUser(accountIDFrom);
      }

      if (!accountIDTo) {
        accountIDTo = transaction.creditTo;
        accountTo = await Credit.getAccountById(accountIDTo);
        balanceTo = accountTo.current;
        typeAccTo = 'Credit';
        userTo = await Credit.getUser(accountIDTo);
      }
      else {
        accountTo = await Account.getAccountById(accountIDTo);
        balanceTo = accountTo.balance;
        userTo = await UserAccount.getUser(accountIDTo);
      }

      const userIDFrom = userFrom.userID._id;
      const userIDTo = userTo.userID._id;
      const userNameFrom = userFrom.userID.name;
      const userNameTo = userTo.userID.name;
      const minusBalance = balanceFrom - Number(amount);
      const addBalance = Number(balanceTo) + Number(amount);
      const currencyFrom = accountFrom.currency;
      const currencyTo = accountTo.currency;

      await Transaction.findOneAndUpdate(
        {
          _id: transaction._id
        },
        {
          status: minusBalance >= 0 ? 'Executed' : 'Failed'
        }
      );

      if (minusBalance > 0) {
        (type === 'Credit') ? await Credit.updateCurrent(accountIDFrom, minusBalance) : await Account.updateBalance(accountIDFrom, minusBalance);
        (typeAccTo === 'Credit') ? await Credit.updateCurrent(accountIDTo, addBalance) : await Account.updateBalance(accountIDTo, addBalance);
        messageFrom = `You just sent ${amount + getSymbolFromCurrency(currencyFrom)} to ${userNameTo}`;
        messageTo = `${userNameFrom} sent you ${amount + getSymbolFromCurrency(currencyTo)}`;
      }
      else {
        messageFrom = `${userNameFrom} the schedule transaction of ${amount + getSymbolFromCurrency(currencyFrom)} to ${userNameTo} failed. You have to TOP-UP your account`;
      }
      await Notification.createNotification(
        userIDFrom, userIDTo, messageFrom, messageTo
      );

    }
  } catch (error) {
    console.log('There was an error processing the transaction', error);
  }
});
