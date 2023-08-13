import { createRouter, createWebHistory } from "vue-router";

import Home from "./../components/Home.vue";
import Registration from "./../components/Registration.vue";
import Login from "./../components/Login.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: () => {
      const login = localStorage.getItem("login");
      if (login == "true") {
        return true;
      } else {
        return { name: "Login" };
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: () => {
      const login = localStorage.getItem("login");
      if (login == "true") {
        return { name: "Home" };
      } else {
        return true;
      }
    },
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
    beforeEnter: () => {
      const login = localStorage.getItem("login");
      if (login == "true") {
        return { name: "Home" };
      } else {
        return true;
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: "active",
  routes,
});

export default router;
