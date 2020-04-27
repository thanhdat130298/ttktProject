<template>
  <v-app id="inspire">
    <v-form>
      <h2>ADD USER</h2>
      <v-row>
        <v-col class="mx-10">
          <div class="group">
            <v-text-field
              type="text"
              label="Login"
              v-model="infor.login"
              class="right"
            />
          </div>
          <div class="group">
            <v-text-field
              type="password"
              label="Password"
              v-model="infor.password"
            />
          </div>
          <div class="group">
            <v-text-field
              type="password"
              label="Re-Password"
              v-model="repassword"
            />
          </div>
          <div class="group">
            <v-text-field type="email" label="Email" v-model="infor.email" />
          </div>
          <div class="group">
            <v-text-field
              type="number"
              label="Phone Number"
              v-model="infor.phoneNumber"
            />
          </div>
          <div class="group">
            <v-text-field type="text" label="Image" v-model="infor.imageUrl" />
          </div>
          <div class="group">
            <div class="left space">Gioi tinh:</div>
            <v-radio-group v-model="infor.gioiTinh">
              <v-row>
                <v-col><v-radio label="Nam" value="true"></v-radio></v-col>
                <v-col><v-radio label="Nữ" value="false"></v-radio></v-col
              ></v-row>
            </v-radio-group>
          </div>
        </v-col>
        <!-- 
      /////////////////////////////// -->

        <v-col class="mx-10">
          <div class="group">
            <v-text-field
              type="text"
              label="Ten hien thi"
              v-model="infor.tenHienThi"
            />
          </div>

          <div class="group">
            <v-select
              label="Nhom quyen"
              :items="NQ"
              item-value="id"
              v-model="infor.groupUserId"
              item-text="name"
            ></v-select>
          </div>
          <div class="group">
            <v-select
              label="Phong Ban"
              :items="PB"
              item-value="id"
              v-model="infor.dmPhongBanId"
              item-text="tenPhongBan"
            ></v-select>
          </div>
          <div class="group">
            <v-select
              label="Co Quan To Chuc"
              :items="CQ"
              item-value="id"
              v-model="infor.donViId"
              item-text="tenDonVi"
            ></v-select>
          </div>
          <div class="group">
            <v-select
              label="Đơn vị nghiệp vụ"
              :items="DV"
              item-value="id"
              v-model="infor.dviNghiepVuId"
              item-text="tenNghiepVu"
            ></v-select>
          </div>
          <div class="group">
            <v-select
              label="Chức danh"
              :items="CD.content"
              v-model="infor.chucDanhId"
              item-text="chucDanh"
              item-value="id"
            ></v-select>
          </div>

          <div class="group">
            <div class="left space">Trạng thái hoạt động:</div>
            <v-radio-group v-model="infor.activated">
              <v-row>
                <v-col>
                  <v-radio label="Hoat dong" value="true"></v-radio
                ></v-col>
                <v-col
                  ><v-radio
                    label="Khong hoat dong"
                    value="false"
                  ></v-radio></v-col
              ></v-row>
            </v-radio-group>
          </div>
        </v-col>
      </v-row>

      <v-btn v-on:click.prevent="submit">THÊM NGƯỜI DÙNG</v-btn>
    </v-form>
  </v-app>
</template>
<script lang="ts">
export default {
  name: "addUser",
  data() {
    return {
      infor: {
        login: null,
        password: null,
        email: null,
        activated: true, //
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
        authoryties: [], //
        groupUserId: null,
        newPermission: [],
        removedPermission: [],
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
      checkAdd: false,
    };
  },
  methods: {
    submit() {
      const arrCQ = this.$store.getters.CQ;
      const arrNQ = this.$store.getters.NQ;

      const checkIdCQ = arrCQ.find((res) => {

        return this.infor.donViId == res.id; // loop to find object have id Co Quan
      });

      const checkIdNQ = arrNQ.find((res) => {
        // loop to find object have id Nhom quyen
        return this.infor.groupUserId == res.id;
      });
      this.infor.authoryties.push(checkIdNQ.name);
      this.infor.dmTinhHuyenId = checkIdCQ.tinhHuyen.id;

      this.$store
        .dispatch("submit", this.infor)
        .then(() => {
          location.reload();
        })
        .catch(() => {
          console.log("false");
        });
      this.$emit("close", this.checkAdd); // no re-render parent
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
</style>
