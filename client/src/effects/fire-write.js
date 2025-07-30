
// Fire Write Effect - Écriture enflammée
function animate(context) {
  const { canvas, ctx, text } = context;
  
  if (!text || text.trim() === '') return;
  
  let frame = 0;
  const particles = [];
  
  function createParticle(x, y) {
    return {
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 10,
      vx: (Math.random() - 0.5) * 2,
      vy: -Math.random() * 3,
      life: 1.0,
      decay: 0.02 + Math.random() * 0.02,
      size: Math.random() * 4 + 2
    };
  }
  
  function fireAnimation() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dark background
    ctx.fillStyle = '#0a0000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    
    // Text styling
    ctx.font = 'bold 48px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Main text with fire gradient
    const gradient = ctx.createLinearGradient(0, y - 30, 0, y + 30);
    gradient.addColorStop(0, '#ffff00');
    gradient.addColorStop(0.5, '#ff6600');
    gradient.addColorStop(1, '#cc0000');
    
    ctx.fillStyle = gradient;
    ctx.shadowColor = '#ff6600';
    ctx.shadowBlur = 15;
    ctx.fillText(text, x, y);
    
    // Create new particles
    if (frame % 3 === 0) {
      const textWidth = ctx.measureText(text).width;
      for (let i = 0; i < 3; i++) {
        particles.push(createParticle(
          x + (Math.random() - 0.5) * textWidth,
          y + 20
        ));
      }
    }
    
    // Update and draw particles
    ctx.shadowBlur = 0;
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      
      const alpha = p.life;
      const hue = 60 - (1 - p.life) * 60; // Yellow to red
      
      ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
    }
    
    frame++;
    context.animationFrame = requestAnimationFrame(fireAnimation);
  }
  
  fireAnimation();
}

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = animate;
}
