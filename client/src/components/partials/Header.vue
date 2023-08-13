<template>
  <header class="container-fluid">
    <h1 class="text-center text-primary">
      <font-awesome-icon icon="check-square" /> <span>My List</span>
    </h1>
  </header>
</template>

<script>
export default {
  name: "header-component",
  data() {
    return {
      isHidden: "hidden",
    };
  },
  methods: {
    sidebar() {
      if (this.isHidden == "hidden") {
        this.isHidden = "";
      } else {
        this.isHidden = "hidden";
      }
    },
  },
};
</script>