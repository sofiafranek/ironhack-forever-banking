/** TRYING NODE SCHEDULE **/
const schedule = require('node-schedule');
const UserAccount = require('./database/models/userAccount');
const Account = require('./database/models/account');
const Credit = require('./database/models/credit');

module.exports = schedule.scheduleJob('09 * * * *', async () => {
  try {
    const currentDate = new Date();
    const day = currentDate.getDate();
    console.log(day);
    const month = currentDate.getMonth() + 1;
    console.log(month);

    const credits = await Credit.aggregate([
        {$addFields: 
            {
                "month" : {$month: '$datePayment'},
                "day" : {$dayOfMonth: '$datePayment'}
            }
        },
        {$match: 
            {
                month,
                day
            }
        }
    ]);

    console.log(credits);
    for (const credit of credits) {
        const { userID, option, minimumPayment, current } = credit;
        const account = await UserAccount.getUserPrimaryAccount(userID);
        const balance = account.balance;
        let minusBalance = 0;
        if (option === 'minimum') {
            minusBalance = balance -  minimumPayment;
        } else {
            minusBalance = balance -  current;
        }

        await Account.updateBalance(minusBalance);
    }

    } catch (error) {
        console.log('There was an error processing the transaction', error);
  }
});
