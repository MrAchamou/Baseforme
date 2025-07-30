
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script pour scanner automatiquement le dossier JSfile
 * et générer le mapping complet des effets
 */

const JSFILE_DIR = path.join(__dirname, '../JSfile');

function scanJSfileEffects() {
  console.log('🔍 Scanning JSfile directory for effects...');
  
  if (!fs.existsSync(JSFILE_DIR)) {
    console.error(`❌ JSfile directory not found: ${JSFILE_DIR}`);
    return;
  }
  
  const files = fs.readdirSync(JSFILE_DIR);
  const effectFiles = files.filter(file => file.endsWith('.effect.js'));
  
  console.log(`📁 Found ${effectFiles.length} effect files in JSfile directory`);
  
  const mapping = {};
  
  effectFiles.forEach(filename => {
    const baseName = filename.replace('.effect.js', '');
    const id = baseName.toLowerCase().replace(/\s+/g, '-');
    const name = baseName.toUpperCase();
    
    // Déterminer la catégorie basée sur le nom
    let category = 'both';
    let type = 'animation';
    
    const lowerName = baseName.toLowerCase();
    
    // Keywords pour les catégories
    const textKeywords = ['write', 'type', 'echo', 'rotation', 'shadow', 'time', 'quantum', 'sparkle', 'star dust', 'tornado', 'rainbow', 'electric'];
    const imageKeywords = ['crystal', 'fire consume', 'fade', 'particle dissolve', 'smoke', 'wave dissolve', 'ice', 'reality', 'star explosion', 'morph', 'phase'];
    const bothKeywords = ['dimension', 'energy', 'float', 'glitch', 'gyroscope', 'hologram', 'liquid', 'magnetic', 'mirror', 'neural', 'orbit', 'plasma', 'wave distortion', 'wave surf'];
    
    if (textKeywords.some(keyword => lowerName.includes(keyword))) {
      category = 'text';
    } else if (imageKeywords.some(keyword => lowerName.includes(keyword))) {
      category = 'image';
    } else if (bothKeywords.some(keyword => lowerName.includes(keyword))) {
      category = 'both';
    }
    
    // Déterminer le type
    if (lowerName.includes('dissolve') || lowerName.includes('fade') || lowerName.includes('morph')) {
      type = 'transition';
    } else if (lowerName.includes('quantum') || lowerName.includes('glitch') || lowerName.includes('neural') || lowerName.includes('plasma') || lowerName.includes('crystal') || lowerName.includes('reality')) {
      type = 'special';
    }
    
    mapping[filename] = {
      id,
      name,
      description: `${name.charAt(0) + name.slice(1).toLowerCase().replace(/-/g, ' ')} effect`,
      category,
      type
    };
    
    console.log(`✅ Mapped: ${filename} -> ${name} (${category}/${type})`);
  });
  
  // Générer le code TypeScript pour le mapping
  const mappingCode = `// Auto-generated mapping from JSfile directory scan
const JS_FILE_EFFECTS_MAPPING = ${JSON.stringify(mapping, null, 2).replace(/"([^"]+)":/g, "'$1':")};`;
  
  console.log('\n📝 Generated mapping code:');
  console.log(mappingCode);
  
  // Sauvegarder dans un fichier temporaire
  const outputFile = path.join(__dirname, 'jsfile-mapping.ts');
  fs.writeFileSync(outputFile, mappingCode, 'utf8');
  console.log(`💾 Mapping saved to: ${outputFile}`);
  
  return mapping;
}

if (require.main === module) {
  scanJSfileEffects();
}

module.exports = { scanJSfileEffects };
