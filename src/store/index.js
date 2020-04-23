import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router/router";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    name: "",
    token: "",
    searchResult: "",
    users: [],
    dmbhxhId: "",

    length: null,
    CQ: [],
    DV: [],
    NQ: [],
    PB: [],
    CD: [],
  },
  getters: {
    users: (state) => state.users,
    DV: (state) => state.DV,
    NQ: (state) => state.NQ,
    PB: (state) => state.PB,
    CQ: (state) => state.CQ,
    CD: (state) => state.CD,
  },
  mutations: {
    search(state, result) {
      state.searchResult = result;
    },
    logout(state) {
      state.token = null;
      router.push("/login");
    },
    SAVE(state, name) {
      state.name = name;
    },
    getToken(state, token) {
      state.token = token;
    },
    users(state, users) {
      state.users = users;
    },
    length(state, length) {
      state.length = length;
      console.log(state.length, "length");
    },
    getDmbhxhId(state, id) {
      state.dmbhxhId = id;
    },
    listDonVi(state, data) {
      state.DV = data;
    },
    listPhongBan(state, data) {
      state.PB = data; //
    },
    listNhomQuyen(state, data) {
      state.NQ = data; //
    },
    listChucDanh(state, data) {
      state.CD = data; //
    },
    listCoQuan(state, data) {
      state.CQ = data;
    },
  },
  actions: {
    fetchToken({ commit }) {
      commit("getToken", localStorage.getItem("token"));
    },
    getIddm({ commit }) {
      commit("getDmbhxhId", localStorage.getItem("dmbhxhId"));
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      localStorage.removeItem("dmbhxhId");
      commit("logout");
    },

    async getAllUser({ commit }) {
      await axios
        .get(
          "http://118.69.55.188:8080/api/users?size=1000&sort=lastModifiedDate"
        )
        .then((res) => {
          console.log(res.data.length);

          commit("length", res.data.length);
        });
    },
    getUserByPage({ commit }, page) {
      axios
        .get(
          "http://118.69.55.188:8080/api/users?page=" +
            page +
            "&size=25&sort=lastModifiedDate"
        )
        .then((res) => {
          commit("users", res.data);
        });
    },
    async searchAll({ commit }, data) {
      await axios
        .get(
          "http://118.69.55.188:8080/api/users/search-user?dmbhxhId=" +
            data.dmbhxhId +
            "&login=" +
            data.login +
            "&tenHienThi=" +
            data.tenHienThi +
            "&chucDanh=" +
            data.chucDanh +
            "&donViCongTac=" +
            data.tenNghiepVu +
            "&authorityId=" +
            data.authorityId +
            "&size=1000"
        )
        .then((res) => {
          commit("length", res.data.content.length);
          console.log(res.data.content);
          
        });
    },
    async searchUser({ commit }, data) {
      await axios
        .get(
          "http://118.69.55.188:8080/api/users/search-user?dmbhxhId=" +
            data.dmbhxhId +
            "&login=" +
            data.login +
            "&tenHienThi=" +
            data.tenHienThi +
            "&chucDanh=" +
            data.chucDanh +
            "&donViCongTac=" +
            data.tenNghiepVu +
            "&authorityId=" +
            data.authorityId +
            "&page=" +
            data.page +
            "&size=25"
        )
        .then((res) => {
          var result = "";
          console.log(res.data);

          if (res.data.content.length == 0) {
            result = "No result!";

            commit("search", result);
          } else {
            result = "";
            commit("search", result);
          }
          commit("users", res.data.content);
        });
    },
    async login(state, data) {
      await axios
        .post("http://118.69.55.188:8080/api/authenticate", {
          maDonVi: data.maDonVi,
          username: data.username,
          password: data.password,
        })
        .then((res) => {
          this.commit("getToken", res.data.id_token);
          localStorage.setItem("token", res.data.id_token);
          router.push("/home");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //http://192.168.0.139:8080/
    async getUnit(state, id) {
      await axios
        .get(
          "http://118.69.55.188:8080/api/account/get-info-dmbhxh-by-ma-don-vi?maDonVi=" +
            id
        )
        .then((res) => {
          this.commit("SAVE", res.data.dmbhxh.tenDonVi);
          console.log(res.data);

          localStorage.setItem("dmbhxhId", res.data.dmbhxh.id);
        });
    },

    /////////////////////
    getNQ() {
      axios
        .get(
          "http://118.69.55.188:8080/api/authorities/get-by-dmbhxh-id?dmbhxhId=1&page=[object%20Object]&size=30"
        )
        .then((res) => {
          this.commit("listNhomQuyen", res.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPB() {
      axios
        .get(
          "http://118.69.55.188:8080/api/d-m-phong-ban?page=0&size=1000&dmBhxhId=1"
        )
        .then((res) => {
          this.commit("listPhongBan", res.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDV() {
      axios
        .get("http://118.69.55.188:8080/api/don-vi-nghiep-vus?page=0&size=1000")
        .then((res) => {
          this.commit("listDonVi", res.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCQ() {
      axios
        .get("http://118.69.55.188:8080/api/d-mbhxhs/get-by-ma-cha?maCha=000")
        .then((res) => {
          this.commit("listCoQuan", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCD() {
      //call ko a
      axios
        .get(
          "http://118.69.55.188:8080/api/d-m-chuc-danh-users?page=0&size=1000&dmBHXHId=1"
        )
        .then((res) => {
          this.commit("listChucDanh", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    edit(state, user) {
      axios.put("http://118.69.55.188:8080/api/users", user).then((res) => {
        console.log(res);
      });
    },
    deleteUser(state, login) {
      axios
        .delete("http://118.69.55.188:8080/api/users/" + login)
        .then((res) => {
          console.log(res);
        });
    },
    submit(state, info) {
      axios

        .post("http://118.69.55.188:8080/api/users", info)
        .then((res) => {
          console.log(res, "ok");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {},
});
