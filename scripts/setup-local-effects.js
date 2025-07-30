
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const LOCAL_EFFECTS_DIR = path.join(__dirname, '../client/src/effects');

console.log('🎨 Setting up local effects...');

// Créer le répertoire s'il n'existe pas
if (!fs.existsSync(LOCAL_EFFECTS_DIR)) {
  fs.mkdirSync(LOCAL_EFFECTS_DIR, { recursive: true });
}

const localEffects = [
  {
    id: 'typewriter-local',
    name: 'TYPEWRITER LOCAL',
    file: 'typewriter-local.js',
    code: `
// Effet machine à écrire local
export const typewriterLocalEffect = {
  id: "typewriter-local",
  name: "TYPEWRITER LOCAL",
  description: "Effet machine à écrire avec curseur clignotant",
  category: "text",
  type: "animation",
  
  engine: function(canvas, text, options = {}) {
    const ctx = canvas.getContext('2d');
    const { fontSize = 32, color = '#00ff00', speed = 100 } = options;
    
    ctx.font = \`\${fontSize}px monospace\`;
    ctx.fillStyle = color;
    
    let index = 0;
    const startTime = Date.now();
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(1, '#1a1a1a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Current text
      ctx.fillStyle = color;
      ctx.font = \`\${fontSize}px monospace\`;
      const currentText = text.substring(0, index);
      const x = 50;
      const y = canvas.height / 2;
      ctx.fillText(currentText, x, y);
      
      // Cursor blinking
      if (Math.floor((Date.now() - startTime) / 500) % 2) {
        const textWidth = ctx.measureText(currentText).width;
        ctx.fillText('_', x + textWidth, y);
      }
      
      // Progress typing
      if (index < text.length && Date.now() - startTime > index * speed) {
        index++;
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      // Cleanup function
      cancelAnimationFrame(animate);
    };
  }
};

export default typewriterLocalEffect;
`
  },
  {
    id: 'neon-glow-local',
    name: 'NEON GLOW LOCAL', 
    file: 'neon-glow-local.js',
    code: `
// Effet néon lumineux local
export const neonGlowLocalEffect = {
  id: "neon-glow-local",
  name: "NEON GLOW LOCAL",
  description: "Effet néon avec lueur pulsante",
  category: "text",
  type: "special",
  
  engine: function(canvas, text, options = {}) {
    const ctx = canvas.getContext('2d');
    const { fontSize = 48, color = '#ff0080', glowSize = 20 } = options;
    
    ctx.font = \`\${fontSize}px Arial\`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dark background
      ctx.fillStyle = '#000011';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const glow = Math.sin(Date.now() * 0.005) * 0.5 + 0.5;
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      
      // Multiple glow layers
      for (let i = 0; i < 3; i++) {
        ctx.shadowColor = color;
        ctx.shadowBlur = glowSize * (0.5 + glow) * (i + 1);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.8 - i * 0.2;
        ctx.fillText(text, x, y);
      }
      
      // Main text
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#ffffff';
      ctx.fillText(text, x, y);
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animate);
    };
  }
};

export default neonGlowLocalEffect;
`
  },
  {
    id: 'breathing-local',
    name: 'BREATHING LOCAL',
    file: 'breathing-local.js', 
    code: `
// Effet respiration local
export const breathingLocalEffect = {
  id: "breathing-local",
  name: "BREATHING LOCAL",
  description: "Animation de respiration douce",
  category: "both",
  type: "animation",
  
  engine: function(canvas, text, options = {}) {
    const ctx = canvas.getContext('2d');
    const { fontSize = 42, color = '#4fc3f7' } = options;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background
      const gradient = ctx.createRadialGradient(
        canvas.width/2, canvas.height/2, 0,
        canvas.width/2, canvas.height/2, Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, '#001122');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Breathing effect
      const time = Date.now() * 0.002;
      const breathe = Math.sin(time) * 0.3 + 1;
      
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(breathe, breathe);
      
      // Glow effect
      ctx.shadowColor = color;
      ctx.shadowBlur = 20 * breathe;
      ctx.fillStyle = color;
      ctx.font = \`\${fontSize}px Arial\`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 0, 0);
      
      ctx.restore();
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animate);
    };
  }
};

export default breathingLocalEffect;
`
  }
];

// Créer les fichiers d'effets locaux
localEffects.forEach(effect => {
  const filePath = path.join(LOCAL_EFFECTS_DIR, effect.file);
  fs.writeFileSync(filePath, effect.code.trim(), 'utf8');
  console.log(`✅ Created local effect: ${effect.name}`);
});

// Mettre à jour l'index local
const indexPath = path.join(LOCAL_EFFECTS_DIR, 'effectsIndex.json');
const indexData = localEffects.map(effect => ({
  id: effect.id,
  name: effect.name,
  description: `Effet ${effect.name.toLowerCase()}`,
  file: effect.file,
  category: effect.id.includes('text') ? 'text' : 'both',
  type: 'animation'
}));

fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2), 'utf8');

console.log(`\n🎉 Local effects setup complete!`);
console.log(`📁 Created ${localEffects.length} local effects`);
console.log(`📋 Updated effectsIndex.json`);
