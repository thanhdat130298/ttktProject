<template>
  <v-app id="inspire" class="bg">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div class="width">
      <v-btn v-on:click="checkAdd = true" color="blue lighten-5" large
        >ADD USER</v-btn
      >
    </div>
    <div>
      <!-- Add user component -->
      <v-overlay :opacity="0.5" :value="checkAdd" v-if="checkAdd">
        <v-container color="white" class="sizeAdd">
          <v-btn color="error" v-on:click="checkAdd = false" v-if="checkAdd" class="styleButton">
            X
          </v-btn>
          <addUser @close="checkAdd = $event"> </addUser>
        </v-container>
      </v-overlay>
    </div>
    <div>
      <search
        class="search_component"
        v-bind:currentPage="currentPage"
        v-bind:length="length"
        v-on:currentPage="currentPage = $event"
        v-on:object="object = $event"
      ></search>
    </div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>ID</th>
            <th>LOGIN</th>
            <th>TÊN HIỂN THỊ</th>
            <th>CHỨC DANH</th>
            <th>CƠ QUAN</th>
            <th>TỈNH HUYỆN</th>
            <th>NHÓM QUYỀN</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" v-bind:key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.login }}</td>
            <td>{{ user.tenHienThi }}</td>
            <td>{{ user.chucDanh }}</td>
            <td>{{ user.donVi }}</td>
            <td>{{ user.tenTinhHuyen }}</td>
            <td>{{ user.groupUserName }}</td>
            <td>
              <!-- edit user -->
              <!-- but edit -->
              <v-btn
              
                v-on:click="
                  checkEdit = true;
                  getId(user.id);
                "
                block
                color="primary"
                class="edit"
              >
                EDIT
              </v-btn>
              <!-- content edit -->
              <v-overlay
                :opacity="0.5"
                :value="checkEdit"
                :z-index="5"
                v-if="checkEdit"
              >
                <v-container color="white" class="sizeAdd" v-if="checkEdit" >
                  <v-btn
                    color="error"
                    v-on:click="checkEdit = false"
                    class="styleButton"
                  >
                    X
                  </v-btn>
                  <editUser class="addUser" v-bind:id="id"> </editUser>
                </v-container>
              </v-overlay>
              <div>
                <v-btn
                  class="edit"
                  color="error"
                  block
                  v-on:click="deleteUser(user.login)"
                >
                  DELETE
                </v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-container class="max-width">
      <v-pagination
        :value="currentPage"
        :length="length"
        :total-visible="7"
        @input="onPageChange"
      ></v-pagination>
    </v-container>
  </v-app>
</template>
<script>
import addUser from "./user/addUser";
import search from "./user/searchUser";
import editUser from "./user/editUser";
export default {
  name: "listAllUser",
  data() {
    return {
      totalPage: null,
      total: null,
      currentPage: 1,
      checkAdd: false,
      checkEdit: false,
      id: null,
      wait: true,
      showSearch: false,
      overlay: false,
    };
  },
  components: {
    search,
    addUser,
    editUser,
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    length() {
      let a = parseInt(this.$store.state.length / 10);
      return a;
    },
  },
  methods: {
    async onPageChange(page) {
      this.overlay = true;
      this.currentPage = page;
      this.object.page = page;
      await this.$store.dispatch("searchUser", this.object);
      this.overlay = false;
    },
    getId(id) {
      this.id = id;
    },
    async deleteUser(login) {
      this.overlay = true;
      await this.$store.dispatch("deleteUser", login);
      await this.$store.dispatch("searchAll", this.object);
      await this.$store.dispatch("searchUser", this.object);
      this.overlay = false;
    },
  },
  updated() {},
  async mounted() {
    this.overlay = true;

    await this.$store.dispatch("searchAll", this.object);
    await this.$store.dispatch("searchUser", this.object);
    this.overlay = false;
  },
};
</script>
<style scoped>
.styleButton {
  position: fixed;
  right: 0;
}
.search_component {
  margin-bottom: -350px;
}
.width {
  margin: 0 auto;
  width: 100px;
  margin-bottom: 10px;
}
.sizeAdd {
  margin-top: 20px;
  width: 900px;
}
</style>
