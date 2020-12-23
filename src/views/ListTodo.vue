<template>
  <div
    style="
    height: 500px;
    overflow: auto;
    overflow-x: hidden;
"
  >
    <div
      class="row justify-content-md-center flex-rơw-reverse"
      v-for="(todo, index) in todos"
      :key="todo.id"
    >
      <div class="col-6 todo-container">
        <todo
          :todo="todo"
          :index="index"
          @removeTodo="removeTodo"
          @updateTodo="updateTodo"
        ></todo>
      </div>
    </div>
    <div class="mt-3">
      <button
        type="button"
        data-toggle="modal"
        data-target="#exampleModal"
        class="btn btn-success add-todo"
      >
        <i class="fa fa-plus"></i>
      </button>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                v-model="newTodo"
                id="input_new-todo"
                placeholder="Input new todo"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="resetInput"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="addTodo">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Todo from "../components/Todo";
import { getTodo, addTodo, deleteTodo, updateTodo } from "../services/store";
export default {
  components: {
    Todo
  },
  data() {
    return {
      todos: [
        {
          id: 1,
          title: "todo1",
          isFinished: true,
          createdAt: Date.now().toString(),
          items: [
            { id: 1, title: "Fix UI", isFinished: true },
            { id: 2, title: "Testing", isFinished: false },
            { id: 3, title: "Re-check", isFinished: true }
          ]
        },
        {
          id: 2,
          title: "Work to do",
          isFinished: true,
          createdAt: Date.now().toString(),
          items: [
            { id: 1, title: "Fix UI", isFinished: false },
            { id: 2, title: "Testing", isFinished: false },
            { id: 3, title: "Re-check", isFinished: true }
          ]
        },
        {
          id: 3,
          title: "Must done!",
          isFinished: true,
          createdAt: Date.now().toString(),
          items: [
            { id: 1, title: "Fix UI", isFinished: true },
            { id: 2, title: "Testing", isFinished: false },
            { id: 3, title: "Re-check", isFinished: true }
          ]
        }
      ],
      newTodo: "",
      isAdding: false
    };
  },
  created() {
    this.todos = getTodo();
  },
  methods: {
    addTodo() {
      if (this.newTodo != "") {
        let newTodoObj = {
          title: this.newTodo,
          isFinished: false,
          items: [],
          createdAt: new Date()
        };
        // this.todos.push(newTodoObj);
        addTodo(newTodoObj);
        this.resetInput();
      }
    },
    resetInput() {
      this.newTodo = "";
    },
    removeTodo(todoId) {
      const index = this.todos.findIndex(todo => todo.id == todoId);
      if (index >= 0) {
        this.todos.splice(index, 1);
        deleteTodo(todoId)
      }
    },
    updateTodo(payload) {
      // this.todos.splice(payload.index, 1, payload.todo);
      updateTodo(payload.todo)
    }
  }
};
</script>

<style>
.todo-container {
  border: 1px solid rgb(204, 203, 203);
  padding: 20px;
}
.add-todo {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 1px solid rgb(128, 126, 126);
  font-size: 20px;
}
#input_new-todo {
  width: 100%;
  height: 40px;
}
</style>
