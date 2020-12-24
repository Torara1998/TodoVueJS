<template>
  <div></div>
</template>

<script>
import { auth } from "../plugins/firebase";
export default {
  created() {
    auth.signOut().then(response => {
      this.$router.push("/login");
    });
  }
};
</script>

<style></style>
