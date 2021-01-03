import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

axios.defaults.baseURL = "https://herokutuan.herokuapp.com"

axios.defaults.headers["access-token"] = localStorage.getItem("access_token", "")
axios.defaults.headers["client"] = localStorage.getItem("client", "")
axios.defaults.headers["uid"] = localStorage.getItem("uid", "")
