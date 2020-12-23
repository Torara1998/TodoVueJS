<template>
  <div></div>
</template>

<script>
import { logout } from "../services/store";
export default {
  created() {
    logout();
    this.$router.push("/login");
  }
};
</script>

<style></style>
