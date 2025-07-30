
#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JSFILE_DIR = path.join(__dirname, '../JSfile');

console.log('🔧 Fixing JSfile effects format...');

if (!fs.existsSync(JSFILE_DIR)) {
  console.error('❌ JSfile directory not found');
  process.exit(1);
}

const files = fs.readdirSync(JSFILE_DIR);
const effectFiles = files.filter(f => f.endsWith('.effect.js'));

console.log(`📊 Found ${effectFiles.length} effect files to process`);

let fixedCount = 0;
let errorCount = 0;

for (const filename of effectFiles) {
  try {
    const filePath = path.join(JSFILE_DIR, filename);
    const content = fs.readFileSync(filePath, 'utf8').trim();
    
    if (!content) {
      console.warn(`⚠️ Empty file: ${filename}`);
      continue;
    }
    
    // Extraire le nom de base pour l'ID
    const baseName = filename.replace('.effect.js', '');
    const effectId = baseName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const effectName = baseName.toUpperCase();
    
    // Déterminer la catégorie
    let category = 'both';
    let type = 'animation';
    
    const lowerName = baseName.toLowerCase();
    
    if (lowerName.includes('text') || lowerName.includes('write') || lowerName.includes('type')) {
      category = 'text';
    } else if (lowerName.includes('particle') || lowerName.includes('fire') || lowerName.includes('crystal')) {
      category = 'image';
    }
    
    if (lowerName.includes('fade') || lowerName.includes('dissolve') || lowerName.includes('morph')) {
      type = 'transition';
    } else if (lowerName.includes('quantum') || lowerName.includes('glitch') || lowerName.includes('neural')) {
      type = 'special';
    }
    
    // Créer le format d'effet standardisé
    let newContent;
    
    // Si le contenu semble être déjà une fonction
    if (content.includes('function') || content.includes('=>')) {
      newContent = `// ${effectName} Effect
// Effet d'animation: ${baseName}

const ${effectId.replace(/-/g, '')}Effect = {
  id: '${effectId}',
  name: '${effectName}',
  description: 'Effet ${baseName.toLowerCase()}',
  category: '${category}',
  subcategory: '${type}',
  type: '${type}',
  compatibility: {
    text: ${category === 'text' || category === 'both'},
    image: ${category === 'image' || category === 'both'},
    logo: true,
    background: true
  },
  parameters: {
    vitesse: { type: 'number', default: 1, min: 0.1, max: 3 },
    intensite: { type: 'number', default: 0.5, min: 0, max: 1 },
    couleur: { type: 'color', default: '#ffffff' }
  },
  engine: function(element, params = {}) {
    // Code d'effet original:
    ${content.replace(/^/gm, '    ')}
    
    // Animation par défaut si le code original ne fonctionne pas
    if (typeof element === 'object' && element.style) {
      const originalContent = element.textContent || element.innerHTML;
      let frame = 0;
      const speed = params.vitesse || 1;
      const intensity = params.intensite || 0.5;
      
      const animate = () => {
        if (!element.parentNode) return;
        
        const time = frame * 0.1 * speed;
        const scale = 1 + Math.sin(time) * 0.1 * intensity;
        const rotation = Math.sin(time * 0.5) * 5 * intensity;
        const hue = (frame * 2) % 360;
        
        element.style.transform = \`scale(\${scale}) rotate(\${rotation}deg)\`;
        element.style.color = \`hsl(\${hue}, 70%, 60%)\`;
        element.style.textShadow = \`0 0 10px hsl(\${hue}, 70%, 60%)\`;
        
        frame++;
        
        if (frame < 300) { // 5 secondes à 60fps
          requestAnimationFrame(animate);
        } else {
          // Reset
          element.style.transform = '';
          element.style.color = '';
          element.style.textShadow = '';
        }
      };
      
      animate();
      
      return () => {
        element.style.transform = '';
        element.style.color = '';
        element.style.textShadow = '';
      };
    }
  }
};

export default ${effectId.replace(/-/g, '')}Effect;
export { ${effectId.replace(/-/g, '')}Effect };
`;
    } else {
      // Si le contenu n'est pas une fonction, créer un effet basique
      newContent = `// ${effectName} Effect
// Effet d'animation: ${baseName}

const ${effectId.replace(/-/g, '')}Effect = {
  id: '${effectId}',
  name: '${effectName}',
  description: 'Effet ${baseName.toLowerCase()}',
  category: '${category}',
  subcategory: '${type}',
  type: '${type}',
  compatibility: {
    text: ${category === 'text' || category === 'both'},
    image: ${category === 'image' || category === 'both'},
    logo: true,
    background: true
  },
  parameters: {
    vitesse: { type: 'number', default: 1, min: 0.1, max: 3 },
    intensite: { type: 'number', default: 0.5, min: 0, max: 1 },
    couleur: { type: 'color', default: '#ffffff' }
  },
  engine: function(element, params = {}) {
    if (typeof element === 'object' && element.style) {
      const speed = params.vitesse || 1;
      const intensity = params.intensite || 0.5;
      let frame = 0;
      
      const animate = () => {
        if (!element.parentNode) return;
        
        const time = frame * 0.1 * speed;
        
        // Animation spécifique selon le type d'effet
        ${generateAnimationByType(baseName, type)}
        
        frame++;
        
        if (frame < 300) {
          requestAnimationFrame(animate);
        } else {
          element.style.transform = '';
          element.style.color = '';
          element.style.textShadow = '';
          element.style.filter = '';
        }
      };
      
      animate();
      
      return () => {
        element.style.transform = '';
        element.style.color = '';
        element.style.textShadow = '';
        element.style.filter = '';
      };
    }
  }
};

export default ${effectId.replace(/-/g, '')}Effect;
export { ${effectId.replace(/-/g, '')}Effect };
`;
    }
    
    // Écrire le nouveau contenu
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✅ Fixed: ${filename}`);
    fixedCount++;
    
  } catch (error) {
    console.error(`❌ Error fixing ${filename}:`, error.message);
    errorCount++;
  }
}

console.log(`\n📊 Summary:`);
console.log(`   Fixed effects: ${fixedCount}`);
console.log(`   Errors: ${errorCount}`);
console.log(`   Total processed: ${fixedCount + errorCount}`);

function generateAnimationByType(baseName, type) {
  const lowerName = baseName.toLowerCase();
  
  if (lowerName.includes('breathing') || lowerName.includes('heartbeat')) {
    return `
        const scale = 1 + Math.sin(time * 3) * 0.2 * intensity;
        element.style.transform = \`scale(\${scale})\`;
        element.style.filter = \`brightness(\${1 + Math.sin(time * 3) * 0.3})\`;`;
  }
  
  if (lowerName.includes('rotation') || lowerName.includes('spin')) {
    return `
        const rotation = time * 180 * intensity;
        element.style.transform = \`rotate(\${rotation}deg)\`;`;
  }
  
  if (lowerName.includes('neon') || lowerName.includes('glow')) {
    return `
        const hue = (frame * 3) % 360;
        const glowIntensity = (Math.sin(time * 2) + 1) * 0.5 * intensity;
        element.style.color = \`hsl(\${hue}, 100%, 60%)\`;
        element.style.textShadow = \`0 0 \${20 * glowIntensity}px hsl(\${hue}, 100%, 60%)\`;`;
  }
  
  if (lowerName.includes('wave') || lowerName.includes('float')) {
    return `
        const waveY = Math.sin(time * 2) * 20 * intensity;
        const waveX = Math.cos(time) * 10 * intensity;
        element.style.transform = \`translate(\${waveX}px, \${waveY}px)\`;`;
  }
  
  if (lowerName.includes('fade') || lowerName.includes('dissolve')) {
    return `
        const opacity = (Math.sin(time * 2) + 1) * 0.5;
        element.style.opacity = Math.max(0.3, opacity);`;
  }
  
  if (lowerName.includes('fire') || lowerName.includes('flame')) {
    return `
        const flicker = Math.random() * 0.3 * intensity;
        const hue = 15 + Math.random() * 30; // Orange/rouge
        element.style.color = \`hsl(\${hue}, 100%, \${60 + flicker * 40}%)\`;
        element.style.textShadow = \`0 0 \${10 + flicker * 20}px hsl(\${hue}, 100%, 50%)\`;
        element.style.transform = \`translateY(\${Math.sin(time * 5) * 3 * intensity}px)\`;`;
  }
  
  if (lowerName.includes('electric') || lowerName.includes('energy')) {
    return `
        const spark = Math.random() * intensity;
        const hue = 200 + Math.random() * 60; // Bleu électrique
        element.style.color = \`hsl(\${hue}, 100%, \${70 + spark * 30}%)\`;
        element.style.textShadow = \`0 0 \${5 + spark * 15}px hsl(\${hue}, 100%, 50%)\`;
        if (Math.random() < 0.1) {
          element.style.filter = \`brightness(\${2 + spark})\`;
        } else {
          element.style.filter = 'brightness(1)';
        }`;
  }
  
  // Animation par défaut
  return `
        const scale = 1 + Math.sin(time) * 0.1 * intensity;
        const rotation = Math.sin(time * 0.5) * 5 * intensity;
        const hue = (frame * 2) % 360;
        
        element.style.transform = \`scale(\${scale}) rotate(\${rotation}deg)\`;
        element.style.color = \`hsl(\${hue}, 70%, 60%)\`;
        element.style.textShadow = \`0 0 10px hsl(\${hue}, 70%, 60%)\`;`;
}
