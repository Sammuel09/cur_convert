<template>
  <div class="screen">
    <div class="top-screen">
      <div class="cancel-area">
        <div class="cancel" @click="goToHome">
          <img
            src="../assets/cancel.svg"
            alt="Cancel Icon"
            class="cancel-icon"
          />
        </div>
      </div>
      <div class="from-currency">
        <div class="currency">
          <img
            v-if="fromCurrency.show"
            :src="fromCurrency.cur.icon"
            alt="dollar currency sign"
            class="currency-symbol"
          />
          <img
            v-else
            :src="toCurrency.cur.icon"
            alt="dollar currency sign"
            class="currency-symbol"
          />
          <span v-if="fromCurrency.show" class="currency-name">{{
            fromCurrency.cur.name
          }}</span>
          <span v-else class="currency-name">{{ toCurrency.cur.name }}</span>
        </div>
        <div v-if="fromCurrency.show" class="amount">
          {{ fromCurrency.amt }}
        </div>
        <div v-else class="amount">{{ toCurrency.amt }}</div>
      </div>
    </div>
    <div class="bottom-screen">
      <div
        v-for="option in currencyOptions"
        :key="option.sym"
        class="currency-options"
      >
        <div class="currency-option" @click="selectCurrency(option)">
          <div class="currency-name-sign">
            <img
              :src="option.icon"
              alt="dollar currency sign"
              class="currency-sign"
            />
            <span class="cur-name">{{ option.name }}</span>
          </div>
          <img
            v-if="option.sym === clickedCurrency.sym"
            src="../assets/check.svg"
            alt="Check Icon"
            class="icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SwitchCurrency",
  data() {
    return {
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
      clickedCurrency: {},
    };
  },
  computed: {
    ...mapState({
      fromCurrency: (state) => state.fromCurrency,
      toCurrency: (state) => state.toCurrency,
      changeFromCurrency: (state) => state.changeFromCurrency,
      changeToCurrency: (state) => state.changeToCurrency,
    }),
  },
  methods: {
    goToHome() {
      this.$router.push({ path: "/" });
      console.log("curr:");
    },
    selectCurrency(currencyOption) {
      this.clickedCurrency = this.currencyOptions.find(
        (option) => option.sym === currencyOption.sym
      );
      if (this.changeFromCurrency) {
        this.$store.commit("updateFromCurrencySymbolName", {
          cur: currencyOption,
        });
      }
      if (this.changeToCurrency) {
        this.$store.commit("updateToCurrencySymbolName", {
          cur: currencyOption,
        });
      }
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
  border-radius: 25px;
  box-shadow: rgba(65, 65, 65, 0.8) 0.5px 0.5px inset;
}

.top-screen {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.bottom-screen {
  background-color: rgb(18, 194, 218);
  height: 300px;
  border-top: 1px solid rgb(236, 236, 236);
  opacity: 0.3;
}

.from-currency {
  display: flex;
  justify-content: space-between;
  padding-left: 18px;
  /* padding-right: 16px; */
  cursor: pointer;
}

.to-currency {
  display: flex;
  justify-content: space-around;
}
.currency {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: rgb(255, 255, 255);
  font-weight: 500;
  opacity: 0.7;
  padding-top: 6px;
  align-content: space-between;
}

.currency-symbol {
  color: white;
  width: 16px;
  height: 16px;
  margin-bottom: 4px;
}

.currency-sign {
  color: white;
  width: 16px;
  height: 16px;
}

.currency-name {
  text-transform: uppercase;
  color: #fff;
}

.currency-name-sign {
  display: flex;
}

.cur-name {
  text-transform: uppercase;
  color: #fff;
  font-size: 10px;
  padding-top: 2px;
  padding-left: 12px;
}

.amount {
  font-size: 36px;
  font-weight: 500;
  color: white;
}

.currency-options {
  display: flex;
  flex-direction: column;
}

.currency-option {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: bold;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 16px;
  padding-right: 16px;
  cursor: pointer;
}

.currency-option:hover {
  background-color: rgb(223, 221, 217);
}

.icon {
  color: white;
  width: 14px;
  height: 14px;
}

.cancel-icon {
  width: 12px;
  height: 12px;
  color: white;
  font-weight: bold;
  padding-left: 6px;
  padding-top: 6px;
  /* padding-bottom: 2px; */
}

.cancel {
  background-color: rgb(189, 188, 188);
  opacity: 0.7;
  width: 24px;
  height: 24px;
  cursor: pointer;
  border-radius: 25px;
}

.cancel-area {
  padding-bottom: 3rem;
  padding-left: 12rem;
}
</style>
