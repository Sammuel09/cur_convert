<template>
  <div class="container">
    <div class="phone">
      <router-view />
      <div class="button"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
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
/* .button-wrappper {
  background: blue;
  height: 10px;
  width: 10px;
} */
/* .top-screen {
  margin-top: 4rem;
  margin-bottom: 1rem;
} */

/* .bottom-screen {
  background-color: rgb(145, 231, 203);
  height: 300px;
  padding-top: 2rem;
} */
/*
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
} */
/* .number {
  background-color: rgb(243, 248, 248);
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
  cursor: pointer;
} */

/* .from-currency {
  display: flex;
  justify-content: space-around;
  cursor: pointer;
} */

/* .to-currency {
  display: flex;
  justify-content: space-around;
} */
/* .currency {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: 400;
  color: rgb(255, 255, 255);
  font-weight: 500;
  opacity: 0.7;
  padding-top: 6px;
} */

/* .currency-symbol {
  color: white;
  width: 16px;
  height: 16px;
  margin-bottom: 4px;
} */
/* .currency-name {
  text-transform: uppercase;
} */
/* .amount {
  font-size: 36px;
  font-weight: 500;
  color: white;
} */
</style>
