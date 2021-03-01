<template>
  <Tablet></Tablet>
</template>

<script>
import Tablet from "./components/Tablet.vue";
export default {
  name: "App",
  components: {
    Tablet
  }
};
</script>

<style lang="scss">
body,
html {
  //DEV
  background-color: #333333;

  margin: 0;
  padding: 0;
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
}

* {
  box-sizing: border-box;
}
</style>
