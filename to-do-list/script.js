
    let taskListArr = [];

    function handleTask() {
      let idInput = document.getElementById("taskId");
      let titleInput = document.getElementById("taskTitle");

      let idVal = parseInt(idInput.value);
      let titleVal = titleInput.value.trim();

      if (!idVal || idVal < 1 || titleVal === "") {
        alert("Invalid Fields");
        return;
      }

      taskListArr.push({
        id: idVal,
        title: titleVal,
        status: "pending"
      });

      renderList();

      idInput.value = "";
      titleInput.value = "";
    }

    function renderList() {
      let taskList = document.getElementById("taskList");
      taskList.innerHTML = "";

      taskListArr.forEach(function(task, index) {

        let li = document.createElement("li");

        let idText = document.createElement("b");
        idText.innerText = task.id + " ";

        let titleSpan = document.createElement("span");
        titleSpan.innerText = task.title;

        // Apply line-through using JS
        if (task.status === "done") {
          titleSpan.style.textDecoration = "line-through"; 
        } else {
          titleSpan.style.textDecoration = "none";
        }

        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.onclick = function() {
          handleEdit(index);
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.onclick = function() {
          handleDelete(index);
        };

        let statusBtn = document.createElement("button");
        statusBtn.innerText =
          task.status === "done" ? "Undo" : "Mark as Done";

        statusBtn.onclick = function() {
          handleStatus(index);
        };

        li.appendChild(idText);
        li.appendChild(titleSpan);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        li.appendChild(statusBtn);

        taskList.appendChild(li);
      });
    }

    function handleDelete(index) {
      taskListArr.splice(index, 1);
      renderList();
    }

    function handleEdit(index) {
      let updatedTitle = prompt("Enter Updated Task Title");

      if (!updatedTitle || updatedTitle.trim() === "") {
        alert("Title cannot be empty");
        return;
      }

      taskListArr[index].title = updatedTitle.trim();
      renderList();
    }

    function handleStatus(index) {
      if (taskListArr[index].status === "pending") {
        taskListArr[index].status = "done";
      } else {
        taskListArr[index].status = "pending";
      }

      renderList();
    }
