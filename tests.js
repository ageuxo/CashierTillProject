// import { processClick } from "./script";

const testStates = [
  /* {
    price: 20,
    cash: 10,
    cid: [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]],
    result: "Status: OPEN TEN: $10"
  }, */
  {
    price: 11.95,
    cash: 11.95,
    cid: [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]],
    result: "No change due - customer paid with exact cash"
  },
  {
    price: 19.5,
    cash: 20,
    cid: [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]],
    result: "Status: OPEN QUARTER: $0.5"
  },
  {
    price: 3.26,
    cash: 100,
    cid: [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]],
    result: "Status: OPEN TWENTY: $60 TEN: $20 FIVE: $15 ONE: $1 QUARTER: $0.5 DIME: $0.2 PENNY: $0.04"
  },
  {
    price: 1,
    cash: 2,
    cid: [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]],
    result: "Status: OPEN ONE: $1"
  },
  {
    price: 19.5,
    cash: 20,
    cid: [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]],
    result: "Status: INSUFFICIENT_FUNDS"
  },
  {
    price: 20.25,
    cash: 21,
    cid: [["PENNY", 0.4], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]],
    result: "Status: INSUFFICIENT_FUNDS"
  },
  {
    price: 19.5,
    cash: 190,
    cid: [["PENNY", 0.1], ["NICKEL", 0.05], ["DIME", 0.1], ["QUARTER", 0.25], ["ONE", 5], ["FIVE", 5], ["TEN", 0], ["TWENTY", 60], ["ONE HUNDRED", 100]],
    result: "Status: CLOSED HUNDRED: $100 TWENTY: $60 FIVE: $5 ONE: $5 QUARTER: $0.25 DIME: $0.1 NICKEL: $0.05 PENNY: $0.1"
  }
]

const parse = (result, desired)=>{
  const strResult = String(result);
  if (strResult) {
    if (strResult == desired) {
      return "EXACT_MATCH";
    } else if (strResult.includes(desired)) {
      return "INCLUDED_MATCH: Leftovers: " + strResult.replace(desired, "-matched-");
    } else if (strResult.toUpperCase().includes(desired.toUpperCase())) {
      return "CAPS_FAIL";
    }
  }
  return "FAIL";
}

const testBtn = document.getElementById("test-btn");

testBtn.addEventListener("click", ( ()=>{
  for (let i = 0;i<testStates.length;i++) {
    const test = testStates[i];
    const result = processClick(test.cash, test.price, test.cid, true);
    console.log(`TEST: ${i} RESULT: ${parse(result, test.result)}.`);
    console.log(`-->  Cash:"${test.cash}" Price: "${test.price}" CiD:"${test.cid}"`);
    console.log(`----> GOT: "${result}"`);
    console.log(`-> WANTED: "${test.result}"`);
    console.log("");
  }
}))