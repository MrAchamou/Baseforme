// Effet néon lumineux - Compatible avec EffectLab
function createNeonGlowEffect() {
  return function neonGlowEffect(ctx, canvas, text, options = {}) {
    const { 
      fontSize = 48, 
      color = '#ff0080', 
      glowSize = 20,
      pulseSpeed = 0.005 
    } = options;

    let startTime = Date.now();

    function animate() {
      const elapsed = Date.now() - startTime;
      const glow = Math.sin(elapsed * pulseSpeed) * 0.5 + 0.5;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Effet de lueur
      ctx.save();
      ctx.shadowColor = color;
      ctx.shadowBlur = glowSize * (0.5 + glow);
      ctx.fillStyle = color;
      ctx.fillText(text, centerX, centerY);
      ctx.restore();

      // Texte principal
      ctx.fillStyle = '#ffffff';
      ctx.fillText(text, centerX, centerY);

      return true; // Animation continue
    }

    return animate;
  };
}

// Export pour le système EffectLab
if (typeof module !== 'undefined' && module.exports) {
  module.exports = createNeonGlowEffect();
} else if (typeof window !== 'undefined') {
  window.neonGlowEffect = createNeonGlowEffect();
}