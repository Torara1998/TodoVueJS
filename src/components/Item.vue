<template>
  <div class="d-flex flex-row row align-items-center">
    <div
      v-if="!isEdittingItem"
      class="col-lg-6"
      :class="item.done ? 'todo-done' : 'todo-not-done'"
    >
      <input
        class="float-left item-checkbox"
        type="checkbox"
        @change="checkFinished(index)"
        :checked="item.done"
      />
      <span @dblclick="toggleEditItem(true)">{{ item.name }}</span>
    </div>
    <div v-else>
      <input
        type="text"
        class="form-control"
        v-model="editItemName"
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
      <button class="btn" @click="removeItem(index, item.id)">
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
      editItemName: this.item.name
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
      if (this.editItemName != "") {
        let newItem = {
          id: this.item.id,
          name: this.editItemName,
          done: this.item.done
        };
        this.$emit("updateItem", { index: this.index, item: newItem });
        this.toggleEditItem(false);
      }
    },
    removeItem(index, itemId) {
      this.$emit("removeItem", { index: this.index, itemId: itemId });
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
