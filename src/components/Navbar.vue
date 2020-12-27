<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">ToraTodo</a>
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
            v-show="isAuthenticated"
            to="/"
            tag="a"
            :class="
              getCurrentRoute == '/'
                ? 'nav-item nav-link active'
                : 'nav-item nav-link'
            "
            >Todos</router-link
          >
          <router-link
            tag="a"
            to="/logout"
            v-show="isAuthenticated"
            class="nav-item nav-link"
            href="#"
            >Logout</router-link
          >
          <router-link
            tag="a"
            to="/login"
            v-show="!isAuthenticated"
            :class="
              getCurrentRoute == '/login'
                ? 'nav-item nav-link active'
                : 'nav-item nav-link'
            "
            href="#"
            >Login</router-link
          >
          <router-link
            tag="a"
            to="/signup"
            v-show="!isAuthenticated"
            :class="
              getCurrentRoute == '/signup'
                ? 'nav-item nav-link active'
                : 'nav-item nav-link'
            "
            href="#"
            >Signup</router-link
          >
        </div>
      </div>
      <div v-show="isAuthenticated" class="float-right">
        <span>{{ getUserEmail }}</span>
      </div>
    </nav>
  </div>
</template>

<script>
import { auth } from "../plugins/firebase";
export default {
  data() {
    return {
      // isAuthenticated: auth.currentUser ? true : false
      isAuthenticated: localStorage.getItem("access_token") ? true : false
    };
  },
  computed: {
    getCurrentRoute() {
      return this.$route.path;
    },
    getUserEmail() {
      return localStorage.getItem("uid", "");
    }
  },
  watch: {
    $route(to, from) {
      // react to route changes...
      if (to.name == "Login" || to.name == "Signup") {
        this.isAuthenticated = false;
      } else if (to.name == "Todos") {
        this.isAuthenticated = true;
      }
    }
  }
};
</script>

<style>
.nav-link.active {
  font-weight: 700;
}
</style>
