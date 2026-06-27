
//variables
const deleteAll = document.getElementById(`delete`);
const deleteSelected = document.getElementById(`deleteSelected`);
const input = document.getElementById(`input`);
const taskList = document.getElementById(`taskList`);
const addBtn = document.getElementById(`addItem`);

// what to do when press add item
addBtn.onclick = function() {
    if (input.value != "") {
        let task = document.createElement("li");
        let checkbox = document.createElement("input");
        checkbox.type="checkbox";
        task.appendChild(checkbox)
        task.appendChild(document.createTextNode(" " + input.value));     
        taskList.appendChild(task);
        input.value = "";
    }
}


//delete all 
deleteAll.onclick = function() {
    taskList.textContent = ""
}
//delete selected
deleteSelected.onclick = function() {
    for (let item of taskList.children) {
        let checkbox = item.querySelector("input[type='checkbox']");
        if (checkbox.checked) {
            item.remove();
        }
    }
}