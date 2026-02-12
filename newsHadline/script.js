setInterval(() => {
  console.log("Hello World");
}, 3000);

let newsHeadlines = [
  "AI Is Rewriting the Future of Education 1 ",
  "The Rise of Web3: Hype or the Next Internet Revolution? 2 ",
  "Why Gen Z Is Redefining the Startup Game 3 ",
  "Can India Become the Global Tech Superpower by 2035? 4 ",
  "The Psychology Behind Viral Content in 2026 5  "
];

let headlineElement = document.getElementById("newshead");
let divbackground = document.getElementById("newsbox");
let index = 0;

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updateHeadline() {
    headlineElement.textContent = newsHeadlines[index];
    index = (index + 1) % newsHeadlines.length;
        // Change background color randomly
    divbackground.style.backgroundColor = getRandomColor();

    }

setInterval(updateHeadline, 3000);



