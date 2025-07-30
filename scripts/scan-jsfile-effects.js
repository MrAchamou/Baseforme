
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
    return null;
  }
  
  const files = fs.readdirSync(JSFILE_DIR);
  const effectFiles = files.filter(file => file.endsWith('.effect.js'));
  
  console.log(`📁 Found ${effectFiles.length} effect files in JSfile directory`);
  
  // Trier les fichiers par ordre alphabétique
  effectFiles.sort();
  
  const mapping = {};
  const effectsList = [];
  
  effectFiles.forEach((filename, index) => {
    const baseName = filename.replace('.effect.js', '');
    const id = baseName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
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
    
    const effectData = {
      id,
      name,
      description: `${name.charAt(0) + name.slice(1).toLowerCase().replace(/-/g, ' ')} effect`,
      category,
      type
    };
    
    mapping[filename] = effectData;
    effectsList.push(`'${filename}'`);
    
    console.log(`✅ ${index + 1}. Mapped: ${filename} -> ${name} (${category}/${type})`);
  });
  
  // Générer le code TypeScript pour le mapping
  const mappingCode = `// Auto-generated mapping from JSfile directory scan
// Generated on: ${new Date().toISOString()}
// Total effects: ${effectFiles.length}

const JS_FILE_EFFECTS_MAPPING = ${JSON.stringify(mapping, null, 2).replace(/"([^"]+)":/g, "'$1':")};

export { JS_FILE_EFFECTS_MAPPING };`;
  
  // Générer la liste des effets pour le loader
  const effectsListCode = `// Auto-generated effects list from JSfile directory scan
// Generated on: ${new Date().toISOString()}
// Total effects: ${effectFiles.length}

const KNOWN_JSFILE_EFFECTS = [
${effectsList.map(effect => `  ${effect}`).join(',\n')}
];

export { KNOWN_JSFILE_EFFECTS };`;
  
  console.log('\n📝 Generated mapping code:');
  console.log(mappingCode);
  
  console.log('\n📝 Generated effects list:');
  console.log(effectsListCode);
  
  // Sauvegarder dans des fichiers temporaires
  const mappingFile = path.join(__dirname, 'jsfile-mapping.ts');
  const effectsListFile = path.join(__dirname, 'jsfile-effects-list.ts');
  
  fs.writeFileSync(mappingFile, mappingCode, 'utf8');
  fs.writeFileSync(effectsListFile, effectsListCode, 'utf8');
  
  console.log(`💾 Mapping saved to: ${mappingFile}`);
  console.log(`💾 Effects list saved to: ${effectsListFile}`);
  
  // Suggestions pour la mise à jour
  console.log('\n💡 To update the loader, copy the KNOWN_JSFILE_EFFECTS array to:');
  console.log('   client/src/lib/local-effects-loader.ts');
  
  return {
    mapping,
    effectsList: effectFiles,
    totalEffects: effectFiles.length
  };
}

if (require.main === module) {
  const result = scanJSfileEffects();
  if (result) {
    console.log(`\n🎯 Scan completed: ${result.totalEffects} effects found`);
  } else {
    console.log('\n💥 Scan failed!');
    process.exit(1);
  }
}

module.exports = { scanJSfileEffects };
