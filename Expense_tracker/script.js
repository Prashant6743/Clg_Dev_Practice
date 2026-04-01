// ===== FILL THE GAPS - STUDENT CODE HERE =====

// Array to hold all transactions in memory
var transactions = [];

// 1. Load transactions from localStorage on page load
function loadTransactions() {
  // Get transactions from localStorage or use empty array
  transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  // Update UI with loaded transactions
  renderTransactions(transactions);
  // Update the totals display
  updateTotals();
}

// 2. Add new transaction
function addTransaction() {
  // Get form values
  var description = document.getElementById('description').value;
  var amount = parseFloat(document.getElementById('amount').value);
  var type = document.getElementById('type').value;

  // Validate inputs
  if (description === '') {
    alert('Please enter a description.');
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount greater than 0.');
    return;
  }

  // Create transaction object with unique id and current date
  var transaction = {
    id: Date.now(),
    description: description,
    amount: amount,
    type: type,
    date: new Date().toLocaleDateString()
  };

  // Add to transactions array
  transactions.push(transaction);

  // Save updated array to localStorage
  localStorage.setItem('transactions', JSON.stringify(transactions));

  // Update UI and totals
  renderTransactions(transactions);
  updateTotals();

  // Clear form inputs
  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';
}

// 3. Delete transaction
function deleteTransaction(id) {
  // Remove the transaction with the matching id
  transactions = transactions.filter(function(t) {
    return t.id !== id;
  });

  // Save updated array to localStorage
  localStorage.setItem('transactions', JSON.stringify(transactions));

  // Update UI and totals
  renderTransactions(transactions);
  updateTotals();
}

// 4. Update summary totals
function updateTotals() {
  var totalIncome = 0;
  var totalExpense = 0;

  // Loop through all transactions and sum income and expense
  for (var i = 0; i < transactions.length; i++) {
    if (transactions[i].type === 'income') {
      totalIncome += transactions[i].amount;
    } else {
      totalExpense += transactions[i].amount;
    }
  }

  var balance = totalIncome - totalExpense;

  // Update DOM elements
  document.getElementById('totalIncome').textContent = 'Rs' + totalIncome.toFixed(2);
  document.getElementById('totalExpense').textContent = 'Rs' + totalExpense.toFixed(2);
  document.getElementById('balance').textContent = 'Rs' + balance.toFixed(2);
  document.getElementById('netBalance').textContent = 'Rs' + balance.toFixed(2);
}

// 5. Render transactions list
function renderTransactions(transactions) {
  var list = document.getElementById('transactionsList');

  // Clear existing list
  list.innerHTML = '';

  // Show message if no transactions
  if (transactions.length === 0) {
    list.innerHTML = '<p style="text-align:center; color:#888;">No transactions yet.</p>';
    return;
  }

  // Loop through transactions and create HTML for each
  for (var i = 0; i < transactions.length; i++) {
    var t = transactions[i];

    var div = document.createElement('div');
    div.className = 'transaction-item ' + t.type;  // adds 'income' or 'expense' class

    div.innerHTML =
      '<span class="t-desc">' + t.description + '</span>' +
      '<span class="t-date">' + t.date + '</span>' +
      '<span class="t-amount">' + (t.type === 'income' ? '+' : '-') + ' Rs' + t.amount.toFixed(2) + '</span>' +
      '<button onclick="deleteTransaction(' + t.id + ')">Delete</button>';

    // Append each transaction item to the list
    list.appendChild(div);
  }
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
  // Load saved transactions when page is ready
  loadTransactions();

  // Allow pressing Enter in the amount field to add a transaction
  document.getElementById('amount').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      addTransaction();
    }
  });

  // Allow pressing Enter in the description field too
  document.getElementById('description').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      addTransaction();
    }
  });
});
