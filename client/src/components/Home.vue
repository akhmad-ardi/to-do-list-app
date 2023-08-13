<template>
  <div class="container py-5">
    <Header />
    <main class="form-signin w-100 m-auto">
      <form @submit.prevent="addList">
        <div class="form-floating d-flex">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="Add List"
            v-model="newList.list"
          >
          <label for=" text-muted">Add List</label>
          <button
            type="submit"
            class="ms-1 btn btn-primary"
          >Add</button>
        </div>
      </form>
    </main>

    <div class="container">
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item d-flex justify-content-between bg-light"
          v-for="(list, index) in lists"
          :key="index"
        >
          <p
            class="w-75 m-0 text-inde lead"
            :class="list.finished ? 'text-decoration-line-through': ''"
          >{{ list.list }}</p>
          <div class="">
            <!-- Check List -->
            <button
              v-if="!list.finished"
              class="me-1 btn btn-primary"
              @click="finishList(index)"
            >
              <font-awesome-icon icon="check-square" />
            </button>
            <button
              v-else
              class="me-1 btn btn-primary"
              @click="finishList(index)"
            >
              <font-awesome-icon icon="square-xmark" />
            </button>
            <!-- Delete List -->
            <button
              class="btn btn-danger"
              @click="deleteList(index)"
            >
              <font-awesome-icon icon="trash" />
            </button>
          </div>
        </li>
        <li class="list-group-item d-flex justify-content-center bg-light">
          <button
            class="btn btn-primary"
            @click="focusInput"
          >
            <font-awesome-icon icon="square-plus" />
          </button>
          <button
            class="btn btn-danger ms-3"
            @click="logout"
          >
            <font-awesome-icon icon="right-from-bracket" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { getList, addList, finishList, deleteList } from "./../api.js";
import Header from "./partials/Header.vue";

export default {
  name: "home-component",
  components: {
    Header,
  },
  data() {
    return {
      router: useRouter(),
      id: localStorage.getItem("id"),
      lists: [],
      newList: { list: "", finished: false },
    };
  },
  async created() {
    await getList(this.id)
      .then((res) => {
        this.lists = res.todolist;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    focusInput() {
      document.getElementById("floatingInput").focus();
    },
    async addList() {
      if (this.newList.list == "" || this.newList.list == undefined) {
        return alert("Input Required");
      }
      await addList(this.id, this.newList)
        .then(() => {
          this.lists.push(this.newList);
          this.newList = { list: "", finished: false };
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async finishList(index) {
      await finishList(this.id, index)
        .then(() => {
          const listIndex = this.lists[index].finished;
          if (listIndex == false) {
            this.lists[index].finished = true;
          } else {
            this.lists[index].finished = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async deleteList(index) {
      await deleteList(this.id, index)
        .then(() => {
          this.lists.splice(index, index + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout() {
      localStorage.removeItem("id");
      localStorage.removeItem("login");
      this.router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped>
.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="text"] {
  margin-bottom: -1px;
}
</style>