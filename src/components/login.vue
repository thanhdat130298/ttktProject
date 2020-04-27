<template>
  <v-app id="inspire">
    <v-content class="image">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="dark" dark flat>
                <v-toolbar-title>Login </v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-icon>mdi-account-circle</v-icon>
                  <v-text-field
                    label="ID"
                    name="id"
                    solo
                    type="text"
                    v-model="id"
                    @change="onInputChange"
                  />
                  <v-icon>mdi-account-box</v-icon>
                  <v-text-field
                    label="ĐƠN VỊ"
                    name="donvi"
                    solo
                    v-model="unit"
                    type="text"
                    disabled="disabled"
                  />
                  <v-icon>mdi-account</v-icon>
                  <v-text-field
                    label="LOGIN"
                    solo
                    name="login"
                    type="text"
                    v-model="username"
                  />

                  <v-icon>mdi-lock</v-icon>
                  <v-text-field
                    id="password"
                    solo
                    label="PASSWORD"
                    name="password"
                    type="password"
                    v-model="password"
                  />
                </v-form>
              </v-card-text>
              <v-progress-circular
                class="err"
                v-if="clicked"
                :size="20"
                indeterminate
              ></v-progress-circular>
              <div class="err">
                {{ err }}
              </div>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" large v-on:click.prevent="login">Login</v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
export default {
  props: {
    source: String,
  },
  name: "login",
  data() {
    return {
      drawer: null,
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
      await this.$store
        .dispatch("getUnit", this.id)
        .then(() => {
          this.err = "";
        })
        .catch(() => {
          this.err = "Id is not exist!";
        });
      this.unit = this.$store.state.name;
    },
    login() {
      let object = {
        username: this.username + "_" + this.id,
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
.err {
  color: red;
  text-align: center;
  width: 100% !important;
}
.image {
  background-image: url("../assets/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  left: 0;
  bottom: 0;
}
</style>
