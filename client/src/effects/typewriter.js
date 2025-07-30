
// Typewriter Effect - Animation de machine à écrire
function animate(context) {
  const { canvas, ctx, text } = context;
  
  if (!text || text.trim() === '') return;
  
  let currentIndex = 0;
  let frame = 0;
  const speed = 3; // Vitesse de frappe
  
  function typewriterAnimation() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#0f0f23');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Text styling
    ctx.font = 'bold 48px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    
    // Calculate current text to display
    const charsToShow = Math.floor(frame / speed);
    const displayText = text.substring(0, Math.min(charsToShow, text.length));
    
    // Main text
    ctx.fillStyle = '#00ff41';
    ctx.fillText(displayText, x, y);
    
    // Cursor
    if (charsToShow < text.length || Math.floor(frame / 30) % 2 === 0) {
      const textWidth = ctx.measureText(displayText).width;
      ctx.fillRect(x + textWidth / 2 + 2, y - 24, 3, 48);
    }
    
    frame++;
    
    if (charsToShow <= text.length + 60) { // Continue for a bit after completion
      context.animationFrame = requestAnimationFrame(typewriterAnimation);
    }
  }
  
  typewriterAnimation();
}

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = animate;
}
