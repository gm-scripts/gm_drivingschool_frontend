import { createRouter, createWebHashHistory } from "vue-router";
import Welcome from "../views/Welcome.vue";
import Test from "../views/Test.vue";
import Passed from "../views/Passed.vue";
import Failed from "../views/Failed.vue";

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome
  },
  {
    path: "/test",
    name: "DrivingTest",
    component: Test
  },
  {
    path: "/pass",
    name: "TestPassed",
    component: Passed
  },
  {
    path: "/fail",
    name: "TestFailed",
    component: Failed
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
