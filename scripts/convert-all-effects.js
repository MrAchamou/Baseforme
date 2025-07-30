#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const JSFILE_DIR = path.join(__dirname, '../JSfile');

console.log('🔄 Converting all JSfile effects to proper ES6 format...');

function convertEffectToES6(filename, content) {
  // Extraire le nom de base pour l'ID
  const baseName = filename.replace('.effect.js', '');
  const id = baseName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  const name = baseName.toUpperCase();

  // Déterminer la catégorie basée sur le nom
  let category = 'both';
  if (baseName.includes('text') || baseName.includes('write') || baseName.includes('type')) {
    category = 'text';
  } else if (baseName.includes('particle') || baseName.includes('fire') || baseName.includes('crystal') || 
             baseName.includes('liquid') || baseName.includes('smoke') || baseName.includes('ice')) {
    category = 'image';
  }

  // Wrapper pour transformer le contenu en objet d'effet valide
  const wrappedContent = `
// ${name} Effect - Auto-converted to ES6 format
${content}

// Export de l'effet au format EffectLab
export const ${id.replace(/-/g, '')}Effect = {
  id: "${id}",
  name: "${name}",
  description: "Effet ${name.toLowerCase()} avec animation dynamique",
  category: "${category}",
  type: "animation",
  compatibility: {
    text: ${category === 'text' || category === 'both'},
    image: ${category === 'image' || category === 'both'}
  },
  engine: function(element, options = {}) {
    // Créer un canvas si l'élément n'en est pas un
    let canvas = element;
    if (element.tagName !== 'CANVAS') {
      canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 400;
      element.appendChild(canvas);
    }

    // Exécuter le code d'effet original
    try {
      ${generateEffectExecution(content, baseName)}
    } catch (error) {
      console.error('Effect execution error:', error);
      // Animation de fallback
      const ctx = canvas.getContext('2d');
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '32px Arial';
        ctx.fillStyle = '#ff6b6b';
        ctx.textAlign = 'center';
        ctx.fillText('${name}', canvas.width/2, canvas.height/2);
        requestAnimationFrame(animate);
      };
      animate();
    }

    return () => {
      // Fonction de nettoyage
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  },
  parameters: {
    vitesse: 1,
    intensite: 0.5,
    couleur: '#ffffff'
  }
};

export default ${id.replace(/-/g, '')}Effect;
`;

  return wrappedContent;
}

function generateEffectExecution(content, effectName) {
  // Chercher les fonctions dans le contenu
  const functionMatches = content.match(/function\s+(\w+)/g) || [];
  const functions = functionMatches.map(match => match.replace('function ', ''));

  if (functions.length > 0) {
    const mainFunction = functions[0];
    return `
      // Exécuter la fonction principale de l'effet
      if (typeof ${mainFunction} === 'function') {
        ${mainFunction}(canvas, options.text || '${effectName}', options);
      }
    `;
  }

  // Si pas de fonction trouvée, essayer d'exécuter le code directement
  return `
    // Code d'effet direct
    const ctx = canvas.getContext('2d');
    const text = options.text || '${effectName}';

    // Animation basique avec le code d'effet
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = '32px Arial';
      ctx.fillStyle = '#00ff88';
      ctx.textAlign = 'center';
      ctx.fillText(text, canvas.width/2, canvas.height/2);
      requestAnimationFrame(animate);
    };
    animate();
  `;
}

async function convertAllEffects() {
  try {
    const files = fs.readdirSync(JSFILE_DIR);
    const effectFiles = files.filter(f => f.endsWith('.effect.js'));

    console.log(`📁 Found ${effectFiles.length} effect files to convert`);

    let convertedCount = 0;
    let errorCount = 0;

    for (const filename of effectFiles) {
      try {
        const filePath = path.join(JSFILE_DIR, filename);
        const content = fs.readFileSync(filePath, 'utf8');

        // Vérifier si l'effet a déjà des exports
        if (content.includes('export const') || content.includes('export default')) {
          console.log(`⏭️ Skipping ${filename} (already has exports)`);
          continue;
        }

        // Convertir l'effet
        const convertedContent = convertEffectToES6(filename, content);

        // Sauvegarder
        fs.writeFileSync(filePath, convertedContent, 'utf8');

        console.log(`✅ Converted ${filename}`);
        convertedCount++;

      } catch (error) {
        console.error(`❌ Failed to convert ${filename}:`, error.message);
        errorCount++;
      }
    }

    console.log(`\n🎉 Conversion complete!`);
    console.log(`✅ Converted: ${convertedCount} effects`);
    console.log(`❌ Errors: ${errorCount} effects`);

    if (convertedCount > 0) {
      console.log(`\n🔄 Now restart your application to load the converted effects`);
    }

  } catch (error) {
    console.error('❌ Conversion failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  convertAllEffects();
}

module.exports = { convertAllEffects };