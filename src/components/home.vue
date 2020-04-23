<template>
  <div>
    <div class="menu_top"></div>
    <div class="content">
      <div class="menu_left">
        <div class="left"></div>
        <div class="vertical-menu">
          <button v-for="tab in tabs" v-bind:key="tab.name" v-on:click="curentTab=tab">
            {{ tab.show }}
          </button>
          
          <button v-on:click="logout">LOGOUT</button>
        </div> 
        <!-- <div class="vertical-menu">
          <router-link to="./homepage">HOME</router-link>
          <router-link to="./listAllUser">LIST</router-link>
          <button v-on:click="logout">LOGOUT</button>
        </div>
        <router-view></router-view> -->
      </div>
        <keep-alive><component class="right" v-bind:is="selected"></component></keep-alive>
    </div>
  </div>
</template>
<script>
import listAllUser from "./listAllUser";
import homepage from "./homepage";
export default {
  name: "home",
  components: {
    listAllUser,
    homepage
  },
  data() {
    return {
      show: false,
      curentTab: {name: "homepage"},
      tabs: [{name: "homepage", show: "HOME"},{name: "listAllUser", show: "LIST"}]
    };
  },
  computed: {
    selected() {
      return this.curentTab.name;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
<style scoped>
.menu_top {
  width: 100%;
  height: 75px;
  background-color: #4caf50;
}
.menu_left {
  width: 15%;
  float: left;
  height: 700px;
}
.left {
  position: fixed;
  width: 15%;
  left: 0;
  top: 0;
  height: 1000px;
  background-color: #4caf50;
}
.right {
  margin: 1.5%;
  float: left;
  width: 80%;
}
.vertical-menu {
  position: fixed;
  width: 15%;
  margin: 0 auto;
  padding-bottom: 2%;
}
button,
.button {
  font-size: 17px;
  border: 1px solid white;
  width: 100%;
  outline: none;
  margin: 0 auto;
}
.button {
  margin-top: 2px;
  width: 98%;
}
button,
.button {
  background-color: #eee;
  color: black;
  display: block;
  padding-top: 12px;
  padding-bottom: 12px;
  text-decoration: none;
}

button:hover,
.button:hover {
  background-color: #ccc;
}
button:active,
.button:active {
  background-color: #4caf50;
  color: white;
}
</style>
