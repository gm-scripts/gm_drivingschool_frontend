<template>
  <div class="welcome">
    <h1>{{ heading }}</h1>
    <p v-for="p in paragraphs" :key="p">{{ p }}</p>
  </div>
</template>
<script>
export default {
  name: "Welcome",
  data() {
    return {
      heading: "Loading...",
      paragraphs: ["Loading..."]
    };
  },
  mounted() {
    fetch(`${this.$store.getters.url}/lang/welcome`, {
      method: "post"
    })
      .then(res => res.json())
      .then(data => {
        this.heading = data.title;
        this.paragraphs = data.paragraphs;
        this.$store.commit("updateHeader", data.header);
        this.$store.commit("changeNextBtnLabel", data.nextButtonLabel);
        this.$store.commit("nextPage", data.nextPage);
      });
    let msgListener = e => {
      let data = e.data;
      switch (data.type) {
        case "nextButtonPressedBroadcast": {
          this.$router.push(this.$store.getters.nextPage);
          window.removeEventListener("message", msgListener);
          console.log(
            "%cthis only should appear once",
            "color:red;background-color:blue"
          );
          break;
        }
      }
    };
    window.addEventListener("message", msgListener);
  }
};
</script>
<style lang="scss">
.welcome {
  text-align: center;
  h1 {
    color: var(--text-primary);
    font-size: 3.5vh;

    margin: 3vh;
  }
  p {
    color: var(--text-secondary);
    font-size: 2.5vh;
    margin: 2vh 4vh;
  }
}
</style>
