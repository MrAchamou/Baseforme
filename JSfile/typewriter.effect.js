// Effet machine à écrire - Compatible avec EffectLab
function createTypewriterEffect() {
  return function typewriterEffect(ctx, canvas, text, options = {}) {
    const { 
      fontSize = 48,
      color = '#00ff00',
      speed = 100,
      showCursor = true,
      cursorColor = '#ffffff'
    } = options;

    let startTime = Date.now();
    let currentIndex = 0;

    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / speed;
      currentIndex = Math.min(Math.floor(progress), text.length);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'Courier New', monospace`;
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Texte visible
      const visibleText = text.substring(0, currentIndex);
      ctx.fillText(visibleText, centerX, centerY);

      // Curseur clignotant
      if (showCursor && Math.floor(elapsed / 500) % 2 === 0) {
        const textWidth = ctx.measureText(visibleText).width;
        ctx.fillStyle = cursorColor;
        ctx.fillRect(centerX + textWidth/2 + 2, centerY - fontSize/2, 2, fontSize);
      }

      return currentIndex < text.length;
    }

    return animate;
  };
}

// Export pour le système EffectLab
if (typeof module !== 'undefined' && module.exports) {
  module.exports = createTypewriterEffect();
} else if (typeof window !== 'undefined') {
  window.typewriterEffect = createTypewriterEffect();
}