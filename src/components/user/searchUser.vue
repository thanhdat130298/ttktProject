<template>
  <div>
    <form>
      <div class="group">
        <input
          type="text"
          placeholder="Tên đăng nhập: "
          v-model="object.login"
        />
      </div>
      <div class="group">
        <input
          type="text"
          placeholder="Tên hiển thị"
          v-model="object.tenHienThi"
        />
      </div>
      <div class="group">
        <select name="chucdanh" v-model="object.chucDanh">
          <option selected value="">--Choose--</option>
          <option
            v-for="cDanh in CD.content"
            v-bind:key="cDanh.id"
            v-bind:value="cDanh.chucDanh"
          >
            {{ cDanh.chucDanh }}
          </option>
        </select>
      </div>
      <div class="group">
        <input
          type="text"
          placeholder="Đơn vị công tác"
          v-model="object.tenNghiepVu"
        />
      </div>
      <div class="group">
        <input
          type="text"
          placeholder="Nhóm quyền ID"
          v-model="object.authorityId"
        />
      </div>
      <button class="search" v-on:click.prevent="search">SEARCH</button>
      <button class="search" v-on:click.prevent="cancel">Cancel search</button>
      <div class="loader" v-if="loader"></div>
    </form>
    <div class="err">{{ err }}</div>
    <div class="err">{{ resultSearch }}</div>
    <div v-if="length > 0">
      {{ length }} result(s), {{ parseInt(length / 25) + 1 }} pages
    </div>
  </div>
</template>
<script>
export default {
  name: "search",
  props: ["currentPage"],
  data() {
    return {
      length: "",
      err: "",
      showSearch: false,
      loader: false,
      resultSearch: "",
      object: {
        dmbhxhId: "",
        login: "",
        tenHienThi: "",
        chucDanh: "",
        tenNghiepVu: "",
        authorityId: "",
        page: 0,
      },
    };
  },
  computed: {
    CD() {
      return this.$store.getters.CD;
    },
  },
  methods: {
    async cancel() {
      let page1 = 0;
      await this.$store.dispatch("getAllUser");
      await this.$store.dispatch("getUserByPage", page1);
      this.$emit("x", this.showSearch);
    },
    search() {
      this.object.dmbhxhId = this.$store.state.dmbhxhId;
      // console.log(this.object);
     
        (this.loader = true),
        this.$emit("y")
        this.resultSearch = this.$store.state.searchResult;
        console.log(this.object);

        console.log(this.resultSearch);

        this.length = this.$store.state.length;
        (this.loader = false), (this.err = "");
      
    },
  },
  created() {
    this.$store.dispatch("getCD");
    this.$store.dispatch("getIddm");
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
.err {
  color: red;
}
form {
  border: 2px solid #4caf50;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
  padding-bottom: 20px;
  box-sizing: border-box;
}
input[type="text"],
select,
option {
  float: left;
  width: 30%;
  margin: 1%;
  padding: 12px 20px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.search {
  color: white;
  width: 30%;
  margin-bottom: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
}
</style>
