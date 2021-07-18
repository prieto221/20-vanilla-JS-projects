const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];
let totalWealth = 0;

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showOnlyMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);

// double money
function doubleMoney() {
  data.forEach((x) => {
    x.money = x.money * 2;
    updateDom();
  });
}

// Sort users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDom();
}

// Show only millionaires
function showOnlyMillionaires() {
  data = data.filter((user) => user.money > 1000000);
  updateDom();
}

// calculate wealth
function calculateWealth() {
  totalWealth = 0;
  data.forEach((x) => {
    totalWealth = totalWealth + x.money;
  });
  updateDom();
  x = document.getElementsByClassName('total');
  x = x[0];
  x.style.color = 'purple';
}

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDom();
}

// Update DOM
function updateDom(providedData = data) {
  // Clear main div
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2><h4 class="total">*Total Wealth <strong>${formatMoney(
    totalWealth
  )}</strong></h4>`;

  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money
function formatMoney(x) {
  return '$' + x.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
