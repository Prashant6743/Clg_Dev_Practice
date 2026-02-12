const diceImgs = [
    "src/one.png",
    "src/two.png",
    "src/three.png",
    "src/four.png",
    "src/five.png",
    "src/six.png"
]

const diceImg = document.getElementById("diceImg");

const rollBtn = document.getElementById("rollBtn");

rollBtn.addEventListener("click", () => {
    const randomNum = Math.floor(Math.random() * 6);
     diceImg.src = diceImgs[randomNum];
})