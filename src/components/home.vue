<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item
          text
          class="grey lighten-4"
          link
          v-for="tab in tabs"
          v-bind:key="tab.name"
          v-on:click="curentTab = tab"
        >
          <v-list-item-action> <v-icon>{{tab.icon}}</v-icon> </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ tab.show }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="grey lighten-4" link v-on:click="logout">
          <v-list-item-action>
            <v-icon>mdi-arrow-left</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>LOGOUT</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left z-index="1000">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content class="content mx-10">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <keep-alive
                ><component
                  v-bind:is="selected"
                  v-on="on"
                ></component
              ></keep-alive>
            </template>
          </v-tooltip>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; Deate</span>
    </v-footer>
  </v-app>
</template>

<script>
import listAllUser from "./listAllUser";
import homepage from "./homepage";
export default {
  name: "home",
  props: {
    source: String,
  },
  components: {
    listAllUser,
    homepage,
  },
  data() {
    return {
      drawer: null,
      show: false,
      curentTab: { name: "homepage" },
      tabs: [
        { name: "homepage", show: "HOME", icon: "mdi-home" },
        { name: "listAllUser", show: "LIST", icon: "mdi-domain" },
      ],
    };
  },
  computed: {
    selected() {
      return this.curentTab.name;
    },
  },
  methods: {
    logout() {

      this.$store.dispatch("logout");
    },
  },
};
</script  lang="ts">
<style scoped>
</style>
