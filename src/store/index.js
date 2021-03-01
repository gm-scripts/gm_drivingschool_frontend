import { createStore } from "vuex";

export default createStore({
  state: {
    serverUrl: "http://localhost:3000",
    // in production https://gm_drivingschool/,
    // in dev http://localhost:3000/

    header: "Hello, World!",
    nextBtnLabel: "Next",
    progress: 0,
    status: {
      correct: 0,
      wrong: 0
    }
  },
  mutations: {},
  actions: {},
  getters: {
    url: state => state.serverUrl,
    header: state => state.header,
    nextBtnLabel: state => state.nextBtnLabel,
    right: state => state.status.correct,
    wrong: state => state.status.wrong,
    progress: state => state.progress
  }
});
