<template>
  <div class="radio-group">
    <RadioBtn
      v-for="btn in buttons"
      :key="btn.index"
      :label="btn.data"
      :active="radios[btn.index]"
      @click="select(btn.index)"
    ></RadioBtn>
  </div>
</template>
<script>
import RadioBtn from "./RadioBtn.vue";
export default {
  name: "RadioGroup",
  data() {
    return {
      radios: []
    };
  },
  props: {
    buttons: Array // array of objects like the RadioBtns props
  },
  components: {
    RadioBtn
  },
  methods: {
    clearRadios() {
      this.radios.forEach((option, index) => (this.radios[index] = false));
    },
    select(index) {
      this.clearRadios();
      this.radios[index] = true;
      let letters = ["a", "b", "c", "d"];
      postMessage({
        type: "radioGroupSelectionBroadcast",
        buttonSelected: letters[index]
      });
    }
  },
  mounted() {
    for (let i = 0; i < this.buttons.length; i++) {
      this.radios.push(false);
    }
    window.addEventListener("message", e => {
      let data = e.data;
      switch (data.type) {
        case "nextButtonPressedBroadcast": {
          this.clearRadios();
          break;
        }
      }
    });
  }
};
</script>
<style lang="scss"></style>
