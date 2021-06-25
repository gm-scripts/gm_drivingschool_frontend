import { createStore } from "vuex";

export default createStore({
  state: {
    serverUrl: "https://gm_drivingschool",
    // in production https://gm_drivingschool,
    // in dev http://localhost:3000
    header: "Hello, World!",
    nextBtnLabel: "Next",
    nextPage: "/",
    progress: 0,
    status: {
      correct: 0,
      wrong: 0
    }
  },
  mutations: {
    updateHeader: (state, value) => (state.header = value),
    changeNextBtnLabel: (state, value) => (state.nextBtnLabel = value),
    nextPage: (state, value) => (state.nextPage = value),
    updateProgress: (state, value) => (state.progress = value),
    incStatusCorrect: state => state.status.correct++,
    incStatusWrong: state => state.status.wrong++,
    resetStore: state => {
      state.header = "";
      state.nextBtnLabel = "";
      state.nextPage = "/";
      state.progress = 0;
      state.status = {
        correct: 0,
        wrong: 0
      };
    }
  },
  getters: {
    url: state => state.serverUrl,
    header: state => state.header,
    nextBtnLabel: state => state.nextBtnLabel,
    nextPage: state => state.nextPage,
    right: state => state.status.correct,
    wrong: state => state.status.wrong,
    progress: state => state.progress
  }
});
