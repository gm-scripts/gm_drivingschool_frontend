<template>
  <div class="failed">
    <h1>{{ heading }}</h1>
    <p v-for="p in paragraphs" :key="p">{{ p }}</p>
  </div>
</template>
<script>
export default {
  name: "FailedPage",
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
    fetch(`${this.$store.getters.url}/lang/failed`)
      .then(res => res.json())
      .then(data => {
        this.heading = data.title;
        this.paragraphs = data.paragraphs;
        this.$store.commit("updateHeader", data.header);
        this.$store.commit("changeNextBtnLabel", data.nextButtonLabel);
        this.$store.commit("nextPage", data.nextPage);
      });
    this.$store.commit("updateProgress", 1);

    window.addEventListener("message", e => {
      let data = e.data;
      if (data.type === "nextButtonPressedBroadcast") {
        fetch(`${this.$store.getters.url}/close`, {
          method: "post"
        });
      }
    });
  }
};
</script>
<style lang="scss">
.failed {
  padding: 5vh;
  h1 {
    margin: 0 5vh 2.5vh 0.75vh;
  }
  p {
    margin: 0 5vh 1.5vh 0;
  }
}
</style>
