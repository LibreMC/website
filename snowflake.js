const MAX_SIZE = 3; // Stars are smaller
const ELEMENTS = 200;

const canvas = document.getElementById("background");
canvas.style.width = "100vw";
canvas.style.height = "100vh";
canvas.style.backgroundColor = "transparent";
const ctx = canvas.getContext("2d");
const stars = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.top = `0px`;

const create_star = () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * MAX_SIZE + 1, // Minimum size of 1 for better visibility
    opacity: Math.random(), // Initial random opacity for blinking
    blinkSpeed: Math.random() * 0.02  // Random blink speed
});

const draw_star = star => {
    ctx.beginPath();
    ctx.rect(star.x, star.y, star.size, star.size);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`; // White with dynamic opacity
    ctx.fill();
    ctx.closePath();
};

const update_star = star => {
    star.opacity += star.blinkSpeed; // Gradually change opacity
    if (star.opacity > 1 || star.opacity < 0) {
        star.blinkSpeed *= -1; // Reverse blink direction at boundaries
    }
};

const delta = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    stars.forEach(star => {
        update_star(star);
        draw_star(star);
    });
    requestAnimationFrame(delta);
};

for (let i = 0; i < ELEMENTS; i++) {
    stars.push(create_star());
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars.length = 0; // Clear stars
    for (let i = 0; i < ELEMENTS; i++) {
        stars.push(create_star()); // Recreate stars for the new dimensions
    }
});

window.addEventListener("scroll", () => {
    canvas.style.top = `${window.scrollY}px`;
});

delta();