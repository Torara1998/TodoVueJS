<template>
  <div>
    <div
      v-if="!isEdittingTodo"
      class="d-flex flex-row mt-3 mb-3 row align-items-center"
    >
      <p @dblclick="toggleEditTodo(true)" class="h4 todo-name col-lg-6">
        {{ todo.name }}
      </p>

      <div class="col-lg-6">
        <button class="btn btn-warning" @click="toggleEditTodo(true)">
          <i class="fa fa-edit"></i>
        </button>
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
    <input
      v-else
      @keydown.esc="toggleEditTodo(false)"
      @keypress.enter="updateTodo(todo)"
      type="text"
      class="form-control"
      v-model="editTodoName"
      placeholder="Enter to add. Esc to cancel"
    />
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
          v-for="(item, index) in items"
          :key="item.id"
        >
          <item
            :item="item"
            :index="index"
            @checkFinished="checkFinished"
            @removeItem="removeItem"
            @updateItem="updateItem"
          ></item>
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
import Item from "../components/Item";
export default {
  components: {
    Item
  },
  props: ["todo", "index"],
  data() {
    return {
      isAdding: false,
      newItem: "",
      editTodoName: this.todo.name,
      isEdittingTodo: false,
      items: []
    };
  },
  computed: {
    getProgressTodo() {
      let a = this.items.length;
      if (!a)
        return {
          width: "0%"
        };
      if (this.items) {
        let countDone = 0;
        this.items.forEach(item => {
          if (item.done) countDone++;
        });
        return {
          width: (countDone / a) * 100 + "%"
        };
      }
    }
  },
  mounted() {
    this.fetchItem();
  },
  methods: {
    fetchItem() {
      this.axios
        .get("/task_lists/" + this.todo.id + "/todos")
        .then(response => {
          this.items = response.data;
        })
        .catch(error => {});
    },
    checkFinished(index) {
      let item = this.items[index];
      this.axios
        .put("/task_lists/" + this.todo.id + "/todos/" + item.id, {
          done: !item.done
        })
        .then(response => {
          this.items[index].done = !this.items[index].done;
        })
        .catch(error => {});
    },
    removeTodo(todoId) {
      this.$emit("removeTodo", todoId);
    },
    toggleInput(value) {
      this.isAdding = value;
    },
    addItem() {
      if (this.newItem != "")
        this.axios
          .post("/task_lists/" + this.todo.id + "/todos", {
            name: this.newItem,
            done: false
          })
          .then(response => {
            this.items.push({
              id: response.data.id,
              name: response.data.name,
              done: false
            });
          })
          .catch(error => {});
      this.newItem = "";
    },
    removeItem(payload) {
      if (confirm("Do you really want to delete?")) {
        this.axios
          .delete("/task_lists/" + this.todo.id + "/todos/" + payload.itemId)
          .then(response => {
            if (payload.index >= 0) {
              this.items.splice(payload.index, 1);
            }
          })
          .catch(error => {});
      }
    },

    updateTodo(todo) {
      if (this.editTodoName != "") {
        let newTodo = {
          id: this.todo.id,
          name: this.editTodoName,
          done: this.todo.done,
          items: this.todo.items,
          createdAt: this.todo.createdAt
        };
        
        this.$emit("updateTodo", { index: this.index, todo: newTodo });
        this.toggleEditTodo(false);
      }
    },
    updateItem(payload) {
      this.axios
        .put("/task_lists/" + this.todo.id + "/todos/" + payload.item.id, {
          name: payload.item.name,
          done: payload.item.done
        })
        .then(response => {
          this.items.splice(payload.index, 1, response.data);
        })
        .catch(error => {});
    },
    toggleEditTodo(value) {
      this.isEdittingTodo = value;
    }
  }
};
</script>

<style>
.todo-name {
  color: #646262;
}

.item-checkbox {
  transform: scale(2);
}

.add-item {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  font-size: 19px;
}
</style>
