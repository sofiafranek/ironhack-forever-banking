/** TRYING NODE SCHEDULE **/
const schedule = require('node-schedule');
const UserAccount = require('./database/models/userAccount');
const Account = require('./database/models/account');
const Credit = require('./database/models/credit');
const Notification = require('./database/models/notification');
const getSymbolFromCurrency = require('currency-symbol-map');

module.exports = schedule.scheduleJob('0 * * *', async () => {
  try {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const credits = await Credit.aggregate([
        {$addFields: 
            {
                "month" : {$month: '$datePayment'},
                "day" : {$dayOfMonth: '$datePayment'},
                "year" : {$year: '$datePayment'}
            }
        },
        {$match: 
            {
                month,
                day,
                year
            }
        }
    ]);

    for (const credit of credits) {
        const { userID, option, minimumPayment, current, _id, apr, limit } = credit;
        const account = await UserAccount.getUserPrimaryAccount(userID);
        const accountID = account._id;
        const balanceFrom = account.balance;
        const currencyFrom = account.currency;
        const datePayment = currentDate;
        let minusBalance = 0, debt = 0, messageFrom = '', messageTo = '', addBalance = 0;
        const accountIDBank = '111111111111111111';
        const accountBank = await Account.getAccountById(accountIDBank);
        const currencyTo = accountBank.currency;
        const balanceBank = accountBank.balance;
        const userFrom = await Credit.getUser(accountID);
        const userTo = await UserAccount.getUser(accountIDBank);
        const userIDFrom = userFrom.userID._id;
        const userIDTo = userTo.userID._id;
        const userNameFrom = userFrom.userID.name;


        if (current !== limit) {
            if (option === 'minimum') {
                debt = current - minimumPayment;
                minusBalance = balanceFrom - (minimumPayment + debt * apr);
                addBalance = balanceBank + (minimumPayment + debt * apr);
                messageTo = `${userNameFrom} paied the minimum credit ${minusBalance + getSymbolFromCurrency(currencyTo)}. The debt is now ${debt}${minusBalance + getSymbolFromCurrency(currencyTo)}`;
                messageFrom = `The bank took you the minimum credit ${minusBalance + getSymbolFromCurrency(currencyFrom)}. Your debt is now ${debt}${minusBalance + getSymbolFromCurrency(currencyFrom)}`;
            } else {
                minusBalance = balanceFrom - current;
                minusBalance = balanceBank - current;
                messageTo = `${userNameFrom} paied the minimum credit ${minusBalance + getSymbolFromCurrency(currencyTo)}`;
                messageFrom = `The bank took you the minimum credit ${minusBalance + getSymbolFromCurrency(currencyFrom)}`;
            }

            await Account.updateBalance(accountIDBank, addBalance);
            await Account.updateBalance(accountID, minusBalance);
            if (month === 12) {
                datePayment.setMonth(month + 1);
                datePayment.setFullYear(year + 1);
            } else {
                datePayment.setMonth(month + 1);
            }

        }      

        await Credit.updateCredit(_id, datePayment, limit, debt);
        await Notification.createNotification(
            userIDFrom, userIDTo, messageFrom, messageTo
        );

    }
    } catch (error) {
        console.log('There was an error processing the transaction', error);
    }
});
