(function () {
  const canvas = document.getElementById("fireworks-canvas");
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ctx = canvas.getContext("2d");
  let particles = [];
  let width, height;
  let animationId = null;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const COLORS = ["#e3a5b8", "#c97b93", "#d9b877", "#b98a3e", "#fff3e8", "#8f2a4f"];

  function spawnBurst(x, y) {
    const count = 55;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2;
      const speed = 2.2 + Math.random() * 3.2;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.008 + Math.random() * 0.012,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 1.5 + Math.random() * 2,
      });
    }
  }

  function step() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.045; // gravity
      p.life -= p.decay;
      if (p.life > 0) {
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    particles = particles.filter((p) => p.life > 0 && p.y < height + 40);
    ctx.globalAlpha = 1;

    if (particles.length > 0) {
      animationId = requestAnimationFrame(step);
    } else {
      animationId = null;
    }
  }

  function ensureAnimating() {
    if (animationId === null) {
      animationId = requestAnimationFrame(step);
    }
  }

  function randomBurstPoint() {
    return {
      x: width * (0.15 + Math.random() * 0.7),
      y: height * (0.15 + Math.random() * 0.35),
    };
  }

  function celebrate(burstCount) {
    if (prefersReducedMotion) return;
    let i = 0;
    const interval = setInterval(() => {
      const { x, y } = randomBurstPoint();
      spawnBurst(x, y);
      ensureAnimating();
      i++;
      if (i >= burstCount) clearInterval(interval);
    }, 260);
  }

  // One orchestrated moment on page load.
  window.addEventListener("load", () => {
    if (prefersReducedMotion) return;
    setTimeout(() => celebrate(4), 500);
  });

  const btn = document.getElementById("celebrate-btn");
  if (btn) {
    btn.addEventListener("click", () => celebrate(5));
  }
})();
