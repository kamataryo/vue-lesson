const initialData = {
  message: 'Hello,  Vue!',
  todos: [
    { text: '卵を買う', done: true },
    { text: '猫にご飯をあげる', done: false },
  ],
  editing: '洗濯物をほす',
  addNew: function () {
    if (!this.editing) {
      return
    }
    this.todos.push({ text: this.editing, done: false })
    this.editing = ''
  },
  toggleMe: function (index) {
    return () => {
      const newTodos = [...this.todos]
      newTodos[index] = {
        ...this.todos[index],
        done: !this.todos[index].done,
      }
      this.todos = newTodos
    }
  },
  deleteMe: function (index) {
    return () => {
      this.todos.splice(index, 1)
    }
  },
}

Vue.component('todo-item', {
  template: `
    <span>
      <span v-if="done" style="text-decoration: line-through;">{{ text }}</span>
      <span v-else>{{ text }}</span>
      <button v-on:click="onDoneClick">
        {{ done ? 'undone' : 'done' }}
      </button>
      <button v-on:click="onDeleteClick">delete</button>
    </span>
  `,
  props: {
    text: String,
    done: Boolean,
    onDoneClick: Function,
    onDeleteClick: Function,
  },
})

Vue.component('todos', {
  template: `
    <div>
      <h1>{{ message }}</h1>
      <ol>
        <li v-for="(todo, index) in todos">
          <todo-item
            :text="todo.text"
            :done="todo.done"
            :onDoneClick="toggleMe(index)"
            :onDeleteClick="deleteMe(index)"
          >
          </todo-item>
        </li>
      </ol>
      <input @keyup.13="addNew()" v-model="editing" />
    </div>
  `,
  data: function () {
    return initialData
  },
})

const vmApp1 = new Vue({
  el: '#app',
})
