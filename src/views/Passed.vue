<template>
  <div class="passed">
    <h1>{{ heading }}</h1>
    <p v-for="p in paragraphs" :key="p">{{ p }}</p>
  </div>
</template>
<script>
export default {
  name: "PassedPage",
  data() {
    return {
      heading: "Verkackt",
      paragraphs: [
        "du hast die theoretische prüfung leider nicht bestanden",
        "um dieses fenster zu verlassen, drücke auf den 'schließen' knopf"
      ]
    };
  },
  created() {
    fetch(`${this.$store.getters.url}/lang/passed`, {
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
    this.$store.commit("updateProgress", 1);

    let msgListener = e => {
      let data = e.data;
      if (data.type === "nextButtonPressedBroadcast") {
        fetch(`${this.$store.getters.url}/close`, {
          method: "post"
        });

        postMessage({ type: "gm_close_dschool" });
      }
    };
    window.addEventListener("message", msgListener);
  }
};
</script>
<style lang="scss">
.passed {
  padding: 5vh;
  h1 {
    margin: 0 5vh 2.5vh 1vh;
  }
  p {
    margin: 0 5vh 1.5vh 0;
  }
}
</style>
