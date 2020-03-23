const schedule = require('node-schedule');
const User = require('./database/models/user');
const UserAccount = require('./database/models/userAccount');
const Account = require('./database/models/account');
const Notification = require('./database/models/notification');
const getSymbolFromCurrency = require('currency-symbol-map');

module.exports = schedule.scheduleJob('0 * * *', async () => {
try {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const usertype = 'Premium';
    const fee = 7.99;

    const users = await User.aggregate([
        {$addFields: 
            {
                "month" : {$month: '$createdAt'},
                "day" : {$dayOfMonth: '$createdAt'},
                "year" : {$year: '$createdAt'}
            }
        },
        {$match: 
            {
                usertype,
                month,
                day,
                year
            }
        }
    ]);
    
    for (const user of users) {
        const userIDFrom = user._id;
        const userNameFrom = user.name;
        const primaryAccount = await UserAccount.getUserPrimaryAccount(user._id);
        const accountID = primaryAccount._id;
        const currencyFrom = primaryAccount.currency;

        const accountIDBank = '111111111111111111';
        const accountBank = await Account.getAccountById(accountIDBank);
        const currencyBank = accountBank.currency;
        const userTo = await UserAccount.getUser(accountIDBank);
        const userIDTo = userTo.userID._id;

        const balance = primaryAccount.balance;
        const balanceBank = accountBank.balance;
        const minusBalance = balance - fee;
        const addBalance = balanceBank + fee;

        await Account.updateBalance(accountID, minusBalance);
        await Account.updateBalance(accountIDBank, addBalance);

        const messageTo = `${userNameFrom} paied the minimum credit ${fee + getSymbolFromCurrency(currencyBank)}`;
        const messageFrom = `The bank took you the fee of Premium Account of ${fee}${getSymbolFromCurrency(currencyFrom)}`;

        await Notification.createNotification(
            userIDFrom, userIDTo, messageFrom, messageTo
        );
    }
} catch (error) {
    console.log('There was an error processing the charger', error);
}
});