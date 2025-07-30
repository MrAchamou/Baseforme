// Effet d'écriture enflammée - Compatible avec EffectLab
function createFireWriteEffect() {
  return function fireWriteEffect(ctx, canvas, text, options = {}) {
    const { 
      fontSize = 48,
      speed = 50,
      flameHeight = 20,
      flameColor = '#ff4500'
    } = options;

    let startTime = Date.now();
    let currentIndex = 0;
    const particles = [];

    function createFlameParticle(x, y) {
      return {
        x: x + (Math.random() - 0.5) * 10,
        y: y,
        life: 1.0,
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: -Math.random() * 3 - 1
        }
      };
    }

    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / speed, text.length);
      currentIndex = Math.floor(progress);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Dessiner le texte progressivement
      const visibleText = text.substring(0, currentIndex);
      ctx.fillStyle = flameColor;
      ctx.fillText(visibleText, centerX, centerY);

      // Ajouter des particules de feu
      if (currentIndex > 0 && Math.random() < 0.3) {
        const textWidth = ctx.measureText(visibleText).width;
        const particleX = centerX - textWidth/2 + (Math.random() * textWidth);
        particles.push(createFlameParticle(particleX, centerY));
      }

      // Animer les particules
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        particle.life -= 0.02;

        if (particle.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = particle.life;
        ctx.fillStyle = `hsl(${30 + Math.random() * 30}, 100%, 50%)`;
        ctx.fillRect(particle.x - 1, particle.y - 1, 2, 2);
        ctx.restore();
      }

      return currentIndex < text.length || particles.length > 0;
    }

    return animate;
  };
}

// Export pour le système EffectLab
if (typeof module !== 'undefined' && module.exports) {
  module.exports = createFireWriteEffect();
} else if (typeof window !== 'undefined') {
  window.fireWriteEffect = createFireWriteEffect();
}