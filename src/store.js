import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    fromCurrency: {
      cur: {
        name: "US Dollar",
        icon: require("@/assets/dollar.svg"),
        sym: "USD",
      },
      amt: "0.00",
      show: true,
    },
    toCurrency: {
      cur: {},
      amt: "0.00",
      show: false,
    },
    initialToCurrency: {
      cur: {
        name: "British Pound",
        icon: require("@/assets/pounds.svg"),
        sym: "GBP",
      },
    },
    changeFromCurrency: true,
    changeToCurrency: false,
  },

  mutations: {
    updateFromCurrency(state, payload) {
      state.fromCurrency = payload;
      state.changeFromCurrency = true;
      state.changeToCurrency = false;
    },
    updateToCurrency(state, payload) {
      state.toCurrency = payload;
      state.changeFromCurrency = false;
      state.changeToCurrency = true;
      state.initialToCurrency = {};
    },
    changeFromCurrency(state, payload) {
      state.changeFromCurrency = payload;
      state.initialToCurrency = {};
    },
    changeToCurrency(state, payload) {
      state.changeToCurrency = payload;
      state.initialToCurrency = {};
    },
    showFromCurrency(state) {
      state.fromCurrency.show = true;
      state.toCurrency.show = false;
    },
    showToCurrency(state) {
      state.toCurrency.show = true;
      state.fromCurrency.show = false;
    },
    updateFromCurrencySymbolName(state, payload) {
      console.log(payload);
      state.fromCurrency.cur = payload.cur;
    },
    updateToCurrencySymbolName(state, payload) {
      console.log(payload);
      state.toCurrency.cur = payload.cur;
    },
  },
});

export default store;
