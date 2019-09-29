const body = document.querySelector("body");
const IMG_NUMBER = 5;


function paintImage(imgNumber) {
    // image element 생성
    const image = new Image();
    // image src
    image.src = `images/image${imgNumber +1}.jpg`;
    image.classList.add('bgImage');
    body.prepend(image);
}
function getRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}
function init() {
    // 랜덤 image 출력
    const randomNumber = getRandom();
    paintImage(randomNumber);
}

init();