document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDispaly = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmount = calculateTotal();

  renderExpenses();
  updateTotal();

  expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
      };

      expenses.push(newExpense);
      saveExpensesTolocal();
      renderExpenses();
      updateTotal();

      // clear input
      expenseNameInput.value = "";
      expenseAmountInput.value = "";
    }
  });

  // display the expense to the list
  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `${expense.name} - ₹${expense.amount}
      <button data-id="${expense.id}">Delete</button>
      `;

      expenseList.appendChild(li);
    });
  }

  // calculate total
  function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  // save expense to local storage
  function saveExpensesTolocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  // update total amount
  function updateTotal() {
    totalAmount = calculateTotal();
    totalAmountDispaly.innerText = `${totalAmount.toFixed(2)}`;
  }

  expenseList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      const expenseId = parseInt(event.target.getAttribute('data-id'));
      expenses = expenses.filter(expense => expense.id !== expenseId);
      saveExpensesTolocal();
      updateTotal();
      renderExpenses();
    }
  });
});
