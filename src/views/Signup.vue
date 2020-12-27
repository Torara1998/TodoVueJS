<template>
  <div class="row justify-content-md-center h-100">
    <div class="col col-sm-5 col-md-5 login-form">
      <div v-show="errors.length > 0" class="alert alert-danger" role="alert">
        <div v-for="error in errors" :key="error">{{ error.toString() }}</div>
      </div>
      <div class="form-group">
        <label class="font-weight-bold" for="exampleInputname1">Name</label>
        <input
          type="name"
          class="form-control"
          id="exampleInputname1"
          aria-describedby="nameHelp"
          placeholder="Enter name"
          v-model="name"
        />
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
        <label class="font-weight-bold" for="exampleInputPassword2"
          >Confirm Password</label
        >
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword2"
          placeholder="Confirm password"
          v-model="confirmPassword"
        />
      </div>
      <div class="form-group">
        <label class="font-weight-bold" for="dob">Day of birth</label>
        <input
          type="date"
          class="form-control"
          id="dob"
          placeholder="Day of birth"
          v-model="dob"
        />
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-outline-primary" @click="signup">
          Signup
        </button>
        <button type="submit" class="btn btn-primary" @click="openLogin">
          Login now
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
      confirmPassword: "",
      dob: "",
      name: "",
      errors: []
    };
  },
  created() {
    if (localStorage.getItem("access_token")) this.$router.push("/");
  },
  methods: {
    signup() {
      // fb.auth
      //   .createUserWithEmailAndPassword(this.email, this.password)
      //   .then(response => {
      //     console.log(response);
      //     this.$router.push("/login");
      //   })
      //   .catch(error => {
      //     // Handle Errors here.
      //     console.log(error);
      //   });
      this.axios
        .post("/auth", {
          email: this.email,
          password: this.password,
          name: this.name
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
          this.errors = error.response.data.errors.full_messages;
        });
    },
    openLogin() {
      this.$router.replace("/login");
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
