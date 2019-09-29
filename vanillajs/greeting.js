// querySelector
const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING_CN= "showing"; 

function saveName(text) {
  // localStorage에 저장
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  // 입력 폼 보여주고 event listener 대기
  form.classList.add(SHOWING_CN);
  // vanilla js event listener
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Heelo ${text}`;
}

function init() {
  // 현재 사용자 정보
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null) {
    // 사용자 묻기
    askForName();
  } else {
    // 환영인사 뿌려주기
    paintGreeting(currentUser);
  }
}

init();