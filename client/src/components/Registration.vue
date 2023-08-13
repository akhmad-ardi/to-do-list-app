<template>
  <main class="container-fluid p-5 text-center d-flex flex-column">
    <form
      class="mb-4"
      @submit.prevent="createUser"
    >
      <h1 class="h3 mb-3 fw-normal">Registration</h1>

      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          v-model="newUser.username"
        >
        <label for="floatingInput">Username</label>
      </div>

      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          v-model="newUser.email"
        >
        <label for="floatingInput">Email address</label>
      </div>

      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          v-model="newUser.password"
        >
        <label for="floatingPassword">Password</label>
      </div>

      <button
        class="w-100 btn btn-lg btn-primary"
        type="submit"
      >Registration</button>
    </form>
    <p>
      <router-link :to="{ name: 'Login' }">
        Login
      </router-link>
    </p>
  </main>

  <Footer />
</template>

<script>
import { useRouter } from "vue-router";
import { auth, registrationUser } from "./../api.js";
import Footer from "./partials/Footer.vue";

export default {
  name: "registration-component",
  components: {
    Footer,
  },
  data() {
    return {
      router: useRouter(),
      newUser: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async createUser() {
      await registrationUser(this.newUser)
        .then((res) => {
          const token = res.token;
          const id = res._id;
          auth(token).then((res) => {
            const login = res.login;
            localStorage.setItem("login", login);
            localStorage.setItem("id", id);
            this.router.push({ name: "Home" });
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

main input[type="text"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

main input[type="email"] {
  margin-bottom: -1px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

main input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>