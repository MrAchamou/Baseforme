
// Neon Glow Effect - Effet néon lumineux
function animate(context) {
  const { canvas, ctx, text } = context;
  
  if (!text || text.trim() === '') return;
  
  let frame = 0;
  
  function neonAnimation() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dark background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    
    // Text styling
    ctx.font = 'bold 52px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Animated glow intensity
    const glowIntensity = 20 + Math.sin(frame * 0.1) * 10;
    const hue = (frame * 2) % 360;
    
    // Multiple glow layers for neon effect
    for (let i = 0; i < 5; i++) {
      ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
      ctx.shadowBlur = glowIntensity + (i * 5);
      ctx.fillStyle = `hsl(${hue}, 100%, ${70 - i * 10}%)`;
      ctx.fillText(text, x, y);
    }
    
    // Inner bright core
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(text, x, y);
    
    // Sparks effect
    for (let i = 0; i < 8; i++) {
      const sparkX = x + Math.sin((frame + i * 45) * 0.05) * 120;
      const sparkY = y + Math.cos((frame + i * 60) * 0.04) * 60;
      
      ctx.fillStyle = `hsl(${(hue + i * 45) % 360}, 100%, 80%)`;
      ctx.beginPath();
      ctx.arc(sparkX, sparkY, Math.random() * 3 + 1, 0, Math.PI * 2);
      ctx.fill();
    }
    
    frame++;
    context.animationFrame = requestAnimationFrame(neonAnimation);
  }
  
  neonAnimation();
}

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = animate;
}
