const todoControl = document.querySelector(".todo-control"); 
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

let todoData = [];

const render = function(){
    todoCompleted.innerHTML = "";
    todoList.innerHTML = "";
    
    todoData.forEach(function(item,index){
        const li = document.createElement('li');
        li.classList.add("todo-item");
        li.innerHTML = '<span class="text-todo">' + item.text + "</span>" + '<div class="todo-buttons">' + 
        '<button class="todo-remove"></button>' + 
        '<button class="todo-complete"></button>' + '</div>';

        if(item.completed && !item.remove) {
            todoCompleted.append(li);
            localStorage.setItem("todoData", JSON.stringify(todoData));
        } else if(!item.remove){
            todoList.append(li);
            localStorage.setItem("todoData", JSON.stringify(todoData));
        } 

        li.querySelector(".todo-complete").addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });
        li.querySelector(".todo-remove").addEventListener('click', function(){
            item.remove = true;
            todoData.splice(index, 1);
            render();
        });
        
    });
};

const firstTime = function(){
    if(localStorage.key("todoData")){
        todoData = JSON.parse(localStorage.getItem("todoData"));
        render();
    }
};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    
    const newTodo = {
        text: headerInput.value,
        completed: false,
        remove: false
    };
    
    if(newTodo.text.trim() == ""){
        alert("Введите задачу");
    } else {
        todoData.push(newTodo);
    }
    headerInput.value = "";
    render();
});
firstTime();