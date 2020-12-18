<template>
  <div class="row justify-content-md-center h-100">
    <div class="col col-sm-5 col-md-5 login-form">
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
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      console.log(this.email + this.password);
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
