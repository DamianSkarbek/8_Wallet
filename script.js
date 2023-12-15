const $incomeArea = document.querySelector(".income-area");
const $expensesArea = document.querySelector(".expenses-area");
const $availableMoney = document.querySelector(".available-money");
const $addTransactionBtn = document.querySelector(".add-transaction");
const $deleteAllBtn = document.querySelector(".delete-all");
const $deleteBtn = document.querySelector(".delete");
const $lightBtn = document.querySelector(".light");
const $darkBtn = document.querySelector(".dark");

const $root = document.documentElement;

const $transactionPanel = document.querySelector(".add-transaction-panel");
const $inputName = document.querySelector("#name");
const $inputAmount = document.querySelector("#amount");
const $category = document.querySelector("#category");
const $saveBtn = document.querySelector(".save");
const $cancelBtn = document.querySelector(".cancel");

let $incomeArr = [];
let $expensesArr = [];
let ID = 0;
let $categoryIcon;
let $selectCategory;
let $moneyArr = [0];

const checkForm = () => {
  if (
    $inputName.value !== "" &&
    $inputAmount !== "" &&
    $category.value !== "none"
  ) {
    createNewTransaction();
  } else {
    alert("Uzupełnij wszystkie pola!");
  }
};
const clearInputs = () => {
  $inputName.value = "";
  $inputAmount.value = "";
  $category.selectedIndex = 0;
};

const createNewTransaction = () => {
  const newTransaction = document.createElement("div");
  newTransaction.classList.add("transaction");
  newTransaction.setAttribute("id", ID);
  chceckCategory($selectCategory);
  newTransaction.innerHTML = `
    <p class="transaction-name">${$categoryIcon} ${$inputName.value}</p>
    <p class="transaction-amount">${$inputAmount.value}zł 
    <button class="delete" onclick = "deleteTransaction(${ID})"><i class="fa-solid fa-xmark"></i></button></p>`;

  $inputAmount.value > 0
    ? $incomeArea.appendChild(newTransaction) &&
      newTransaction.classList.add("income")
    : $expensesArea.appendChild(newTransaction) &&
      newTransaction.classList.add("expense");
  $moneyArr.push(parseFloat($inputAmount.value));
  countMoney($moneyArr);
  $transactionPanel.style.display = "none";
  ID++;
  clearInputs();
};

const selectCategory = () => {
  $selectCategory = $category.options[$category.selectedIndex].text;
}

const chceckCategory = (transaction) => {
  switch (transaction) {
    case '" + " Przychód':
      $categoryIcon = '<i class="fa-solid fa-money-bill-1-wave"></i>';
      break;
    case '" - " Zakupy':
      $categoryIcon = '<i class="fa-solid fa-cart-shopping"></i>';
      break;
    case '" - " Jedzenie':
      $categoryIcon = '<i class="fa-solid fa-utensils"></i>';
      break;
    case '" - " Kino':
      $categoryIcon = '<i class="fa-solid fa-film"></i>';
      break;
  }
};

const countMoney = money => {
  const newMoney = money.reduce((a, b) => a + b);
  $availableMoney.textContent = `${newMoney}zł`
};

const deleteTransaction = id => {
  const transactionToDelete = document.getElementById(id);
  const transactionAmount = parseFloat(transactionToDelete.childNodes[3].innerText);
  const indexOfTransaction = $moneyArr.indexOf(transactionAmount);

  $moneyArr.splice(indexOfTransaction, 1);
  transactionToDelete.classList.contains('income') 
  ? $incomeArea.removeChild(transactionToDelete) 
  : $expensesArea.removeChild(transactionToDelete); 
  countMoney($moneyArr);
};

const deleteAllTransaction = () =>{
  $incomeArea.innerHTML = '<h3>Przychód:</h3>';
  $expensesArea.innerHTML = '<h3>Wydatki:</h3>';
  $availableMoney.innerHTML = '0zł'
  $moneyArr = [0];
};

$saveBtn.addEventListener("click", checkForm);
$addTransactionBtn.addEventListener("click", () => {
  $transactionPanel.style.display = "flex";
  clearInputs();
});
$cancelBtn.addEventListener("click", () => {
  $transactionPanel.style.display = "none";
  clearInputs();
});
$lightBtn.addEventListener("click", () => {
  $root.style.setProperty("--first-color", "#f9f9f9");
  $root.style.setProperty("--second-color", "#14161f");
  $root.style.setProperty("--border-color", "rgba(0,0,0, .2)");
});
$darkBtn.addEventListener("click", () => {
  $root.style.setProperty("--first-color", "#14161f");
  $root.style.setProperty("--second-color", "#f9f9f9");
  $root.style.setProperty("--border-color", "rgba(255,255,255, .2)");
});
$deleteAllBtn.addEventListener('click', deleteAllTransaction);