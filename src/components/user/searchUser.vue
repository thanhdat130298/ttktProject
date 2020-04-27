<template>
  <v-app id="inspire" class="search">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-card shaped>
      <v-form>
        <v-text-field
          class="field1"
          type="text"
          label="Tên đăng nhập: "
          v-model="object.login"
        />
        <v-text-field
          class="field2"
          type="text"
          label="Tên hiển thị"
          v-model="object.tenHienThi"
        />
        <v-text-field
          class="field5"
          type="text"
          label="Nhóm quyền ID"
          v-model="object.authorityId"
        />

        <v-text-field
          class="field4"
          type="text"
          label="Đơn vị công tác"
          v-model="object.tenNghiepVu"
        />
        <v-select
          class="field3"
          :label="empty"
          :items="CD.content"
          item-value="chucDanh"
          v-model="object.chucDanh"
          item-text="chucDanh"
        ></v-select>
        <div class="field6">
          <v-btn
            class="search1 "

            large
            v-on:click.prevent="search"
            color="primary"
            >SEARCH</v-btn
          >
          <v-btn
            class="search2 mx-10"
            large
            v-on:click.prevent="clear"
            color="primary"
            
            >CLEAR</v-btn
          >
        </div>
      </v-form>
    </v-card>
    <div class="err">{{ err }}</div>
    <div class="err">{{ resultSearch }}</div>
  </v-app>
</template>
<script lang="ts">
export default {
  name: "search",
  props: ["currentPage"],
  data() {
    return {
      empty: "Chức danh",
      length: "",
      err: "",
      page: this.currentPage,
      overlay: false,
      resultSearch: "",
      object: {
        dmbhxhId: "",
        login: "",
        tenHienThi: "",
        chucDanh: "",
        tenNghiepVu: "",
        authorityId: "",
        page: 1,
      },
    };
  },
  computed: {
    CD() {
      return this.$store.getters.CD;
    },
  },
  methods: {
    async clear() {
      this.overlay = true;
      this.object.login = "";
      this.object.tenHienThi = "";
      this.object.chucDanh = "";
      this.object.tenNghiepVu = "";
      this.object.authorityId = "";

      this.$emit("currentPage", (this.page = 1));
      await this.$store.dispatch("searchAll", this.object);
      await this.$store.dispatch("searchUser", this.object);
      this.resultSearch = "";
      this.overlay = false;
    },
    async search() {
      //typescript---vuetify
      this.overlay = true;
      this.length = this.$store.state.length;
      this.$emit("length", this.length); //tong so trang
      this.$emit("currentPage", (this.page = 1));

      this.object.page = 1;

      await this.$store.dispatch("searchAll", this.object);
      await this.$store.dispatch("searchUser", this.object);
      this.overlay = false;

      this.resultSearch = this.$store.state.searchResult;

      this.err = "";
    },
  },
  mounted() {
    this.object.login = "";
    this.object.tenHienThi = "";
    this.object.chucDanh = "";
    this.object.tenNghiepVu = "";
    this.object.authorityId = "";
    this.object.dmbhxhId = this.$store.state.dmbhxhId;
    this.$emit("object", this.object);
  },
  created() {
    this.$store.dispatch("getCD");
    this.$store.dispatch("getIddm");
  },
};
</script>
<style scoped>
.search {
  min-height: 0 !important;
}

.err {
  color: red;
}
.field1 {
  margin-left: 5%;
  width: 40% !important;
  float: left;
}
.field2 {
  margin-left: 9%;
  float: left;
  margin-left: 9%;
  width: 40% !important;
}
.field3 {
  margin-left: 5%;
  width: 40% !important;
  float: left;
}
.field4 {
  margin-left: 9%;
  width: 40% !important;
  float: left;
}
.field5 {
  margin-left: 5%;
  width: 40% !important;
  float: left;
}
.field6 {
  margin-left: 9%;
  width: 40% !important;
  float: left;
}
</style>
