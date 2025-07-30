// Effet de respiration pour texte - Compatible avec EffectLab
function createBreathingEffect() {
  return function breathingEffect(ctx, canvas, text, options = {}) {
    const { 
      fontSize = 48, 
      color = '#ffffff', 
      minScale = 0.8, 
      maxScale = 1.2,
      speed = 0.003 
    } = options;

    let startTime = Date.now();

    function animate() {
      const elapsed = Date.now() - startTime;
      const scale = minScale + (maxScale - minScale) * 
        (Math.sin(elapsed * speed) * 0.5 + 0.5);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(scale, scale);

      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.fillText(text, 0, 0);
      ctx.restore();

      return true; // Continue animation
    }

    return animate;
  };
}

// Export pour le système EffectLab
if (typeof module !== 'undefined' && module.exports) {
  module.exports = createBreathingEffect();
} else if (typeof window !== 'undefined') {
  window.breathingEffect = createBreathingEffect();
}