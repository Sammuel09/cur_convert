<template>
  <div class="screen">
    <div class="top-screen">
      <div class="from-currency" @click="switchCurrency(options.from)">
        <div class="currency">
          <img
            :src="fromCurrency.cur.icon || fromAmount.icon"
            alt="dollar currency sign"
            class="currency-symbol"
          />
          <span class="currency-name">{{
            fromCurrency.cur.name || fromAmount.name
          }}</span>
        </div>
        <div class="amount">{{ fromCurrency.amt || displayedAmount }}</div>
      </div>
    </div>
    <div class="bottom-screen">
      <div class="to-currency" @click="switchCurrency(options.to)">
        <div class="currency">
          <img
            :src="toCurrency.cur.icon"
            alt="euro currency sign"
            class="currency-symbol"
          />
          <span class="currency-name">{{
            toCurrency.cur.name || initialToCurrency.cur.name
          }}</span>
        </div>
        <div class="amount">
          {{ toCurrency.amt || initialToCurrency.cur.amt }}
        </div>
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
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MainScreen",
  data() {
    return {
      digits: [1, 2, 3, 4, 5, 6, 7, 8, 9, "X", 0, "II"],
      amount: [],
      formattedAmount: "",
      convertedAmount: 0.0,
      rates: {},
      options: {
        from: "from",
        to: "to",
      },
      currencyOptions: [
        {
          name: "US Dollar",
          icon: require("@/assets/dollar.svg"),
          sym: "USD",
        },
        {
          name: "British Pound",
          icon: require("@/assets/pounds.svg"),
          sym: "GBP",
        },
        {
          name: "Euro",
          icon: require("@/assets/euros.svg"),
          sym: "EUR",
        },
        {
          name: "Chinese Yuan",
          icon: require("@/assets/yuan.svg"),
          sym: "CNY",
        },
        {
          name: "Indian Rupee",
          icon: require("@/assets/rupee.svg"),
          sym: "INR",
        },
      ],
      fromAmount: {},
      toAmount: {},
      amountToChange: 0,
    };
  },
  methods: {
    updateAmount(index) {
      if (this.$refs.digits[index].innerText === "X") {
        this.amount = ["0"];
        this.convertedAmount = 0;
        this.$store.commit("updateFromCurrency", {
          cur: this.fromCurrency.cur,
          amt: 0,
        });
        return;
      }
      if (this.$refs.digits[index].innerText === "II") {
        this.$store.commit("updateFromCurrencySymbolName", {
          cur: this.toAmount,
        });
        this.$store.commit("updateToCurrencySymbolName", {
          cur: this.fromAmount,
        });
        return;
      }
      if (this.amount[0] === "0") {
        const amountTobeDisplayed = this.$refs.digits[index].innerText;
        this.amount = [amountTobeDisplayed];
        return;
      }
      const amountTobeDisplayed = this.$refs.digits[index].innerText;
      this.amount = [...this.amount, amountTobeDisplayed];
      this.$store.commit("updateFromCurrency", {
        cur: this.fromAmount,
        amt: this.displayedAmount,
        show: true,
      });
    },
    insertDecimal(num) {
      return (num / 100).toFixed(2);
    },
    async convertCurrency(amountToConvert, currencySym) {
      console.log("rates 1", this.rates);
      this.convertedAmount =
        amountToConvert * (await this.rates[`${currencySym}`]);
      console.log("rates 1", this.rates);
      console.log("convertedamount", this.convertedAmount);
      this.$store.commit("updateToCurrency", {
        cur: this.toAmount,
        amt: this.convertedAmount.toFixed(2),
      });
    },
    switchCurrency(id) {
      this.$router.push({ path: "switch-currency" });
      if (id === this.options.from) {
        this.$store.commit("changeFromCurrency", true);
        this.$store.commit("changeToCurrency", false);
        this.$store.commit("showFromCurrency");
      } else {
        this.$store.commit("changeToCurrency", true);
        this.$store.commit("changeFromCurrency", false);
        this.$store.commit("showToCurrency");
      }
    },
  },
  computed: {
    displayedAmount() {
      const displayedAmount = this.amount.join("");
      const formattedAmount = this.insertDecimal(displayedAmount);
      return formattedAmount;
    },
    ...mapState({
      fromCurrency: (state) => state.fromCurrency,
      toCurrency: (state) => state.toCurrency,
      initialToCurrency: (state) => state.initialToCurrency,
    }),
  },
  async mounted() {
    this.rates = await fetch(
      `https://data.fixer.io/api/latest?access_key=0e20e3bf1f7502d627af6bb948f5e7cc&base=${this.fromCurrency.cur.sym}&symbols=EUR,GBP,CNY,INR`
    )
      .then((response) => response.json())
      .then((data) => data.rates);
    console.log("rates3", this.rates);
    this.fromAmount = this.currencyOptions[0];
    this.toAmount = this.currencyOptions[1];
    console.log("sym", this.toCurrency.cur.sym);
    this.convertCurrency(
      this.fromCurrency.amt,
      this.toCurrency.cur.sym || this.initialToCurrency.sym
    );
  },
  watch: {
    amount: {
      handler: function (newAmount) {
        const amount = newAmount.join("");
        const formattedAmount = (amount / 100).toFixed(2);
        this.convertCurrency(
          formattedAmount,
          this.toAmount.sym || this.initialToCurrency.sym
        );
      },
    },
  },
};
</script>

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
  cursor: pointer;
}

.to-currency {
  display: flex;
  justify-content: space-around;
  cursor: pointer;
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

/* .slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
} */
</style>
