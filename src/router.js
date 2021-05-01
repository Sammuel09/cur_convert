import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./components/Home";
import MainScreen from "./components/MainScreen";
import SwitchCurrency from "./components/SwitchCurrency";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "",
        component: MainScreen,
      },
      {
        path: "switch-currency",
        component: SwitchCurrency,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
