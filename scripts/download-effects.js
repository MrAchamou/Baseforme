#!/usr/bin/env node

/**
 * Script de gestion des effets locaux
 * Remplace le système GitHub par un système local robuste
 */

const fs = require('fs');
const path = require('path');

const EFFECTS_DIR = path.join(__dirname, '../client/src/effects');

function validateEffectsDirectory() {
  console.log('🔍 Validating local effects directory...');

  if (!fs.existsSync(EFFECTS_DIR)) {
    console.log('📁 Creating effects directory...');
    fs.mkdirSync(EFFECTS_DIR, { recursive: true });
  }

  const files = fs.readdirSync(EFFECTS_DIR);
  const jsFiles = files.filter(file => file.endsWith('.js'));
  const hasIndex = files.includes('effectsIndex.json');

  console.log(`📊 Found ${jsFiles.length} effect files`);
  console.log(`📋 Index file present: ${hasIndex ? 'Yes' : 'No'}`);

  return { jsFiles, hasIndex, totalFiles: files.length };
}

function createSampleEffects() {
  console.log('🎨 Creating sample effects...');

  const sampleEffects = [
    {
      id: 'typewriter',
      name: 'TYPEWRITER',
      code: `
// Effet machine à écrire
function typewriterEffect(canvas, text, options = {}) {
  const ctx = canvas.getContext('2d');
  const { fontSize = 32, color = '#00ff00', speed = 100 } = options;

  ctx.font = \`\${fontSize}px monospace\`;
  ctx.fillStyle = color;

  let index = 0;
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const currentText = text.substring(0, index);
    ctx.fillText(currentText, 50, canvas.height / 2);

    // Curseur clignotant
    if (Math.floor(Date.now() / 500) % 2) {
      ctx.fillText('_', 50 + ctx.measureText(currentText).width, canvas.height / 2);
    }

    if (index < text.length) {
      index++;
      setTimeout(() => requestAnimationFrame(animate), speed);
    }
  };

  animate();
}
      `
    },
    {
      id: 'neon-glow',
      name: 'NEON GLOW',
      code: `
// Effet néon lumineux
function neonGlowEffect(canvas, text, options = {}) {
  const ctx = canvas.getContext('2d');
  const { fontSize = 48, color = '#ff0080', glowSize = 20 } = options;

  ctx.font = \`\${fontSize}px Arial\`;
  ctx.textAlign = 'center';

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const glow = Math.sin(Date.now() * 0.005) * 0.5 + 0.5;

    // Effet de lueur
    ctx.shadowColor = color;
    ctx.shadowBlur = glowSize * (0.5 + glow);
    ctx.fillStyle = color;

    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    requestAnimationFrame(animate);
  };

  animate();
}
      `
    }
  ];

  sampleEffects.forEach(effect => {
    const filePath = path.join(EFFECTS_DIR, `${effect.id}.js`);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, effect.code.trim(), 'utf8');
      console.log(`✅ Created ${effect.name} effect`);
    }
  });
}

function updateEffectsIndex() {
  console.log('📋 Updating effects index...');

  const files = fs.readdirSync(EFFECTS_DIR);
  const jsFiles = files.filter(file => file.endsWith('.js'));

  const effects = jsFiles.map(file => {
    const id = path.basename(file, '.js');
    const name = id.toUpperCase().replace(/[-_]/g, ' ');

    // Catégorisation basique
    let category = 'both';
    let type = 'animation';

    if (id.includes('text') || id.includes('write') || id.includes('type')) {
      category = 'text';
    } else if (id.includes('particle') || id.includes('fire') || id.includes('crystal')) {
      category = 'image';
    }

    if (id.includes('fade') || id.includes('dissolve') || id.includes('morph')) {
      type = 'transition';
    } else if (id.includes('quantum') || id.includes('glitch') || id.includes('neural')) {
      type = 'special';
    }

    return {
      id,
      name,
      description: `Effet ${name.toLowerCase()}`,
      file,
      category,
      type
    };
  });

  const indexPath = path.join(EFFECTS_DIR, 'effectsIndex.json');
  fs.writeFileSync(indexPath, JSON.stringify(effects, null, 2), 'utf8');

  console.log(`✅ Index updated with ${effects.length} effects`);
  return effects;
}

function main() {
  console.log('🚀 Local Effects Management System');

  try {
    const stats = validateEffectsDirectory();

    if (stats.jsFiles.length === 0) {
      createSampleEffects();
    }

    const effects = updateEffectsIndex();

    console.log('🎉 Local effects system ready!');
    console.log(`📊 Total effects: ${effects.length}`);
    console.log('🔧 System is fully self-contained and robust');

  } catch (error) {
    console.error('💥 Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { validateEffectsDirectory, updateEffectsIndex };