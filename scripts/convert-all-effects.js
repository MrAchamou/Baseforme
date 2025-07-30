
#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JSFILE_DIR = path.join(__dirname, '../JSfile');

console.log('🔧 Converting ALL JSfile effects to proper ES6 format...');

if (!fs.existsSync(JSFILE_DIR)) {
  console.error('❌ JSfile directory not found');
  process.exit(1);
}

const files = fs.readdirSync(JSFILE_DIR);
const effectFiles = files.filter(f => f.endsWith('.effect.js'));

console.log(`📊 Found ${effectFiles.length} effect files to convert`);

let convertedCount = 0;
let errorCount = 0;

for (const filename of effectFiles) {
  try {
    const filePath = path.join(JSFILE_DIR, filename);
    const originalContent = fs.readFileSync(filePath, 'utf8').trim();
    
    if (!originalContent) {
      console.warn(`⚠️ Empty file: ${filename}`);
      continue;
    }
    
    // Extraire le nom de base pour l'ID
    const baseName = filename.replace('.effect.js', '');
    const effectId = baseName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const effectName = baseName.toUpperCase().replace(/[^\w\s]/g, ' ').trim();
    const variableName = effectId.replace(/-/g, '');
    
    // Déterminer la catégorie et le type
    const lowerName = baseName.toLowerCase();
    let category = 'both';
    let type = 'animation';
    
    if (lowerName.includes('text') || lowerName.includes('write') || lowerName.includes('type')) {
      category = 'text';
    } else if (lowerName.includes('particle') || lowerName.includes('fire') || lowerName.includes('crystal') || lowerName.includes('image')) {
      category = 'image';
    }
    
    if (lowerName.includes('fade') || lowerName.includes('dissolve') || lowerName.includes('morph')) {
      type = 'transition';
    } else if (lowerName.includes('quantum') || lowerName.includes('glitch') || lowerName.includes('neural')) {
      type = 'special';
    }
    
    // Créer le nouvel effet avec une structure ES6 complète
    const newContent = `// ${effectName} Effect - Compatible EffectLab
// Fichier: ${filename}
// Généré automatiquement le ${new Date().toISOString()}

const ${variableName}Effect = {
  id: '${effectId}',
  name: '${effectName}',
  description: \`Effet d'animation ${baseName.toLowerCase()} avec transitions fluides et personnalisables.\`,
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
    vitesse: { 
      type: 'number', 
      default: 1, 
      min: 0.1, 
      max: 3,
      description: 'Vitesse de l\\'animation'
    },
    intensite: { 
      type: 'number', 
      default: 0.5, 
      min: 0, 
      max: 1,
      description: 'Intensité de l\\'effet'
    },
    couleur: { 
      type: 'color', 
      default: '#ffffff',
      description: 'Couleur principale'
    },
    duree: {
      type: 'number',
      default: 5000,
      min: 1000,
      max: 30000,
      description: 'Durée en millisecondes'
    }
  },
  tags: [${generateTags(lowerName)}],
  
  // Fonction principale d'exécution de l'effet
  engine: function(element, params = {}) {
    // Paramètres avec valeurs par défaut
    const config = {
      vitesse: params.vitesse || this.parameters.vitesse.default,
      intensite: params.intensite || this.parameters.intensite.default,
      couleur: params.couleur || this.parameters.couleur.default,
      duree: params.duree || this.parameters.duree.default,
      ...params
    };

    // Vérification de l'élément
    if (!element || typeof element !== 'object') {
      console.warn('Élément invalide pour l\\'effet ${effectName}');
      return () => {};
    }

    // Variables d'animation
    let animationId = null;
    let startTime = Date.now();
    let isRunning = true;

    // Sauvegarde des styles originaux
    const originalStyles = {
      transform: element.style.transform || '',
      color: element.style.color || '',
      opacity: element.style.opacity || '',
      filter: element.style.filter || '',
      textShadow: element.style.textShadow || '',
      background: element.style.background || ''
    };

    // Animation spécifique à l'effet
    const animate = () => {
      if (!isRunning || !element.parentNode) {
        return cleanup();
      }

      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / config.duree, 1);
      const time = elapsed * 0.001 * config.vitesse;

      try {
        ${generateEffectAnimation(lowerName, type)}
      } catch (error) {
        console.warn('Erreur dans l\\'animation ${effectName}:', error);
        return cleanup();
      }

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        cleanup();
      }
    };

    // Fonction de nettoyage
    const cleanup = () => {
      isRunning = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }

      // Restaurer les styles originaux
      Object.keys(originalStyles).forEach(prop => {
        if (element.style && originalStyles[prop] !== undefined) {
          element.style[prop] = originalStyles[prop];
        }
      });
    };

    // Démarrer l'animation
    animate();

    // Retourner la fonction de nettoyage
    return cleanup;
  }
};

// Code original (commenté pour référence)
/*
${originalContent.replace(/\*\//g, '*\\/')}
*/

// Exports ES6
export default ${variableName}Effect;
export { ${variableName}Effect };
`;

    // Écrire le nouveau contenu
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✅ Converted: ${filename} -> ${effectName}`);
    convertedCount++;
    
  } catch (error) {
    console.error(`❌ Error converting ${filename}:`, error.message);
    errorCount++;
  }
}

console.log(`\n📊 Conversion Summary:`);
console.log(`   ✅ Converted effects: ${convertedCount}`);
console.log(`   ❌ Errors: ${errorCount}`);
console.log(`   📁 Total files: ${effectFiles.length}`);

if (convertedCount > 0) {
  console.log(`\n🎉 ${convertedCount} effets ont été convertis au format ES6 !`);
  console.log(`   Les effets sont maintenant compatibles avec le système de chargement.`);
}

function generateTags(lowerName) {
  const tags = [];
  
  if (lowerName.includes('text')) tags.push("'text'");
  if (lowerName.includes('image')) tags.push("'image'");
  if (lowerName.includes('fire')) tags.push("'fire'", "'heat'");
  if (lowerName.includes('water') || lowerName.includes('liquid')) tags.push("'water'", "'fluid'");
  if (lowerName.includes('electric')) tags.push("'electric'", "'energy'");
  if (lowerName.includes('neon') || lowerName.includes('glow')) tags.push("'glow'", "'neon'");
  if (lowerName.includes('particle')) tags.push("'particle'", "'physics'");
  if (lowerName.includes('quantum')) tags.push("'quantum'", "'science'");
  if (lowerName.includes('crystal')) tags.push("'crystal'", "'mineral'");
  if (lowerName.includes('wave')) tags.push("'wave'", "'motion'");
  if (lowerName.includes('rotate') || lowerName.includes('spin')) tags.push("'rotation'", "'spin'");
  if (lowerName.includes('breathing') || lowerName.includes('heartbeat')) tags.push("'organic'", "'life'");
  
  return tags.length > 0 ? tags.join(', ') : "'animation'";
}

function generateEffectAnimation(lowerName, type) {
  // Animation spécialisée selon le nom de l'effet
  if (lowerName.includes('breathing') || lowerName.includes('heartbeat')) {
    return `
        // Animation de respiration/pulsation
        const pulse = Math.sin(time * 3) * config.intensite;
        const scale = 1 + pulse * 0.2;
        const brightness = 1 + pulse * 0.3;
        
        element.style.transform = \`scale(\${scale})\`;
        element.style.filter = \`brightness(\${brightness})\`;`;
  }
  
  if (lowerName.includes('rotation') || lowerName.includes('spin') || lowerName.includes('gyroscope')) {
    return `
        // Animation de rotation
        const rotation = time * 180 * config.intensite;
        const wobble = Math.sin(time * 2) * 5 * config.intensite;
        
        element.style.transform = \`rotate(\${rotation}deg) rotateX(\${wobble}deg)\`;`;
  }
  
  if (lowerName.includes('neon') || lowerName.includes('glow') || lowerName.includes('electric')) {
    return `
        // Animation néon/électrique
        const hue = (time * 60) % 360;
        const intensity = (Math.sin(time * 4) + 1) * 0.5 * config.intensite;
        const flicker = Math.random() < 0.1 ? 0.3 : 0;
        
        element.style.color = config.couleur || \`hsl(\${hue}, 100%, \${60 + intensity * 40}%)\`;
        element.style.textShadow = \`0 0 \${(20 + intensity * 30) * (1 - flicker)}px currentColor\`;
        element.style.filter = \`brightness(\${1 + intensity + flicker})\`;`;
  }
  
  if (lowerName.includes('wave') || lowerName.includes('float') || lowerName.includes('liquid')) {
    return `
        // Animation ondulatoire
        const waveY = Math.sin(time * 2 + progress * Math.PI) * 20 * config.intensite;
        const waveX = Math.cos(time * 1.5) * 10 * config.intensite;
        const skew = Math.sin(time * 3) * 5 * config.intensite;
        
        element.style.transform = \`translate(\${waveX}px, \${waveY}px) skewX(\${skew}deg)\`;`;
  }
  
  if (lowerName.includes('fire') || lowerName.includes('flame')) {
    return `
        // Animation de feu
        const flicker = Math.random() * config.intensite;
        const hue = 15 + Math.random() * 30; // Orange/rouge
        const moveY = Math.sin(time * 8) * 3 * config.intensite;
        const moveX = (Math.random() - 0.5) * 2 * config.intensite;
        
        element.style.color = \`hsl(\${hue}, 100%, \${60 + flicker * 40}%)\`;
        element.style.textShadow = \`0 0 \${10 + flicker * 20}px currentColor\`;
        element.style.transform = \`translate(\${moveX}px, \${moveY}px)\`;
        element.style.filter = \`brightness(\${1 + flicker})\`;`;
  }
  
  if (lowerName.includes('fade') || lowerName.includes('dissolve')) {
    return `
        // Animation de fondu
        const fade = Math.sin(time * 2) * 0.5 + 0.5;
        const opacity = 0.3 + fade * 0.7 * config.intensite;
        
        element.style.opacity = opacity;
        element.style.filter = \`blur(\${(1 - opacity) * 2}px)\`;`;
  }
  
  if (lowerName.includes('quantum') || lowerName.includes('glitch')) {
    return `
        // Animation quantique/glitch
        const glitch = Math.random() < 0.1;
        const shift = glitch ? (Math.random() - 0.5) * 10 * config.intensite : 0;
        const hue = glitch ? Math.random() * 360 : (time * 120) % 360;
        
        element.style.transform = \`translateX(\${shift}px)\`;
        element.style.color = \`hsl(\${hue}, 70%, 60%)\`;
        element.style.textShadow = glitch ? '2px 0 red, -2px 0 cyan' : 'none';`;
  }
  
  // Animation par défaut
  return `
        // Animation par défaut
        const scale = 1 + Math.sin(time * 2) * 0.1 * config.intensite;
        const rotation = Math.sin(time) * 5 * config.intensite;
        const hue = (time * 60) % 360;
        
        element.style.transform = \`scale(\${scale}) rotate(\${rotation}deg)\`;
        element.style.color = config.couleur || \`hsl(\${hue}, 70%, 60%)\`;
        element.style.textShadow = \`0 0 10px currentColor\`;`;
}
