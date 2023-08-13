<template>
  <main class="container-fluid p-5 text-center d-flex flex-column">
    <form
      class="mb-4"
      @submit.prevent="loginUser"
    >
      <h1 class="h3 mb-3 fw-normal">Login</h1>

      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          v-model="userLogin.email"
        >
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          v-model="userLogin.password"
        >
        <label for="floatingPassword">Password</label>
      </div>

      <button
        class="w-100 btn btn-lg btn-primary"
        type="submit"
      >Login</button>
    </form>
    <p>
      <router-link :to="{ name: 'Registration' }">
        Registration
      </router-link>
    </p>
  </main>

  <Footer />
</template>

<script>
import { useRouter } from "vue-router";
import { loginUser, auth } from "./../api.js";
import Footer from "./partials/Footer.vue";

export default {
  name: "login-component",
  components: {
    Footer,
  },
  data() {
    return {
      router: useRouter(),
      userLogin: { email: "", password: "" },
    };
  },
  methods: {
    async loginUser() {
      await loginUser(this.userLogin)
        .then((res) => {
          const token = res.token;
          const id = res._id;
          auth(token)
            .then((res) => {
              const login = res.login;
              localStorage.setItem("login", login);
              localStorage.setItem("id", id);
              this.router.push({ name: "Home" });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
main .form-floating:focus-within {
  z-index: 2;
}

main input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

main input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>