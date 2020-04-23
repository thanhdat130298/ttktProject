<template>
  <div>
    <div class="butHead">
      <button v-on:click="checkAdd = true" class="butAdd">ADD USER</button>
      <button class="butSearch" v-on:click="showSearch = true">
        <img src="../assets/search.png" />
      </button>
    </div>
    <div>
      <!-- Add user component -->
      <div class="contain" v-if="checkAdd">
        <div class="contain2">
          <button v-on:click="checkAdd = false" v-if="checkAdd" class="close">
            X
          </button>
          <addUser class="addUser" @close="checkAdd = $event"> </addUser>
        </div>
      </div>
    </div>
    <div>
      <search
        class="search_component"
        v-if="showSearch"
        v-on:x="showSearch = $event"
        v-bind:currentPage="currentPage"
      ></search>
    </div>
    <!-- pagination component -->
    <pagination
      :total-pages="length"
      :current-page="currentPage"
      v-model="currentPage"
      @pagechanged="onPageChange"
      v-if="wait"
    />
    <!-- List user -->
    <table id="customers">
      <thead>
        <tr>
          <th>ID</th>
          <th>LOGIN</th>
          <th>TÊN HIỂN THỊ</th>
          <th>CHỨC DANH</th>
          <th>CƠ QUAN</th>
          <th>TỈNH HUYỆN</th>
          <th>NHÓM QUYỀN</th>
          <th>ĐƠN VỊ NGHIỆP VỤ</th>
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
          <td>{{ user.tenNghiepVu }}</td>
          <td>
            <!-- edit user -->
            <button
              v-on:click="
                checkEdit = true;
                getId(user.id);
              "
              class="edit"
            >
              EDIT
            </button>
            <div class="contain" v-if="checkEdit">
              <div class="contain2">
                <button
                  v-on:click="checkEdit = false"
                  v-if="checkEdit"
                  class="close"
                >
                  X
                </button>
                <editUser class="addUser" v-bind:id="id"> </editUser>
              </div>
            </div>
            <!-- delete user -->
            <div>
              <button class="edit" v-on:click="deleteUser(user.login)">
                DELETE
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="loader" v-if="loader"></div>
  </div>
</template>
<script>
import addUser from "./user/addUser";
import search from "./user/searchUser";
import editUser from "./user/editUser";
import pagination from "./pagination";
export default {
  name: "listAllUser",
  data() {
    return {
      totalPage: null,
      total: null,
      currentPage: 0,
      loader: false,
      checkAdd: false,
      checkEdit: false,
      id: null,
      wait: true,
      page: 0,
      showSearch: false,
    };
  },
  components: {
    search,
    addUser,
    editUser,
    pagination,
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    length() {
      let a = parseInt(this.$store.state.length / 25);
      return a;
    },
  },
  methods: {
    onPageChange(page) {
      this.currentPage = page;
      console.log(page, "currentpage2");
      this.$store.dispatch("getUserByPage", this.currentPage);
      //need call Action SearchUser by this.currentPage, but dont have condition and object to dispatch
    },
    getId(id) {
      this.id = id;
    },
    deleteUser(login) {
      this.$store.dispatch("deleteUser", login);
      this.$store.dispatch("getUserByPage", this.currentPage);
    },
  },
  async created() {
    // this.wait = true; //wait get length to set pagin
    this.loader = true;
    await this.$store.dispatch("getAllUser");
    this.$store.dispatch("getUserByPage", this.currentPage);
    this.loader = false;
  },
};
</script>
<style scoped>
.loader {
  margin-top: 10px;
  margin: 0 auto;
  border: 5px solid #4caf50;
  border-radius: 50%;
  border-top: 5px solid #a7e7a9;
  width: 20px;
  height: 20px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.butHead {
  width: 40%;
  margin: 0 auto;
}
.search_component {
  clear: left;
}
.butAdd {
  margin-right: 10px;
  width: 45%;
  margin-bottom: 10px;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.butSearch {
  color: white;
  float: left;
  width: 45%;
  margin-bottom: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
}
.add {
  width: 200px;
  margin-bottom: 10px;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.edit {
  width: 80px;
  margin-bottom: 10px;
  background-color: #4caf50;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.contain2 {
  border-radius: 10px;
  border: 2px solid #4caf50;
  background-color: white;
  width: 70%;
  margin: 0 auto;
  position: relative;
}
.close {
  position: absolute;
  top: 3px;
  z-index: 9999;
  right: 3px;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: none;
  outline: none;
}

.contain {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: dimgrey;
  display: table;
  transition: opacity 0.3s ease;
}
table {
  width: 100%;
}
td {
  text-align: left;
}
#customers {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}
button {
  width: 100%;
}
#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-bottom: 12px;
  text-align: center;
  background-color: #4caf50;
  color: white;
}
</style>
