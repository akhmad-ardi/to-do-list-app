<template>
  <footer class="pt-3 pb-1 fixed-bottom d-flex flex-column align-items-center bg-secondary">
    <p class="m-0 text-center text-white">&copy; 2022 Akhmad Ardiansyah Amnur</p>
    <ul class="nav m-0 p-0">
      <li class="nav-item">
        <a
          class="nav-link fs-1"
          href="#"
        >
          <font-awesome-icon :icon="['fab', 'instagram-square']" />
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link fs-1"
          href="#"
        >
          <font-awesome-icon :icon="['fab', 'github-square']" />
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link fs-1"
          href="#"
        >
          <font-awesome-icon :icon="['fab', 'linkedin']" />
        </a>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: "footer-component",
};
</script>

<style scoped>
.nav-link {
  color: #333;
}

.nav-link:hover {
  color: #b2bac2;
}
</style>