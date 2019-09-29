const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

function filterFn(toDo) {
    return toDo.id === 1;
}

let toDos = [];

function deleteToDo(event) {
  // event가 발생한 곳을 찾을때 사용(event.target)
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  // object filter
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    // vanilla js create DOM
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "❌";
    // delete button click event listener
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    li.appendChild(span);
    li.id = newId;
    li.appendChild(delBtn);
    toDoList.appendChild(li);
    // todoObj 
    const toDoObj = {
        text: text,
        id: newId
    }
    // toDos obj push
    toDos.push(toDoObj);
    // save toDos into localStorage
    saveToDos();
}
function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    // localStorage에서 정보 get
    const loadedToDos   = localStorage.getItem(TODOS_LS);

    // todo가 있는 경우
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        // forEach
        parsedToDos.forEach(function(todo) {
            // 뿌려주기
            paintToDo(todo.text);
        });
    }
}

function init() {
    // 할일 정보 가져오기 & 입력시 event listener
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();