<template>
  <div class="row justify-content-md-center h-100">
    <div class="col col-sm-5 col-md-5 login-form">
      <div v-show="errors.length > 0" class="alert alert-danger" role="alert">
        <div v-for="error in errors" :key="error">{{ error.toString() }}</div>
      </div>
      <div class="form-group">
        <label class="font-weight-bold" for="exampleInputEmail1"
          >Email address</label
        >
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="email"
        />
      </div>

      <div class="form-group">
        <label class="font-weight-bold" for="exampleInputPassword1"
          >Password</label
        >
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          v-model="password"
        />
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-outline-primary" @click="login">
          Login
        </button>
        <button type="submit" class="btn btn-primary" @click="openSignup">
          Register now
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import * as fb from "../plugins/firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  created() {
    if (localStorage.getItem("access_token")) this.$router.push("/");
  },
  methods: {
    login() {
      // fb.auth
      //   .signInWithEmailAndPassword(this.email, this.password)
      //   .then(response => {
      //     this.$router.push("/");
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
      this.axios
        .post("/auth/sign_in", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          localStorage.setItem(
            "access_token",
            response.headers["access-token"]
          );
          localStorage.setItem("uid", response.headers.uid);
          localStorage.setItem("client", response.headers.client);
          this.errors = [];
          this.$router.push("/");
        })
        .catch(error => {
          if (error.response.data) this.errors = error.response.data.errors;
        });
    },
    openSignup() {
      this.$router.replace("/signup");
    }
  }
};
</script>

<style>
.login-form {
  border: 2px solid #cacfcc;
  border-radius: 2%;
  padding: 20px 20px 20px 20px;
}
</style>
