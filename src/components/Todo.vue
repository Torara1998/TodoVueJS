<template>
  <div>
    <div class="d-flex flex-row mt-3 mb-3 row align-items-center">
      <p class="h4 todo-title col-lg-6">{{ todo.title }}</p>
      <div class="col-lg-6">
        <button class="btn btn-warning"><i class="fa fa-edit"></i></button>
        <button class="btn btn-danger" @click="removeTodo(todo.id)">
          <i class="fa fa-remove"></i>
        </button>
        <button
          class="btn btn-info"
          data-toggle="collapse"
          :data-target="'#collapseExample' + todo.id"
          aria-expanded="true"
          :aria-controls="'collapseExample' + todo.id"
        >
          <i class="fa fa-chevron-down"></i>
        </button>
      </div>
    </div>
    <div class="progress mt-2">
      <div
        class="progress-bar"
        role="progressbar"
        :style="getProgressTodo"
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
    <div class="collapse" :id="'collapseExample' + todo.id">
      <ul class="list-group mt-3">
        <li
          class="list-group-item"
          v-for="(item, index) in todo.items"
          :key="item.id"
        >
          <div class="d-flex flex-row row align-items-center">
            <div
              v-if="!isEditting"
              class="col-lg-6"
              :class="item.isFinished ? 'todo-done' : 'todo-not-done'"
            >
              <input
                class="float-left item-checkbox"
                type="checkbox"
                @change="checkFinished(index)"
                :checked="item.isFinished"
              />
              <span>{{ item.title }}</span>
            </div>
            <div v-else>
              <input
                type="text"
                class="form-control"
                v-model="editItem"
                :id="'input_edit-item' + item.id"
                placeholder="Press Enter to add. Esc to cancel"
                @keypress.enter="updateItem"
                @keydown.esc="toggleInput(false)"
              />
            </div>
            <div class="col-lg-6">
              <button class="btn" @click="toggleEdit">
                <i class="fa fa-edit"></i>
              </button>
              <button class="btn" @click="removeItem(index)">
                <i class="fa fa-remove"></i>
              </button>
            </div>
          </div>
        </li>
      </ul>
      <div class="form-group mt-3" v-show="isAdding">
        <input
          type="text"
          class="form-control"
          v-model="newItem"
          :id="'input_new-item' + todo.id"
          placeholder="Press Enter to add. Esc to cancel"
          @keypress.enter="addItem"
          @keydown.esc="toggleInput(false)"
        />
      </div>
      <div class="mt-3" v-show="!isAdding">
        <button
          type="button"
          class="btn btn-outline-primary add-item"
          @click="toggleInput(true)"
        >
          <i class="fa fa-plus"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["todo"],
  data() {
    return {
      isAdding: false,
      newItem: "",
      editItem: "",
      isEditting: false
    };
  },
  computed: {
    getProgressTodo() {
      let a = this.todo.items.length;
      let countDone = 0;
      this.todo.items.forEach(item => {
        if (item.isFinished) countDone++;
      });
      return {
        width: (countDone / a) * 100 + "%"
      };
    }
  },
  methods: {
    checkFinished(index) {
      this.todo.items[index].isFinished = !this.todo.items[index].isFinished;
    },
    removeTodo(todoId) {
      this.$emit("removeTodo", todoId);
    },
    toggleInput(value) {
      this.isAdding = value;
    },
    addItem() {
      if (this.newItem != "")
        this.todo.items.push({
          id: this.todo.items.length + 1,
          title: this.newItem,
          isFinished: false
        });
      this.newItem = "";
    },
    removeItem(index) {
      if (index >= 0) {
        this.todo.items.splice(index, 1);
      }
    },
    updateItem(index) {},
    toggleEdit() {
      this.isEditting = true;
    }
  }
};
</script>

<style>
.todo-title {
  color: #646262;
}

.item-checkbox {
  transform: scale(2);
}

.todo-done {
  text-decoration: line-through;
  opacity: 0.5;
}
.todo-not-done {
  text-decoration: none;
}
.add-item {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  font-size: 19px;
}
</style>
