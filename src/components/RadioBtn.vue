<template>
  <div
    class="radio"
    :class="{
      active: active
    }"
  >
    <div class="radio-outer">
      <div class="radio-inner"></div>
    </div>
    <span class="radio-label">{{ label }}</span>
  </div>
</template>
<script>
export default {
  name: "RadioBtn",
  props: {
    label: String,
    active: Boolean
  }
};
</script>
<style lang="scss">
$size: 3vh;
.radio {
  line-height: $size;
  display: grid;
  grid-template-columns: 4vh auto;
  place-items: right;
  margin-bottom: 1.5vh;
  .radio-outer {
    height: $size;
    width: $size;
    border-radius: 50%;

    border: $size / 6 solid var(--color-secondary);

    transform: scale(1.001) translateY(0);
    transition: linear transform 0.1s, border 0.1s;
    display: inline-block;
    position: relative;
    top: 1vh;
    margin-right: 0.6vh;
    margin-bottom: 0.4vh;
    .radio-inner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 0;
      width: 0;
      background-color: var(--color-primary);
      transform: all 0.2s;
    }
  }
  .radio-outer:hover {
    transform: scale(1.1) translateY(-0.01vh);
    transition: transform 0.1s;
    cursor: pointer;
  }
  .radio-label {
    display: inline;
    font-size: $size * 0.666;
    position: relative;
    top: 1.2vh;
  }
}
.radio:hover {
  .radio-outer {
    transform: scale(1.1) translateY(-0.01vh);
    transition: transform 0.1s;
    cursor: pointer;
  }
  .radio-label {
    cursor: pointer;
  }
}
.radio.active {
  .radio-outer {
    border: 0.5vh solid var(--color-primary);
    animation: pulse 0.25s;
    .radio-inner {
      height: $size * 0.5;
      width: $size * 0.5;
      border-radius: $size * 0.25;
    }
  }
}
@keyframes pulse {
  0% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1.1);
  }
}
</style>
