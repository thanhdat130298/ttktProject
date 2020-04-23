<template>
  <div>
    <form>
      <h1>ADD USER</h1>
      <div class="leftside">
        <div class="group">
          <div class="left">
            Tên đăng nhập:(<span class="check">*{{ errLogin }}</span
            >)
          </div>
          <input type="text" v-model="infor.login" class="right" />
        </div>
        <div class="group">
          <div class="left">Mật khẩu:(<span class="check">*{{ errPass }}</span>)</div>
          <input type="password" v-model="infor.password" />
        </div>
        <div class="group">
          <div class="left">
            Nhập lại mật khẩu:(<span class="check">*{{ errRepass }}</span>)
          </div>
          <input type="password" v-model="repassword" />
        </div>
        <div class="group">
          <div class="left">Email:(<span class="check">*{{ errEmail }}</span>)</div>
          <input type="email" v-model="infor.email" />
        </div>
        <div class="group">
          <div class="left">
            Điện thoại di động:(<span class="check">*{{ errPhone }}</span>)
          </div>
          <input type="number" v-model="infor.phoneNumber" />
        </div>
        <div class="group">
          <div class="left">Ảnh:(<span class="check">*{{ errImage }}</span>)</div>
          <input type="text" v-model="infor.imageUrl" />
        </div>
        <div class="group">
          <div class="left space">Giới tính:</div>
          <div>
            <input
              type="radio"
              v-model="infor.gioiTinh"
              checked
              value="true"
            />Nam

            <input
              type="radio"
              v-model="infor.gioiTinh"
              name="gender"
              value="false"
            />Nữ
          </div>
        </div>
      </div>
      <!-- 
      /////////////////////////////// -->
      <div class="rightside">
        <div class="group">
          <div class="left">Họ và Tên:(<span class="check">*{{ errName }}</span>)</div>
          <input type="text" v-model="infor.tenHienThi" />
        </div>
        <div class="group">
          <div class="left">Nhóm quyền:(<span class="check">*{{errNQ}}</span>)</div>
          <select name="chucdanh" v-model="infor.groupUserId">
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
          <div class="left">Phòng Ban:(<span class="check">*({{errPB}}</span>)</div>
          <select name="phongban" v-model="infor.dmPhongBanId">
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
          <div class="left">Cơ quan tổ chức:(<span class="check">*{{errCQ}}</span>)</div>
          <select name="coquantochuc" v-model="infor.donViId">
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
            Đơn vị nghiệp vụ:(<span class="check">*{{errDV}}</span>)
          </div>
          <select name="donvi" v-model="infor.dviNghiepVuId">
            <option value="null">--Choose--</option>
            <option v-for="dvi in DV" v-bind:key="dvi.id" v-bind:value="dvi.id">
              {{ dvi.tenNghiepVu }} {{ dvi.id }}
            </option>
          </select>
        </div>
        <div class="group">
          <div class="left">Chức danh:(<span class="check">*{{errCD}}</span>)</div>
          <select name="chucdanh" v-model="infor.chucDanhId">
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
              v-model="infor.activated"
              checked
              value="true"
            />Thường xuyên

            <input type="radio" v-model="infor.activated" value="false" />Không
            hoạt động
          </div>
        </div>
      </div>

      <button v-on:click.prevent="submit">THÊM NGƯỜI DÙNG</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "addUser",
  data() {
    return {
      infor: {
        login: null,
        password: null,
        email: null,
        activated: true,//
        //chucDanh
        chucDanhId: null,
        dmPhongBanId: null,
        dviNghiepVuId: null,
        gioiTinh: true,
        dmTinhHuyenId: null,
        donViId: null,
        //donVi
        //groupUserName
        //tenTinhHuyen
        imageUrl: null,
        phoneNumber: null,
        tenHienThi: null,
        authoryties: [],//
        groupUserId: null,
        newPermission: [],
        removedPermission: []
      },
      repassword: null,
      errName: null,
      errLogin: null,
      errPass: null,
      errRepass: null,
      errEmail: null,
      errPhone: null,
      errImage: null,
      errCD: null,
      errNQ: null,
      errCQ: null,
      errPB: null,
      errDV: null,
      ok: true,
      checkAdd: false
    };
  },
  methods: {
    submit() {
      const arrCQ = this.$store.getters.CQ;
      const arrNQ = this.$store.getters.NQ;
      if (!this.infor.login) {
        this.ok = false;
        this.errLogin = "Nhập tên đăng nhập!";
      } else this.errLogin = "";
      if (!this.infor.tenHienThi) {
        this.ok = false;
        this.errName = "Nhập Họ và tên!";
      } else this.errName = "";
      if(!this.infor.password) {
        this.ok = false;
        this.errPass = "Nhập mật khẩu!";
      } else this.errPass = "";
      if(!this.repassword) {
        this.ok = false;
        this.errRepass = "Nhập lại mật khẩu!";
      } else if (this.infor.password!=this.repassword) {
        this.ok = false;
        this.errRepass =  "Mật khẩu không trùng khớp!"
      } else (this.errRepass="");
      if(!this.infor.email) {
        this.ok = false;
        this.errEmail = "Nhập Email!";
      } else this.errEmail = "";
      if (!this.infor.phoneNumber) {
        this.ok=false;
        this.errPhone = "Nhập Email";
      } else this.errPhone = "";
      if (!this.infor.imageUrl) {
        this.ok=false;
        this.errImage = "Link!";
      } else this.errImage = "";
      if(!this.infor.groupUserId) {
        this.ok=false;
        this.errNQ = "Please choose!";
      } else this.errNQ = "";
      
      if(!this.infor.dmPhongBanId) {
        this.ok=false;
        this.errPB = "Please choose!";
      } else this.errPB = "";
      if(!this.infor.chucDanhId) {
        this.ok=false;
        this.errCD = "Please choose!";
      } else this.errCD = "";

      if(!this.infor.donViId) {
        this.ok=false;
        this.errDV = "Please choose!";
      } else this.errDV = "";


      if(!this.infor.dviNghiepVuId) {
        this.ok=false;
        this.errCQ = "Please choose!";
      } else this.errCQ = "";




      if (this.ok == true) {
        const checkIdCQ = arrCQ.find((res) => {
          return this.infor.donViId == res.id; // loop to find object have id Co Quan
        });
        const checkIdNQ = arrNQ.find((res) => {// loop to find object have id Nhom quyen 
          return this.infor.groupUserId == res.id;
        });
        this.infor.authoryties.push(checkIdNQ.name);
        this.infor.dmTinhHuyenId = checkIdCQ.tinhHuyen.id;

        this.$store.dispatch("submit", this.infor).then(()=>{
          location.reload();
        })
        .catch(()=>{
          console.log("false");
          
        })
        //validate
        // this.$emit('close', this.checkAdd);// no re-render parent

      }
    },
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
    },
  },
  async created() {
    await this.$store.dispatch("getNQ");
    await this.$store.dispatch("getPB");
    await this.$store.dispatch("getDV");
    await this.$store.dispatch("getCQ");
    await this.$store.dispatch("getCD");
  },
};
</script>
<style scoped>
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
