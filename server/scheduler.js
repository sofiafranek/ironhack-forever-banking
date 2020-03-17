/** TRYING NODE SCHEDULE **/
const schedule = require('node-schedule');
const Transaction = require('./models/transaction');
const Account = require('./models/account');


function getAccount(idAccount) {
    return Account.findById(idAccount);
}

function updateAccount(idAccount, balance) {
    return Account.findByIdAndUpdate({ _id: idAccount }, { balance: balance });
}

async function addTransaction(accountIDFrom, accountIDTo) {
    const accountFrom = await getAccount(accountIDFrom);
    const accountTo = await getAccount(accountIDTo);
    //continue
}

module.exports  = schedule.scheduleJob('01 * * * *', () => {

    Transaction.find({status : 'Pending'})
    .then((transactions) => {
        
        transactions.map(transaction => {
            const currentDate = new Date();
            const day = transaction.dateTransaction.getDate() - 1;
            const month = transaction.dateTransaction.getMonth() + 1;
            const year = transaction.dateTransaction.getFullYear();
            const currentDay = currentDate.getDate();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = currentDate.getFullYear();
            //if(day === currentDay && month === currentMonth && year === currentYear){


                const accountIDFrom = transaction.accountIDFrom;
                const accountIDTo = transaction.accountIDTo;
                const amount = transaction.totalAmount;

                Account.findById(accountIDFrom)
                .then(accountFrom => {
                  const balanceFrom = accountFrom.balance;
                  Account.findById(accountIDTo)
                    .then(accountTo => {
                      const balanceTo = accountTo.balance;
            
                      const minusBalance = balanceFrom - Number(amount);
                      const addBalance = Number(balanceTo) + Number(amount);
            
                      if (minusBalance > 0) {
                        Transaction.findOneAndUpdate({
                          _id : transaction._id
                        },
                        {
                            'status' : 'Executed'
                        }
                        ).then(transaction => {

                            Account.findByIdAndUpdate({ _id: accountIDFrom }, { balance: minusBalance })
                              .then((account) => {
                                console.log(account.balance);
                              })
                              .catch(error => {
                                console.log(error);
                              });
            
                            Account.findByIdAndUpdate({ _id: accountIDTo }, { balance: addBalance })
                              .then()
                              .catch(error => {
                                console.log(error);
                              });
                        })
                          .catch(error => {
                            console.log(error);
                        });
                      }
                      else {
                        Transaction.findOneAndUpdate({
                            _id : transaction._id
                          },
                          {
                              'status' : 'Failed'
                          })
                          .then()
                          .catch(error => {
                            console.log(error);
                          });
                      }
                    })
                    .catch(error => {
                      console.log(error);
                    });
                })
                .catch(error => {
                  console.log(error);
                });
            }
        //}
        );
    })
    .catch((error) => {
        console.log(error);
    });
  console.log('The answer to life, the universe, and everything!');
});
