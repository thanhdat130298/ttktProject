<template>
  <div class="login">
    <form>
      <h2>LOGIN</h2>

      <p class="id">
        <label><div class="label">ID of unit:</div></label>
        <input
          type="text"
          name="id"
          class="inputid"
          @change="onInputChange"
          placeholder="ID..."
          v-model="id"
        />
      </p>
      <p class="unit">
        <label for="unit"><div class="label">Unit:</div></label>
        <input
          type="text"
          name="id"
          placeholder="Unit..."
          v-model="unit"
          disabled
        />
      </p>
      <p class="username">
        <label for="user"><div class="user">Username:</div> </label>
        <input
          type="text"
          name="user"
          v-model="username"
          class="input"
          placeholder="Username..."
        />
      </p>
      <p class="password">
        <label for="pass"><div class="label">Password:</div> </label>
        <input
          type="password"
          name="pass"
          id="pass"
          v-model="password"
          class="input"
          placeholder="Password..."
        />
      </p>
      <div class="err">{{ err }} {{ error }}</div>
      <div class="loader" v-if="clicked"></div>
      <button v-on:click.prevent="login">LOGIN</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      clicked: false,
      err: "",
      id: "",
      unit: "",
      password: "",
      username: "",
      error: "",
      ok: true,
    };
  },
  methods: {
    async onInputChange() {
      await this.$store.dispatch("getUnit", this.id);
      this.unit = this.$store.state.name;
    },
    login() {
      let object = {
        username: this.username,
        password: this.password,
        maDonVi: this.id,
      };
      if (!this.username || !this.password || !this.id) {
        this.err = "Login false!";
        this.ok = false;
      } else this.err = "";
      if (this.ok) {
        this.clicked = true;
        this.$store.dispatch("login", object);
      }
    },
  },
};
</script>
<style scoped>
.loader {
  margin: 0 auto;
  border: 5px solid #f3f3f3;
  border-radius: 20%;
  border-top: 5px solid #3498db;
  width: 10px;
  height: 10px;
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
button:active {
  background-color: white;
  color: #555555;
  transition: 100ms;
  font-weight: bold;
}
.err {
  height: 20px;
  color: red;
  font-weight: bold;
}
form {
  background-color: rgba(190, 190, 190, 0.4);
  margin: 0 auto;
  width: 30%;
  color: white;
  border-radius: 10px;
  border: 1px solid #fff;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input {
  width: 80%;
  padding: 12px 20px;
  margin: 8px 0;
  margin: 0 auto;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 30%;
  background-color: #555555;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.login {
  
  background-image: url("../assets/bg.jpg"); 
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 0;
  bottom: 0;
  padding: 50px;
  left: 0;
  right: 0;
}
</style>
