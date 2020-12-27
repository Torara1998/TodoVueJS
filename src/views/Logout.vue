<template>
  <div></div>
</template>

<script>
// import { auth } from "../plugins/firebase";
export default {
  created() {
    // auth.signOut().then(response => {
    //   this.$router.push("/login");
    // });
    localStorage.removeItem("access_token");
    localStorage.removeItem("uid");
    localStorage.removeItem("client");
    this.$router.push("/login");
  }
};
</script>

<style></style>
