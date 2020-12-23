<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link
            v-show="getCurrentAuth"
            to="/todos"
            tag="a"
            class="nav-item nav-link active"
            >Todos</router-link
          >
          <router-link
            tag="a"
            to="/logout"
            v-show="getCurrentAuth"
            class="nav-item nav-link"
            href="#"
            >Logout</router-link
          >
          <router-link
            tag="a"
            to="/login"
            v-show="!getCurrentAuth"
            class="nav-item nav-link"
            href="#"
            >Login</router-link
          >
          <router-link
            tag="a"
            to="/signup"
            v-show="!getCurrentAuth"
            class="nav-item nav-link"
            href="#"
            >Signup</router-link
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { auth } from "../plugins/firebase";
export default {
  computed: {
    getCurrentAuth() {
      if (auth.currentUser) {
        console.log("is logged in");

        return true;
      }
      console.log("logout");
      return false;
    }
  }
};
</script>

<style></style>
