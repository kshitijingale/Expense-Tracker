const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactionsData = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function updateBalance() {
    const transactions = transactionsData.map(transaction => transaction.amount);

    // Balance
    const total = transactions.reduce((acc, curr) => (acc += curr), 0).toFixed(2);

    // Income 
    const kamayi = transactions.filter(item => item > 0).reduce((acc, curr) => (acc += curr), 0).toFixed(2);

    // Expense
    const kharche = (transactions.filter(item => item < 0).reduce((acc, curr) => (acc += curr), 0) * -1).toFixed(2);

    balance.innerHTML = `$${total}`;
    income.innerHTML = `$${kamayi}`;
    expense.innerHTML = `$${kharche}`;
}

function addTransactionDOM(transactionObj) {
    if (transactionObj.amount > 0) {
        list.innerHTML += `
        <li class="money-plus">
            ${transactionObj.text} <span id="li-amount">+${transactionObj.amount}</span>
            <button class="remove" onclick=deleteTransaction(${transactionObj.id});>x</button>
          </li>
        `
    }
    else {
        list.innerHTML += `
        <li class="money-minus">
            ${transactionObj.text} <span id="li-amount">${transactionObj.amount}</span>
            <button class="remove" onclick=deleteTransaction(${transactionObj.id});>x</button>
          </li>
        `
    }
}

function deleteTransaction(id) {
    transactionsData = transactionsData.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

function init() {
    list.innerHTML = '';
    transactionsData.forEach((transaction) => addTransactionDOM(transaction));
    updateBalance();
}

init();

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactionsData));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (text.value === '' || amount.value === '') {
        alert('Enter a text and amount');
    }
    else {
        const transaction = {
            id: Math.floor(Math.random() * 10000000),
            text: text.value,
            amount: +amount.value
        }
        addTransactionDOM(transaction);
        transactionsData.push(transaction);
        updateLocalStorage();

        updateBalance();
        text.value = '';
        amount.value = '';
    }
})