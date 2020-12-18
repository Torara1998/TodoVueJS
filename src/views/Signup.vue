<template>
  <div class="row justify-content-md-center h-100">
    <div class="col col-sm-5 col-md-5 login-form">
      <div class="form-group">
        <label class="font-weight-bold" for="exampleInputusername1"
          >User name</label
        >
        <input
          type="username"
          class="form-control"
          id="exampleInputusername1"
          aria-describedby="usernameHelp"
          placeholder="Enter username"
          v-model="username"
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
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      dob: "",
      username: ""
    };
  },
  methods: {
    signup() {
      console.log(this.dob);
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
