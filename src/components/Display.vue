<template lang="">
  <div id="display">
    <div class="header">{{ $store.getters.header }}</div>
    <router-view></router-view>
    <div class="footer">
      <div class="progressbar-outer footer-item">
        <div
          class="progressbar-inner footer-item"
          :style="{
            '--progress': $store.getters.progress
          }"
        ></div>
      </div>
      <div class="wrong-indicator footer-item">{{ $store.getters.wrong }}</div>
      <div class="right-indicator footer-item">{{ $store.getters.right }}</div>
      <div class="next-btn footer-item">
        <span id="next-btn-label">{{ $store.getters.nextBtnLabel }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Display"
};
</script>
<style lang="scss">
#display {
  color: var(--text-primary);
  font-family: Avenir, Arial, Helvetica, sans-serif;
  font-size: 2vh;
  .header {
    height: 5vh;
    background: var(--bg-secondary);
    border-bottom: 1px solid #ffffff1f;
    line-height: 5vh;
    font-size: 2.5vh;
    text-align: center;
    color: var(--color-primary);
  }
  .footer {
    height: 7vh;
    width: 100%;
    position: absolute;
    bottom: 0;
    display: grid;
    grid-template-columns: 12fr 1fr 1fr 3fr;

    $gap: 1.5vh;
    padding: $gap;
    gap: $gap;
    .footer-item {
      border-radius: 3.5vh;
      height: 4vh;
      line-height: 4vh;
      text-align: center;
    }
    .progressbar-outer {
      background-color: var(--bg-secondary);
      .progressbar-inner {
        --progress: 1;
        width: calc(3vh + (68.75vh * var(--progress)));
        transition: linear width 0.3s;
        background-color: var(--color-primary);
        height: 3vh;
        position: relative;
        left: 0.5vh;
        top: 0.5vh;
      }
    }
    .wrong-indicator {
      background-color: var(--color-false);
    }
    .right-indicator {
      background-color: var(--color-correct);
    }
    .next-btn {
      border: 0.3vh solid var(--color-primary);
      cursor: pointer;
      #next-btn-label {
        display: inline-block;
        transform: translateY(-0.15vh);
      }
      &:hover {
        background-color: var(--color-primary);
        transition: background-color 0.1s;
      }
      transition: background-color 0.3s;
    }
  }
}
</style>
