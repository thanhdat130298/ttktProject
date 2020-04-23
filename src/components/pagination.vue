<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button
        type="button"
        class="double"
        @click="onClickFirstPage"
        :disabled="isInFirstPage"
      >
        First
      </button>
    </li>

    <li class="pagination-item">
      <button
        type="button"
        class="double"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
      >
        Prev
      </button>
    </li>

    <li v-for="page in pages" class="pagination-item" v-bind:key="page.name">
      <button
        type="button"
        class="buttonNum"
        @click="onClickPage(page.name)"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }"
      >
        {{ page.name }}
      </button>
    </li>

    <li class="pagination-item">
      <button
        type="button"
        class="double"
        @click="onClickNextPage"
        :disabled="isInLastPage"
      >
        Next
      </button>
    </li>

    <li class="pagination-item">
      <button
        type="button"
        class="double"
        @click="onClickLastPage"
        :disabled="isInLastPage"
      >
        Last
      </button>
    </li>
  </ul>
</template>
<script>
export default {
  name: "pagination",

  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isInFirstPage() {
      return this.currentPage === 0;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
    startPage() {
      // When on the first page
      if (this.currentPage === 0) {
        return 0;
      }
      // When on the last page
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }
      // When in between
      return this.currentPage - 1;
    },
    pages() {
      const range = [];

      for (
        let i = this.startPage;
        i <=
        Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        i += 1
      ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }

      return range;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit("pagechanged", 0);
    },
    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit("pagechanged", this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  },
};
</script>
<style>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}
button {
  border: 1px solid #4caf50;
  margin-left: 2px;
  height: 40px;
  outline: none;
  background-color: #fff;
  color: #4caf50;
}
.buttonNum:focus {
  background-color: #fff;
  color: #4caf50;
}
.buttonNum {
  width: 30px;
  font-size: 15px;
}
.double {
  width: 70px;
}
.active {
  background-color: #4aae9b;
  color: #ffffff;
}
</style>
