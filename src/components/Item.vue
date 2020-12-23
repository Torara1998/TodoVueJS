<template>
  <div class="d-flex flex-row row align-items-center">
    <div
      v-if="!isEdittingItem"
      class="col-lg-6"
      :class="item.isFinished ? 'todo-done' : 'todo-not-done'"
    >
      <input
        class="float-left item-checkbox"
        type="checkbox"
        @change="checkFinished(index)"
        :checked="item.isFinished"
      />
      <span @dblclick="toggleEditItem(true)">{{ item.title }}</span>
    </div>
    <div v-else>
      <input
        type="text"
        class="form-control"
        v-model="editItemTitle"
        :id="'input_edit-item' + item.id"
        placeholder="Press Enter to add. Esc to cancel"
        @keypress.enter="updateItem(item)"
        @keydown.esc="toggleEditItem(false)"
      />
    </div>
    <div class="col-lg-6">
      <button class="btn" @click="toggleEditItem(true)">
        <i class="fa fa-edit"></i>
      </button>
      <button class="btn" @click="removeItem(index)">
        <i class="fa fa-remove"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item", "index"],
  data() {
    return {
      isEdittingItem: false,
      editItemTitle: this.item.title
    };
  },
  methods: {
    checkFinished(index) {
      this.$emit("checkFinished", index);
    },
    toggleEditItem(value) {
      this.isEdittingItem = value;
    },
    updateItem(item) {
      if (this.editItemTitle != "") {
        let newItem = {
          id: this.item.id,
          title: this.editItemTitle,
          isFinished: this.item.isFinished
        };
        this.$emit("updateItem", { index: this.index, item: newItem });
        this.toggleEditItem(false);
      }
    },
    removeItem(index) {
      this.$emit("removeItem", index);
    }
  }
};
</script>

<style>
.todo-done {
  text-decoration: line-through;
  opacity: 0.5;
}
.todo-not-done {
  text-decoration: none;
}
</style>
