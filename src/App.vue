<template>
  <div
    id="drivingschool"
    :style="{
      '--bg-primary': colors.backgroundPrimary,
      '--bg-secondary': colors.backgroundSecondary,
      '--color-primary': colors.colorPrimary,
      '--color-secondary': colors.colorSecondary,
      '--color-correct': colors.colorCorrect,
      '--color-false': colors.colorFalse,
      '--text-primary': colors.textPrimary,
      '--text-secondary': colors.textSecondary
    }"
  >
    <Tablet></Tablet>
  </div>
</template>

<script>
import Tablet from "./components/Tablet.vue";
export default {
  name: "App",
  data() {
    return {
      colors: {
        backgroundPrimary: "gray",
        backgroundSecondary: "darkgray",
        colorPrimary: "lightgreen",
        colorSecondary: "green",
        colorCorrect: "darkgreen",
        colorFalse: "darkred",
        textPrimary: "white",
        textSecondary: "whitesmoke"
      }
    };
  },
  components: {
    Tablet
  },
  mounted() {
    fetch(`${this.$store.getters.url}/config/colors`, {
      method: "post"
    })
      .then(res => res.json())
      .then(data => (this.colors = data));
  }
};
</script>

<style lang="scss">
#drivingschool {
  --bg-primary: gray;
  --bg-secondary: darkgray;
  --color-primary: lightgreen;
  --color-secondary: green;
  --color-correct: darkgreen;
  --color-false: darkred;
  --text-primary: white;
  --text-secondary: whitesmoke;
}

body,
html {
  //DEV
  // background-color: #333333;

  margin: 0;
  padding: 0;
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
}

* {
  box-sizing: border-box;
  user-select: none;
}
</style>
