<template>
  <div id="container">
    <div id="frame" :class="{ closed: closed }">
      <div id="home-btn"></div>
      <div id="camera-outer">
        <div id="camera-inner"></div>
      </div>
      <Display></Display>
    </div>
  </div>
</template>

<script>
import Display from "../components/Display.vue";
export default {
  name: "Tablet",
  data() {
    return {
      closed: true
    };
  },
  components: {
    Display
  },
  methods: {
    close() {
      this.closed = true;
      fetch(`${this.$store.getters.url}/close`, {
        method: "post"
      });
      this.$store.commit("resetStore");
    },
    open() {
      this.closed = false;
    }
  },
  mounted() {
    window.addEventListener("message", e => {
      let dat = e.data;
      switch (dat.type) {
        case "gm_open_dschool":
          this.open();
          break;
        case "gm_close_dschool":
          this.close();
          break;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
/*  VAR  */
//General tablet Variables
$tablet-height: 85vh;

//Variables of the tablet Frame
$frame-color: #111111;

//Variables of the tablet Case
$case-color: #555555;

//Variables of tablet OS
$header-height: 2.5vh;
$header-bg-color: #808080b0;
$header-el-color: #ffffffbb;

/*  MIXINS  */
@mixin no-margin {
  margin: 0;
  padding: 0;
}

@mixin casing($color, $thiccness, $lighting-contrast, $reverse) {
  @if $reverse {
    border-top: $thiccness solid darken($color, $lighting-contrast);
    border-left: $thiccness solid darken($color, $lighting-contrast);
    border-right: $thiccness solid lighten($color, $lighting-contrast);
    border-bottom: $thiccness solid lighten($color, $lighting-contrast);
  } @else {
    border-top: $thiccness solid lighten($color, $lighting-contrast);
    border-left: $thiccness solid lighten($color, $lighting-contrast);
    border-right: $thiccness solid darken($color, $lighting-contrast);
    border-bottom: $thiccness solid darken($color, $lighting-contrast);
  }
}

#container {
  #frame {
    @include casing($case-color, 0.4vh, 10, false);
    position: relative;

    background-color: $frame-color;
    height: $tablet-height;
    width: $tablet-height * 1.5;

    border-radius: 5vh;
    display: grid;
    place-items: center;
    transition: transform 0.2, opacity 0.15s;
    #home-btn {
      @include casing($frame-color, 0.3vh, 5, true);
      background-color: $frame-color;
      right: 1.1vh;
      border-radius: 50%;
      position: absolute;
      height: 6vh;
      width: 6vh;
    }

    #camera-outer {
      position: absolute;
      left: 2.5vh;
      @include casing(#113322, 0.3vh, 5, true);
      border-radius: 50%;
      display: grid;
      place-items: center;
      #camera-inner {
        @include casing(#112233, 0.3vh, 5, false);
        border-radius: inherit;
      }
    }

    #display {
      border-radius: 1px;
      position: relative;
      left: $tablet-height * -0.012;
      height: $tablet-height * 0.93;
      width: $tablet-height * 1.3;
      background-color: var(--bg-primary);
      overflow-y: hidden;
    }
    transform: rotate3d(1, 0, 0, 0deg) translateY(0) scale(1);
    &.closed {
      opacity: 0;
      transform: rotate3d(1, 0, 0, 45deg) translateY(30vh) scale(0.8);
      transition: transform 1s, opacity 1s;
    }
  }
}
</style>
