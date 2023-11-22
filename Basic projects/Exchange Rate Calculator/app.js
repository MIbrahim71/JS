const currencyEl_one = document.getElementById("currency-one");
const amount1 = document.querySelector(".amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amount2 = document.querySelector(".amount-two");
const swap = document.getElementById("swap-btn");
const rateEl = document.getElementById("swap-p");

function calculate() {
  const currency1 = currencyEl_one.value;
  const currency2 = currencyEl_two.value;

  fetch("https://open.exchangerate-api.com/v6/latest")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      const rate = data.rates[currency2] / data.rates[currency1];
      // console.log(rate);
      rateEl.innerText = `1 ${currency1} = ${rate.toFixed(3)} ${currency2}`;
      amount2.value = (amount1.value * rate).toFixed(2);
    });
}

currencyEl_one.addEventListener("change", calculate);
currencyEl_two.addEventListener("change", calculate);
amount1.addEventListener("input", calculate);
amount2.addEventListener("input", calculate);

calculate();
