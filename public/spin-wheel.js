function createSpinWheel(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  const segments = options.segments || [];
  const onResult = options.onResult || function() {};
  const size = options.size || 340;
  const title = options.title || "Dinner Roll";
  const subtitle = options.subtitle || "Spin to decide!";

  const colors = [
    "#e07b39", "#2d6a4f", "#d4403a", "#1a6fb5",
    "#9b5de5", "#f0b429", "#e07b39", "#2d6a4f",
    "#d4403a", "#1a6fb5", "#9b5de5", "#f0b429",
    "#e07b39", "#2d6a4f", "#d4403a", "#1a6fb5"
  ];

  container.innerHTML = `
    <div class="prize-wheel-wrapper" data-testid="prize-wheel">
      <div class="prize-wheel-header">
        <div class="prize-wheel-title">${title}</div>
        <div class="prize-wheel-subtitle">${subtitle}</div>
      </div>
      <div class="prize-wheel-stage">
        <div class="prize-wheel-pointer" data-testid="wheel-pointer"></div>
        <canvas id="${containerId}-canvas" width="${size * 2}" height="${size * 2}" data-testid="wheel-canvas"></canvas>
        <div class="prize-wheel-center-cap">
          <span>ROLL</span>
        </div>
      </div>
      <div class="prize-wheel-result" id="${containerId}-result" data-testid="wheel-result">
        <div class="prize-wheel-result-text" id="${containerId}-result-text" data-testid="wheel-result-text"></div>
      </div>
      <button class="prize-wheel-spin-btn" id="${containerId}-spin-btn" data-testid="button-spin-wheel">
        <span class="spin-btn-text">SPIN</span>
      </button>
    </div>
  `;

  const canvas = document.getElementById(`${containerId}-canvas`);
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2 - 12;
  let segCount = segments.length;
  let arcSize = (2 * Math.PI) / segCount;

  let currentAngle = 0;
  let spinning = false;
  let animFrame = null;

  function drawWheel(angle) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 4, 0, 2 * Math.PI);
    ctx.strokeStyle = "#f0b429";
    ctx.lineWidth = 5;
    ctx.shadowColor = "rgba(240, 180, 41, 0.5)";
    ctx.shadowBlur = 15;
    ctx.stroke();
    ctx.restore();

    for (let i = 0; i < segCount; i++) {
      const startAngle = angle + i * arcSize;
      const endAngle = startAngle + arcSize;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();

      ctx.strokeStyle = "rgba(0,0,0,0.3)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + arcSize / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.shadowColor = "rgba(0,0,0,0.6)";
      ctx.shadowBlur = 3;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      const seg = segments[i];
      const label = seg.label || seg.name || "";
      const icon = seg.icon || "";

      const textRadius = radius - 20;
      const maxTextWidth = radius * 0.55;

      if (icon && segCount <= 10) {
        ctx.font = `bold ${Math.max(14, Math.min(20, 240 / segCount))}px sans-serif`;
        ctx.fillText(icon, textRadius, -6);
        ctx.font = `bold ${Math.max(10, Math.min(15, 200 / segCount))}px 'Segoe UI', sans-serif`;
        const truncated = truncateText(ctx, label, maxTextWidth);
        ctx.fillText(truncated, textRadius - 22, 6);
      } else {
        ctx.font = `bold ${Math.max(10, Math.min(16, 220 / segCount))}px 'Segoe UI', sans-serif`;
        const truncated = truncateText(ctx, label, maxTextWidth);
        ctx.fillText(truncated, textRadius, 5);
      }

      ctx.restore();
    }

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, 28, 0, 2 * Math.PI);
    ctx.fillStyle = "#1a0f0a";
    ctx.fill();
    ctx.strokeStyle = "#f0b429";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
  }

  function truncateText(ctx, text, maxWidth) {
    if (ctx.measureText(text).width <= maxWidth) return text;
    let t = text;
    while (t.length > 3 && ctx.measureText(t + "...").width > maxWidth) {
      t = t.slice(0, -1);
    }
    return t + "...";
  }

  function spinWheel(targetIndex) {
    if (spinning) return;
    spinning = true;

    const btn = document.getElementById(`${containerId}-spin-btn`);
    if (btn) btn.disabled = true;

    const resultEl = document.getElementById(`${containerId}-result`);
    const resultText = document.getElementById(`${containerId}-result-text`);
    if (resultEl) resultEl.classList.remove("visible");
    if (resultText) resultText.textContent = "";

    const targetAngle = -(targetIndex * arcSize + arcSize / 2) - Math.PI / 2;
    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const totalRotation = extraSpins * 2 * Math.PI + targetAngle - currentAngle;

    const duration = 4000 + Math.random() * 1000;
    const startTime = performance.now();
    const startAngle = currentAngle;

    const tickSound = createTickPlayer();

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 4);
      currentAngle = startAngle + totalRotation * eased;

      drawWheel(currentAngle);

      if (tickSound && progress < 0.85) {
        tickSound(currentAngle, arcSize);
      }

      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      } else {
        spinning = false;
        if (btn) btn.disabled = false;

        const winner = segments[targetIndex];
        if (resultText) {
          resultText.textContent = winner.label || winner.name || "";
        }
        if (resultEl) resultEl.classList.add("visible");

        pulseWheel();

        onResult(winner, targetIndex);
      }
    }

    animFrame = requestAnimationFrame(animate);
  }

  function pulseWheel() {
    const wrapper = container.querySelector(".prize-wheel-stage");
    if (wrapper) {
      wrapper.classList.add("winner-pulse");
      setTimeout(() => wrapper.classList.remove("winner-pulse"), 1500);
    }
  }

  function createTickPlayer() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      let lastSeg = -1;
      return function(angle, segAngle) {
        const normalized = (((-angle) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const segIdx = Math.floor(normalized / segAngle) % segCount;
        if (segIdx !== lastSeg) {
          lastSeg = segIdx;
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.frequency.value = 600 + Math.random() * 400;
          osc.type = "triangle";
          gain.gain.value = 0.06;
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.05);
        }
      };
    } catch (e) {
      return null;
    }
  }

  drawWheel(currentAngle);

  const spinBtn = document.getElementById(`${containerId}-spin-btn`);
  if (spinBtn) {
    spinBtn.addEventListener("click", function() {
      if (!spinning && options.onSpin) {
        options.onSpin();
      }
    });
  }

  return {
    spin: function(targetIndex) {
      spinWheel(targetIndex);
    },
    redraw: function(newSegments) {
      segments.length = 0;
      newSegments.forEach(s => segments.push(s));
      segCount = segments.length;
      arcSize = (2 * Math.PI) / segCount;
      currentAngle = 0;
      drawWheel(currentAngle);
    },
    isSpinning: function() { return spinning; }
  };
}
