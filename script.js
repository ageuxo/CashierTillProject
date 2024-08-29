let price = 19.5;
let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];

const currency = [
  ['PENNY', 0.01, 2],
  ['NICKEL', 0.05, 2],
  ['DIME', 0.1, 1],
  ['QUARTER', 0.25, 2],
  ['ONE', 1, 0],
  ['FIVE', 5, 0],
  ['TEN', 10, 0],
  ['TWENTY', 20, 0],
  ['HUNDRED', 100, 0]
];
const orderedCurrency = currency.reverse();

const changeStates = [
  {
    name: "not_enough_cid",
    result: "Status: INSUFFICIENT_FUNDS"
  },
  {
    name: "exact_cid",
    result: "Status: CLOSED"
  },
  {
    name: "more_cid",
    result: "Status: OPEN"
  },
  {
    name: "no_change_due",
    result: "No change due - customer paid with exact cash"
  }
];

const cashInput = document.getElementById("cash");
const changeEl = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

const notEnoughMsg = "Customer does not have enough money to purchase the item";
const noChangeDueMsg = "No change due - customer paid with exact cash";

var processClick = (cash, price, cid, testing = false) => {
  const changeDue = getChange(cash, price)
  if (changeDue == null) {
    return;
  }
  const drawerValue = cid.reduce((acc, entry)=>acc+entry[1], 0)
  //console.log(`change: ${changeDue}, drawerValue: ${drawerValue.toFixed(2)}, CiD: [${cid}]`)
  if (changeDue == 0) {
    updateResult(changeStates[3])
  } else if (drawerValue < changeDue){
    updateResult(changeStates[0]);
  } else{
    if (drawerValue == changeDue) {
      updateResult(changeStates[1]);
    } else {
      updateResult(changeStates[2]);
    }
    //calculate bills n coins
    const toReturn = calcToReturn(changeDue, cid);
    if (toReturn) {
      toReturn.forEach((e)=>{
        changeEl.innerText += e;
      })
    }
  }
  if (testing) {
    return changeEl.innerText;
  }
}

const updateResult = (state)=>{
  changeEl.innerText = state.result;
}

const getChange = (cash, price)=>{
  if (cash < price) {
    alert(notEnoughMsg);
    return;
  } else {
    return cash - price;
  }
}

const calcToReturn = (changeDue, cid) => {
  const orderedDrawer = [...cid].reverse(); // Reverse a copy of cid to avoid modifying the original array
  const toReturn = [];
  let remainingChange = changeDue;

  for (let index = 0; index < orderedCurrency.length; index++) {
    const [currencyName, currencyValue, decimals] = orderedCurrency[index];
    const [drawerCurrencyName, drawerAmount] = orderedDrawer[index];
    let amountFromDrawer = 0;

    if (currencyValue <= remainingChange && drawerAmount > 0) {
      const maxCurrencyCount = Math.floor(drawerAmount / currencyValue);
      const requiredCurrencyCount = Math.floor(remainingChange / currencyValue);
      const currencyCount = Math.min(maxCurrencyCount, requiredCurrencyCount);

      amountFromDrawer = currencyCount * currencyValue;
      remainingChange = (remainingChange - amountFromDrawer).toFixed(2); // To avoid floating point precision issues

      if (amountFromDrawer > 0) {
        toReturn.push(` ${currencyName}: $${parseFloat(amountFromDrawer.toFixed(decimals))}`);
      }
    }
  }

  // If we can't provide the exact change, return an error state
  if (remainingChange > 0) {
    updateResult(changeStates[0]);
    return null;
  }

  return toReturn;
};

purchaseBtn.addEventListener("click", ()=>{
  processClick(cashInput.value, price, cid)
});