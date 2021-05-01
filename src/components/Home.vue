<template>
  <div class="container">
    <div class="phone">
      <div class="screen">
        <div class="top-screen">
          <div class="from-currency">
            <div class="currency">
              <img
                src="../assets/euros.svg"
                alt="euro currency sign"
                class="currency-symbol"
              />
              <span class="currency-name">Euros</span>
            </div>
            <div class="amount">{{ displayedAmount }}</div>
          </div>
        </div>
        <div class="bottom-screen">
          <div class="to-currency">
            <div class="currency">
              <img
                src="../assets/dollar.svg"
                alt="euro currency sign"
                class="currency-symbol"
              />
              <span class="currency-name">US Dollar</span>
            </div>
            <div class="amount">{{ convertedCurrencyAmount }}</div>
          </div>
          <div class="keypad">
            <span
              v-for="(digit, index) in digits"
              :key="digit"
              class="number"
              @click="updateAmount(index)"
              ref="digits"
            >
              {{ digit }}
            </span>
          </div>
        </div>
      </div>
      <div class="button"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      digits: [1, 2, 3, 4, 5, 6, 7, 8, 9, "X", 0, "II"],
      amount: [],
      formattedAmount: "",
      rates: {},
      convertedAmount: 0,
    };
  },
  methods: {
    updateAmount(index) {
      if (this.$refs.digits[index].innerText === "X") {
        this.amount = ["0"];
        this.convertedAmount = 0;
        return;
      }
      if (this.amount[0] === "0") {
        const amountTobeDisplayed = this.$refs.digits[index].innerText;
        this.amount = [amountTobeDisplayed];
        return;
      }
      const amountTobeDisplayed = this.$refs.digits[index].innerText;
      this.amount = [...this.amount, amountTobeDisplayed];
    },
    insertDecimal(num) {
      return (num / 100).toFixed(2);
    },
    convertCurrency(amountToConvert) {
      const amountInUSD = amountToConvert * this.rates.USD;
      console.log("amountInUSD: ", amountInUSD.toFixed(2));
      this.convertedAmount = amountInUSD;
    },
  },
  computed: {
    displayedAmount() {
      const displayedAmount = this.amount.join("");
      const formattedAmount = this.insertDecimal(displayedAmount);
      return formattedAmount;
    },
    convertedCurrencyAmount() {
      return this.convertedAmount.toFixed(2);
    },
  },
  created: async function () {
    this.rates = await fetch(
      "http://data.fixer.io/api/latest?access_key=f2d07c7fe34070f0f56a0747848e966b&symbols=USD,GBP,CNY,INR"
    )
      .then((response) => response.json())
      .then((data) => data.rates);
  },
  watch: {
    amount: {
      handler: function (newAmount, oldAmount) {
        const amount = newAmount.join("");
        const formattedAmount = (amount / 100).toFixed(2);
        this.convertCurrency(formattedAmount);
        console.log(
          "newAmount: ",
          newAmount,
          "oldAmount: ",
          oldAmount,
          "amount: ",
          formattedAmount,
          "rates: ",
          this.rates
        );
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(238, 238, 237);
  height: 100vh;
  width: 100vw;
}

.phone {
  background-color: rgb(255, 255, 255);
  border: grey;
  border-radius: 25px;
  box-shadow: rgba(110, 110, 110, 0.8) 10px 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.screen {
  width: 18vw;
  height: 440px;
  background: rgb(18, 194, 218);
  margin-top: 4rem;
  margin-right: 1rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
}
.button {
  color: red;
  height: 36px;
  width: 36px;
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: rgb(250, 250, 250);
  /* border: 1px solid green; */
  border-radius: 25px;
  box-shadow: rgba(65, 65, 65, 0.8) 0.5px 0.5px inset;
}
.button-wrappper {
  background: blue;
  height: 10px;
  width: 10px;
}
.top-screen {
  margin-top: 4rem;
  margin-bottom: 1rem;
}

.bottom-screen {
  background-color: rgb(145, 231, 203);
  height: 300px;
  padding-top: 2rem;
}

.keypad {
  display: grid;
  grid-template-columns: 70px 70px 70px;
  grid-template-rows: 20px 20px 20px 20px;
  column-gap: 5px;
  row-gap: 25px;
  margin-left: 8px;
  margin-right: 1px;
  margin-top: 58px;
  justify-items: center;
  align-items: center;
}
.number {
  background-color: rgb(243, 248, 248);
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
  cursor: pointer;
}

.from-currency {
  display: flex;
  justify-content: space-around;
}

.to-currency {
  display: flex;
  justify-content: space-around;
}
.currency {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: 400;
  color: rgb(255, 255, 255);
  font-weight: 500;
  opacity: 0.7;
  padding-top: 6px;
}

.currency-symbol {
  color: white;
  width: 16px;
  height: 16px;
  margin-bottom: 4px;
}
.currency-name {
  text-transform: uppercase;
}
.amount {
  font-size: 36px;
  font-weight: 500;
  color: white;
}
</style>
