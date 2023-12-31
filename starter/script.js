'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// DISPLAY BANK ACTIVITY

const displayMovements = function (movements, sort = false) {
  //CLEAR CONTAINER
  containerMovements.innerHTML = '';

  // When sort is true, slice then sort (create copy then sort)
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    // UPDATE CONTAINER
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
  <div class="movements__row">
  <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
  <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
//

// DISPLAY BALANCE

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance} €`;
};
//

// DISPLAY SUMMARY IN & OUT
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  // console.log(incomes);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  // console.log(out);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  // console.log(interest);
  labelSumInterest.textContent = `${interest}€`;
};

//
// COMPUTING USERNAMES

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  }); // produces side effects as there is no return
};
createUsernames(accounts);
// console.log(accounts);

const updateUI = acc =>
  // Display movements
  {
    displayMovements(acc.movements);

    // Display balance
    calcDisplayBalance(acc);

    // Display summary
    calcDisplaySummary(acc);
  };

//
// EVENT HANDLER FOR LOGIN

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // prevent form from submitting

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // if current account exists & pin is correct - LOGIN
    // Display UI & welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // Update UI
    updateUI(currentAccount);

    console.log('LOGIN');
  }
});
//
// TRANSFERS

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // Clear input field & defocus
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    console.log('Transfer valid');
    // Do transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
  }
});
//

// REQUEST LOAN
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  // Any deposits are greater than 10% of loan request, then accept
  if (
    amount > 0 &&
    amount < 5000 &&
    currentAccount.movements.some(mov => mov >= amount * 0.1)
  ) {
    // Update movements
    currentAccount.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
    // Clear input field
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
  } else {
    alert('Request cannot be accepted at this time');
  }
});

// CLOSE ACCOUNT

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    // Check if username & pin match currentAcount details
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    console.log('Closed');

    // Find index of username and splice from accounts array (delete)
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
  inputTransferAmount.blur();
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  // Every click event, sorted alternates between true & false
  sorted = !sorted; // allows to go back to normal sort
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// currencies.forEach((value, key, map) => {
//   console.log(key, value);
// });

// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);

// currenciesUnique.forEach(function (value, key, map) {
//   console.log(key, value); // USD: USD
//   console.log(value); // USD
// });

/////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd'];

// console.log(arr.slice(0));

// console.log(arr[0]);

// // Getting last element
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1));

//
//

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euToUsd = 1.1;

const usd = movements.map(a => Math.floor(a * euToUsd));

// console.log(usd);

const movementDescriptions = movements.map(
  (mov, i, arr) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )} `
);

// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// }

// movements.forEach(function (movement, index, array) {
//   if (movement > 0) {
//     console.log(`${index}: You deposited ${movement}`);
//   } else {
//     console.log(`${index}: You withdrew ${Math.abs(movement)}`);
//   }
// });

// const deposits = movements.filter(mov => mov > 0);

// console.log(movements);
// console.log(deposits);

// const withdrawals = movements.filter(mov => mov <= 0);

// console.log(withdrawals);

// Reduce
// console.log(movements); // [200, 450, -400, 3000, -650, -130, 70, 1300]

// const balance = movements.reduce(
//   (accumulator, current) => accumulator + current,
//   0
// );

// console.log(balance); // 3840

// let balance1 = 0;
// for (const mov of movements) balance1 += mov;
// console.log(balance1); // 3840

// Max value of movements array

const max = movements.reduce(
  (acc, mov) => (acc > mov ? acc : mov),
  movements[0]
);
// console.log(max); // 3000

// Chaining

const totalDepositUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euToUsd)
  .reduce((acc, mov) => Math.round(acc + mov), 0);

// console.log(totalDepositUSD);

// Find

const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// Some & every method

// const anyDeposits = movements.some(mov => mov < 100);
// console.log(anyDeposits);

// const everyDeposits = account4.movements.every(mov => mov > 0);
// console.log(everyDeposits);

// const deposit = mov => mov > 0;

// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// flat , flatMap
const arr1 = [[1, 2, 3], [4, 5, 6], 7, 8];

const flatArr = arr1.flat();

// console.log(flatArr);

// const accountMovements = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, curr) => acc + curr, 0);
// console.log(accountMovements);

// Sorting arrays

const owners = ['a', 'r', 'f', 'd', 'z', 'q'];

// console.log(owners.sort());
// console.log(owners);

// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });

movements.sort((a, b) => a - b);
// if a is less than b: the result is negative, placing a before b
// if a is more than b: the result is positive, placing a after b

// console.log(movements);

// Creating and filling arrays: fill(), from()

const x = new Array(7);

// console.log(x); // [] (7) - can only call fill() method

// // x.fill(1); // mutates original array
// x.fill(1, 3, 5); // works like splice, put 1s from index 3 - 4
// console.log(x); // [3: 1, 4: 1]

// from

// const y = Array.from({ length: 5 }, () => 1);
// console.log(y); // [1, 1, 1, 1, 1]

// const z = Array.from({ length: 5 }, (_, i) => i + 1);
// console.log(z); // [1, 2, 3, 4, 5]

// const diceRoll = Array.from({ length: 12 }, () => Math.ceil(Math.random() * 6));
// console.log(diceRoll);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  const balance = movementsUI.reduce((acc, i) => acc + i, 0);
  console.log(balance);
});

// Array Methods practice

// 1
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov);
// console.log(bankDepositSum);

// 2
// const numDeposits1000 = accounts
//   .flatMap(mov => mov.movements)
//   .filter(mov => mov > 1000).length;
// console.log(numDeposits1000);

const numDeposits1000 = accounts
  .flatMap(mov => mov.movements)
  .reduce((acc, cur) => (cur > 1000 ? ++acc : acc), 0); // prefixed ++
// console.log(numDeposits1000);

// 3

const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sum, cur) => {
      // cur > 0 ? (sum.deposits += cur) : (sum.withdrawals += cur);
      sum[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sum;
    },
    { deposits: 0, withdrawals: 0 }
  );

// console.log(deposits, withdrawals);

// 4
const convertTitle = title => {
  const capitalise = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    ) // if exceptions includes word, return word. If not, capitalise the first letter.
    .join(' ');
  console.log(capitalise(titleCase));
};

convertTitle('this is a nice title');
convertTitle('this is a LONG title but not long');
convertTitle('an other title with EXAMPLE');
