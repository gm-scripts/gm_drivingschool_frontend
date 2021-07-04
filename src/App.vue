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
    <div class="popup" :class="{ hidden: popupHidden }">
      <div class="header">{{ popupTitle }}</div>
      <div class="content-container">
        <div class="buttongrid">
          <div
            class="button"
            v-for="btn in buttons"
            :key="btn.id"
            @click="choose(btn.id, btn.complete)"
            :class="{ complete: btn.complete }"
          >
            {{ btn.label }}
            <span class="pricesign">{{ btn.price }}</span>
          </div>
        </div>
      </div>
    </div>
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
      },
      popupHidden: true,
      popupTitle: "Wähle deine Prüfung",
      buttons: []
    };
  },
  components: {
    Tablet
  },
  methods: {
    choose(index, alreadyComplete) {
      if (alreadyComplete) {
        return;
      }
      fetch(`${this.$store.getters.url}/choose`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          index: index
        })
      });
      postMessage({
        type: "gm_drivingschool_popup",
        closed: true
      });
    }
  },
  mounted() {
    fetch(`${this.$store.getters.url}/lang/popuptitle`, {
      method: "post"
    })
      .then(res => res.json())
      .then(data => (this.popupTitle = data.title));
    fetch(`${this.$store.getters.url}/config/colors`, {
      method: "post"
    })
      .then(res => res.json())
      .then(data => (this.colors = data));
    fetch(`${this.$store.getters.url}/exams`, { method: "post" })
      .then(res => res.json())
      .then(data => (this.buttons = data));
    window.addEventListener("message", e => {
      let data = e.data;
      switch (data.type) {
        case "gm_drivingschool_popup":
          this.popupHidden = data.closed;
      }
      fetch(`${this.$store.getters.url}/exams`, { method: "post" })
        .then(res => res.json())
        .then(data => (this.buttons = data));
    });
    window.addEventListener("keydown", e => {
      if (e.keyCode === 27) {
        this.popupHidden = true;
        fetch(`${this.$store.getters.url}/close`, {
          method: "post"
        });
      }
    });
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

  .popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // height: 50vh;
    width: 40vh;
    border-radius: 2vh;
    background-color: var(--bg-primary);
    overflow: hidden;
    &.hidden {
      pointer-events: none;
      transform: translate(-50%, -50%) scale(1.15);
      opacity: 0;
      transition: transform 0.2s, opacity 0.2s;
    }
    transition: transform 0.25s, opacity 0.25s;

    font-family: Avenir, Arial, Helvetica, sans-serif;
    .header {
      font-size: 2.5vh;
      padding: 1.5vh;
      color: var(--text-primary);
      text-align: center;
      background-color: var(--bg-secondary);
    }
    .content-container {
      color: var(--text-secondary);
      .buttongrid {
        display: flex;
        flex-direction: column;
        $gap: 3.25vh;
        padding: $gap;
        gap: $gap;
        .button {
          font-size: 2.2vh;
          padding: 0.5vh 1vh;
          border: 0.4vh solid var(--color-primary);
          border-radius: 50vh;
          transition: background-color 0.25s;
          text-align: left;
          cursor: pointer;
          .pricesign {
            display: inline-block;
            float: right;
          }
          &:hover {
            background-color: var(--color-primary);
            transition: background-color 0.15s;
          }
          &.complete {
            filter: grayscale(1);
            background-color: var(--color-secondary);
            cursor: not-allowed;
          }
        }
      }
    }
  }
}

body,
html {
  //DEV
  //background-color: #333333;

  margin: 0;
  padding: 0;
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
  perspective: 250vh;
}

* {
  box-sizing: border-box;
  user-select: none;
}
</style>
