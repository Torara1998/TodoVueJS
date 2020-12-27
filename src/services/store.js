import * as fb from "../plugins/firebase";

const getTodo = () => {
    let todosRef = fb.usersCollection.doc(fb.auth.currentUser.uid).collection("todos")
    let todos = []
    todosRef.orderBy('createdAt', 'desc').onSnapshot(snap => {
        snap.docChanges().forEach(change => {
            var todo = change.doc.data();
            if (change.type === 'added')
                todos.push({
                    id: change.doc.id,
                    items: todo.items,
                    title: todo.title,
                    done: todo.done,
                    createdAt: todo.createdAt
                })
            if (change.type === 'modified') {
                const index = todos.findIndex(item => item.id == change.doc.id)
                todos.splice(index, 1, {
                    'id': change.doc.id,
                    'title': todo.title,
                    'items': todo.items,
                    'done': todo.done,
                    'createdAt': todo.createdAt,
                })

            }
        })
    })
    return todos
}

const addTodo = (todo) => {
    const ref = fb.usersCollection.doc(fb.auth.currentUser.uid).collection("todos")
    let uid = ref.doc()
    ref.add({
        id: uid.id,
        title: todo.title,
        createdAt: todo.createdAt,
        done: todo.done,
        items: todo.items
    })
}

const updateTodo = (todo) => {
    
    const ref = fb.usersCollection.doc(fb.auth.currentUser.uid).collection("todos")
    ref.doc(todo.id).update({
        title: todo.title,
        items: todo.items,
        done: todo.done
    })
}

const deleteTodo = (todoId) => {
    const ref = fb.usersCollection.doc(fb.auth.currentUser.uid).collection("todos")
    ref.doc(todoId).delete()
}


const addItem = (title, payload) => {

}

const updateItem = (index, payload) => {

}

const deleteItem = (index) => {

}



export { getTodo, addTodo, updateItem, updateTodo, addItem, deleteItem, deleteTodo }