<template>
  <div>
    <form>
      <h1>EDIT USER</h1>
      <div class="leftside">
        <div class="group">
          <div class="left">
            Tên đăng nhập:
          </div>
          <input type="text" v-model="user.login" class="right" />
        </div>

        <div class="group">
          <div class="left">
            Email:
          </div>
          <input type="email" v-model="user.email" />
        </div>
        <div class="group">
          <div class="left">
            Điện thoại di động:
          </div>
          <input type="number" v-model="user.phoneNumber" />
        </div>
        <div class="group">
          <div class="left">
            Ảnh:
          </div>
          <input type="text" v-model="user.imageUrl" />
        </div>
        <div class="group">
          <div class="left">
            Họ và Tên:
          </div>
          <input type="text" v-model="user.tenHienThi" />
        </div>
        <div class="group">
          <div class="left space">Giới tính:</div>
          <div>
            <input
              type="radio"
              v-model="user.gioiTinh"
              checked
              value="true"
            />Nam

            <input type="radio" v-model="user.gioiTinh" value="false" />Nữ
          </div>
        </div>
      </div>
      <!-- 
      /////////////////////////////// -->
      <div class="rightside">
        <div class="group">
          <div class="left">
            Nhóm quyền:
          </div>
          <select name="chucdanh" v-model="user.groupUserId">
            <option value="null">--Choose--</option>
            <option
              v-for="nQuyen in NQ"
              v-bind:key="nQuyen.id"
              v-bind:value="nQuyen.id"
            >
              {{ nQuyen.name }}{{ nQuyen.id }}
            </option>
          </select>
        </div>
        <div class="group">
          <div class="left">
            Phòng Ban:
          </div>
          <select name="phongban" v-model="user.dmPhongBanId">
            <option value="null">--Choose--</option>
            <option
              v-for="pBan in PB"
              v-bind:key="pBan.id"
              v-bind:value="pBan.id"
            >
              {{ pBan.tenPhongBan }} {{ pBan.id }}
            </option>
          </select>
        </div>
        <div class="group">
          <div class="left">
            Cơ quan tổ chức:
          </div>
          <select name="coquantochuc" v-model="user.donViId">
            <option value="null">--Choose--</option>
            <option
              v-for="cQuan in CQ"
              v-bind:key="cQuan.id"
              v-bind:value="cQuan.id"
            >
              {{ cQuan.tenDonVi }}{{ cQuan.id }}
            </option>
          </select>
        </div>
        <div class="group">
          <div class="left">
            Đơn vị nghiệp vụ:
          </div>
          <select name="donvi" v-model="user.dviNghiepVuId">
            <option value="null">--Choose--</option>
            <option v-for="dvi in DV" v-bind:key="dvi.id" v-bind:value="dvi.id">
              {{ dvi.tenNghiepVu }} {{ dvi.id }}
            </option>
          </select>
        </div>
        <div class="group">
          <div class="left">
            Chức danh:
          </div>
          <select name="chucdanh" v-model="user.chucDanhId">
            <option value="null">--Choose--</option>
            <option
              v-for="cDanh in CD.content"
              v-bind:key="cDanh.id"
              v-bind:value="cDanh.id"
            >
              {{ cDanh.chucDanh }}{{ cDanh.id }}
            </option>
          </select>
        </div>

        <div class="group">
          <div class="left space">Trạng thái hoạt động:</div>
          <div>
            <input
              type="radio"
              v-model="user.activated"
              checked
              value="true"
            />Thường xuyên

            <input type="radio" v-model="user.activated" value="false" />Không
            hoạt động
          </div>
        </div>
      </div>

      <button v-on:click.prevent="edit">EDIT</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "editUser",
  props: ["id"],
  data() {
    return {
      user: {},
      editUser: {
        id: null,
        login: null,
        email: null,
        activated: true, //
        chucDanhId: null,
        dmPhongBanId: null,
        dviNghiepVuId: null,
        gioiTinh: true,
        dmTinhHuyenId: null,
        donViId: null,
        imageUrl: null,
        phoneNumber: null,
        tenHienThi: null,
        authoryties: [],
        groupUserId: null,
        newPermission: [],
        removedPermission: []
      }
    };
  },
  mounted() {
    var item = this.$store.getters.users;

    this.user = item.find(res => {
    
      return this.id == res.id;

    });
    console.log(this.user,1111111);
    
    
  },
  methods: {
    edit() {
      this.editUser.id = this.id;
      this.editUser.login = this.user.login;
      this.editUser.email = this.user.email;
      this.editUser.chucDanhId = this.user.chucDanhId;
      this.editUser.dmPhongBanId = this.user.dmPhongBanId;
      this.editUser.dviNghiepVuId = this.user.dviNghiepVuId;
      this.editUser.dmTinhHuyenId = this.user.dmTinhHuyenId;
      this.editUser.phoneNumber = this.user.phoneNumber;
      this.editUser.imageUrl = this.user.imageUrl;
      this.editUser.donViId = this.user.donViId;
      this.editUser.tenHienThi = this.user.tenHienThi;
      this.editUser.groupUserId = this.user.groupUserId;

      this.$store
        .dispatch("edit", this.editUser)
        .then(() => {
          location.reload();
        })
        .catch(() => {
          console.log("false");
        });
    }
  },
  computed: {
    NQ() {
      return this.$store.getters.NQ;
    },
    PB() {
      return this.$store.getters.PB;
    },
    DV() {
      return this.$store.getters.DV;
    },
    CD() {
      return this.$store.getters.CD;
    },
    CQ() {
      return this.$store.getters.CQ;
    }
  },
  async created() {
    await this.$store.dispatch("getNQ");
    await this.$store.dispatch("getPB");
    await this.$store.dispatch("getDV");
    await this.$store.dispatch("getCQ");
    await this.$store.dispatch("getCD");
  }
};
</script>
<style scoped>
div {
  width: 80%;
  margin: 0 auto;
}
.check {
  color: red;
}
.leftside {
  float: left;
  width: 45%;
  height: 500px;
}
.rightside {
  margin-left: 10%;
  float: left;
  width: 45%;
  height: 500px;
}
form {
  width: 80%;
  padding: 25px;
  margin-top: 20px;
  margin: 0 auto;
}
input[type="text"],
input[type="number"],
input[type="password"],
input[type="email"],
select {
  width: 100%;
  padding: 12px 20px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
option {
  width: 100%;
  padding: 12px 20px;
}
.left {
  margin-bottom: 5px;
  margin-top: 5px;
  text-align: left;
}
button {
  width: 70%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
