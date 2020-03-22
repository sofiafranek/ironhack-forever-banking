/** TRYING NODE SCHEDULE **/
const schedule = require('node-schedule');
const UserAccount = require('./database/models/userAccount');
const Account = require('./database/models/account');
const Credit = require('./database/models/credit');

module.exports = schedule.scheduleJob('53 * * * *', async () => {
  try {
    const currentDate = new Date();
    const day = currentDate.getDate();
    console.log(day);
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    console.log(month);

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
        const balance = account.balance;
        const datePayment = currentDate;
        let minusBalance = 0, debt = 0;

        // WE HAVE TO CREATE OUR BANK ACCOUNT AND TRANSFER THE CREDIT TO OUR ACCOUNT
        //f (current !== limit) {
            if (option === 'minimum') {
                debt = current - minimumPayment;
                console.log(debt);
                console.log(balance, "BALANCE");
                minusBalance = balance - (minimumPayment + debt * apr);
                console.log(minimumPayment, "BALANCE");
                console.log(apr, "apr");
                console.log(minusBalance);
            } else {
                minusBalance = balance - current;
            }

            await Account.updateBalance(accountID, minusBalance);
            if (month === 12) {
                datePayment.setMonth(month + 1);
                datePayment.setFullYear(year + 1);
            } else {
                datePayment.setMonth(month + 1);
            }

        //}

        await Credit.updateCredit(_id, datePayment, limit, debt);
    }

    } catch (error) {
        console.log('There was an error processing the transaction', error);
  }
});
