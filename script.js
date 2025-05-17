gsap.registerPlugin(ScrollTrigger);

// Hiệu ứng fade-in cho section 1
gsap.from(".fade-in", {
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.3,
  ease: "power2.out"
});

// Hiệu ứng scroll reveal cho các section
gsap.utils.toArray(".scroll-reveal").forEach(element => {
  gsap.from(element, {
    opacity: 0,
    y: 100,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });
});

// Hiệu ứng hoa rơi
const canvas = document.getElementById("flowerCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const flowers = [];
const flowerCount = window.innerWidth < 768 ? 30 : 50; // Giảm hoa trên mobile

function createFlower() {
  return {
    x: Math.random() * canvas.width,
    y: -10,
    size: Math.random() * 10 + 5,
    speed: Math.random() * 2 + 1,
    rotation: Math.random() * 360,
    rotationSpeed: Math.random() * 5 - 2.5
  };
}

for (let i = 0; i < flowerCount; i++) {
  flowers.push(createFlower());
}

function drawFlower(flower) {
  ctx.save();
  ctx.translate(flower.x, flower.y);
  ctx.rotate((flower.rotation * Math.PI) / 180);
  ctx.fillStyle = "#ff99cc";
  ctx.beginPath();
  ctx.moveTo(0, -flower.size);
  for (let i = 0; i < 5; i++) {
    ctx.rotate((Math.PI * 2) / 5);
    ctx.lineTo(0, -flower.size);
    ctx.rotate((Math.PI * 2) / 10);
    ctx.lineTo(0, -flower.size * 0.5);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function animateFlowers() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  flowers.forEach(flower => {
    flower.y += flower.speed;
    flower.rotation += flower.rotationSpeed;
    if (flower.y > canvas.height + flower.size) {
      Object.assign(flower, createFlower());
      flower.y = -10;
    }
    drawFlower(flower);
  });
  requestAnimationFrame(animateFlowers);
}

animateFlowers();

// Xử lý nút đồng ý và không
const acceptButton = document.getElementById("acceptButton");
const rejectButton = document.getElementById("rejectButton");
const response = document.getElementById("response");

acceptButton.addEventListener("click", () => {
  response.classList.remove("hidden");
  response.classList.add("show");
  gsap.fromTo(
    response,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
  );
});

rejectButton.addEventListener("click", () => {
  const maxX = window.innerWidth - rejectButton.offsetWidth - 20;
  const maxY = window.innerHeight - rejectButton.offsetHeight - 20;
  const newX = Math.random() * maxX;
  const newY = Math.random() * maxY;
  rejectButton.style.position = "absolute";
  rejectButton.style.left = `${newX}px`;
  rejectButton.style.top = `${newY}px`;
});

// Resize canvas
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});