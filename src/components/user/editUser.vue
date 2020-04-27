<template>
  <v-app id="inspire">
    <v-form>
      <h1>EDIT USER</h1>
      <v-row>
        <v-col class="mx-10">
          <v-text-field
            type="text"
            label="Tên đăng nhập"
            v-model="user.login"
          />

          <v-text-field type="email" label="Email" v-model="user.email" />

          <v-text-field
            type="number"
            label="Điện thoại di động"
            v-model="user.phoneNumber"
          />

          <v-text-field type="text" label="Ảnh" v-model="user.imageUrl" />
          <v-text-field
            type="text"
            label="Họ và Tên"
            v-model="user.tenHienThi"
          />

          <v-radio-group label="Giới tính" v-model="user.gioiTinh">
            <v-row>
              <v-col><v-radio label="Nam" :value="true">Nam</v-radio></v-col>
              <v-col
                ><v-radio label="Nu" :value="false">Nu</v-radio></v-col
              ></v-row
            >
          </v-radio-group>
        </v-col>
        <!-- 
      /////////////////////////////// -->
        <v-col class="mx-10">
          <v-select
            label="Nhóm quyền"
            :items="NQ"
            item-value="id"
            v-model="user.groupUserId"
            item-text="name"
          ></v-select>
          <v-select
            label="Phòng Ban"
            :items="PB"
            item-value="id"
            v-model="user.dmPhongBanId"
            item-text="tenPhongBan"
          ></v-select>

          <v-select
            label="Cơ quan tổ chức"
            :items="CQ"
            item-value="id"
            v-model="user.donViId"
            item-text="tenDonVi"
          ></v-select>

          <v-select
            label="Đơn vị nghiệp vụ"
            :items="DV"
            item-value="id"
            v-model="user.dviNghiepVuId"
            item-text="tenNghiepVu"
          ></v-select>

          <v-select
            label="Chức danh"
            :items="CD.content"
            item-value="id"
            v-model="user.chucDanhId"
            item-text="chucDanh"
          ></v-select>

          <v-radio-group label="Trạng thái hoạt động" v-model="user.activated">
            <v-row>
              <v-col
                ><v-radio label="Hoat Dong" :value="true"></v-radio></v-col
              >
              <v-col
                ><v-radio label="Khong hoat dong" :value="false"
                  ></v-radio
                ></v-col
              ></v-row
            >
          </v-radio-group>
        </v-col>
      </v-row>
      <v-btn v-on:click.prevent="edit" color="primary">EDIT</v-btn>
    </v-form>
  </v-app>
</template>
<script lang="ts">
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
        activated: null, 
        chucDanhId: null,
        dmPhongBanId: null,
        dviNghiepVuId: null,
        gioiTinh: null,
        dmTinhHuyenId: null,
        donViId: null,
        imageUrl: null,
        phoneNumber: null,
        tenHienThi: null,
        authoryties: [],
        groupUserId: null,
        newPermission: [],
        removedPermission: [],
      },
    };
  },
  mounted() {
    var item = this.$store.getters.users;
    this.user = item.find((res) => {
      return this.id == res.id;
    });
  },
  methods: {
    edit() {
      this.editUser.activated = this.user.activated;
      this.editUser.gioiTinh = this.user.gioiTinh;
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
#inspire {
  background-color: #fff;
}
</style>
