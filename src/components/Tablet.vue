<template>
  <div id="container">
    <div id="frame">
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
  components: {
    Display
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
  }
}
</style>
